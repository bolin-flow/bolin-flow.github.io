+++
title = 'Explore Kivy for Cross-platform Applications'
date = 2024-10-30T08:10:00-00:00
draft = false
tags = ['Kivy', 'KivyMD', 'App']
showReadingTime = false
showTableOfContents = true

+++


[Kivy](https://kivy.org/) is an open-source Python framework used for developing cross-platform applications on operating systems such as Android, iOS, macOS, Windows, and Linux. with a natural user interface (NUI), such as touch applications and multi-touch applications. It supports natural user interfaces (NUIs), including touch and multi-touch applications. [KivyMD](https://kivymd.readthedocs.io/en/latest/) is another library that enhances the appearance of Kivy applications by providing Material Design components and widgets. This facilitates the development process and saves time. 

Install both Kivy and KivyMD before building an application. Start by creating a folder named `my-project` and open it in Visual Studio Code. After opening this project, create a file named `mainapp.py`.


## Create main python and kv files

In `mainapp.py`, first import `App` from the Kivy library. Then create a class named `MainApp` to run the application. Note that the class name `MainApp` need to match the name of the Python script. This class will be used whenever we run the application.

In order to make usre `MainApp` works as we expected, we need to let it extends one parent `MDApp` class in `KivyMD`. So `Class MainApp(MDApp)` will be used for our application. 

```
from kivy.app import App
from kivymd.app import MDApp

class MainWidget():
    pass

class MainApp(MDApp):

    def build(self):
    # must have one build and return the widget class in main.kv
    return MainWidget() # return the widget class in main.kv, we also need have one corresponding one this mainapp.py
    
```

Create a new file with the extension `.kv`. The name of this `.kv` file must match the first part or the prefix of the class name we just created to run the application. Therefore, the `.kv` file should be named `main.kv`, and this `.kv` file is used for the user interface, while `mainapp.py` is responsible for the backend logic.

After creating `main.kv` and `mainapp.py`, to enable communication between the backend logic written in Python and the UI, we need to define two functions in the main class `MainApp(MDApp)`. The first function is `build`, which actually constructs the application, and the second is `on_start`, which is executed whenever the application starts. These two functions are crucial to the application's lifecycle.

The file `main.kv` will contain many widgets. Our initial step is to create the main widget <MainWidget>. In the build function, we will return this widget and simultaneously create the corresponding widget class in `mainapp.py` for the kv file. For each widget create in kv file, we need to build one corresponding widget class in the python file. 

## Run one kivy application


We can call `MainApp().run()` to run the app, but currently, `main.kv` contains nothing. We need to import a layout and extend the main widget as `MainWidget(BoxLayout)`. Open the terminal, navigate to the `my-project` directory, and run `python mainapp.py`.

```
from kivy.app import App
from kivymd.app import MDApp
from kivy.uix.boxlayout import BoxLayout

class MainWidget(BoxLayout):
    pass

class MainApp(MDApp):
    def build(self):
        return MainWidget() 

MainApp().run() # run the app
```

## Work on user interface using Kivy

After running the App, we will see one empty application, now we can close it up and head on over to the`main.kv` for its user interface. Make sure click 'tab' for creating one child of a specific appearance.  

To enhance the main.kv file, we need to add widgets to create a user interface using Kivy. The <MainWidge> syntax is often used in Kivy language files (.kv) to define properties and structure for a class

- Create a `Screen` widget that forms the base of the app’s interface.
- Add a `NavigationLayout` inside the `Screen`. The NavigationLayout widget in KivyMD is typically used for implementing a drawer navigation layout.
- `ScreenManager` is nested within `NavigationLayout`, which suggests multiple screens will be managed by this layout.
- Create a custom screen class `HomeScreen` with an assigned name. Inside it, add a `BoxLayout` with a vertical orientation organizes the components in a vertical stack. 
- Use `MDToolbar` with properties `title`, `elevation` and `left_action_items`. It will be used at the top of the screen as an app bar.
  - `left_action_items` adds a menu icon on the left side of the toolbar, which can open the navigation drawer.
- Implement `MDNavigationDrawer`, Add an `MDNavigationDrawer` at the same level as `ScreenManager` within `NavigationLayout`.
  - Assign id `nav_drawer` so it can be referenced within the `left_action_items` to toggle the drawer’s visibility. 
- `ContentNavigationDrawer` widget serves as the content area for `MDNavigationDrawer`. When the navigation drawer is opened, `ContentNavigationDrawer` determines what appears inside it, like icons, text, buttons, or links.

```
<MainWidge>:
    Screen:

        NavigationLayout: 
            ScreenManager:
                id: screen_manager
                
                HomeScreen: 
                    name: 'home screen'
                
                    BoxLayout: 
                        orientation: 'vertical'

                        MDToolbar:
                            title: 'My app'
                            elevation: 10
                            left_action_items: [['menu', lambda x: nav_drawer.toggle_nav_drawer()]]  
                        
                    ScrollView:   
            

            MDNavigationDrawer:
                id: nav_drawer

                ContentNavigationDrawer:
                    id: content_drawer
                    screen_manager: screen_manager
                    nav_drawer: nav_drawer
```

- Use angular brackets to create a new widget `<ContentNavigationDrawer>`. It serves as the main container for the navigation drawer's content.
- `AnchorLayout` is used to position the avatar image within the `ContentNavigationDrawer`, anchored to the left.
  - `Image` dsplays the avatar or logo image at the top of the navigation drawer.
- `ScrollView` allows the list of items in the navigation drawer to be scrollable if there are too many items to fit on the screen.
  - `MDList` contains list items in a Material Design style, commonly used for navigation options in a drawer.
  - `OneLineListItem` displays individual menu options for navigation within the drawer.


```
<ContentNavigationDrawer>
    orientation: 'vertical'
    padding: '8dp'
    spacing: '8dp'

    AnchorLayout:
        anchor_x: 'left'
        size_hint_y: None
        height: avatar.height

        Image: 
            id: avatar
            size_hint: None, None
            size: "50dp", "50dp"
            source: 'data/logo.png'

    ScrollView: 
        MDList:

            OneLineListItem:
                text: 'Home'
            

            OneLineListItem:
                text: 'About us'
```

