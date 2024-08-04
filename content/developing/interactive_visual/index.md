+++
title = 'Steps to Integrate Interactive Visuals into Hugo Websites'
date = 2024-07-22T12:16:56-04:00
draft = false
tags = ['Generative Art', 'Creative Coding']

+++

There are main x steps to integrate intergrate visualizations to Hugo website. This website is 


By embedding generative art coding with p5.js into the background of a Hugo markdown page, we can achieve interactive results. Add the following markdown to the page:


<div style="display: flex; justify-content: center; align-items: center;">
    <img src="undraw_heart.svg" alt="Heart" style="margin-left: 10px;">
    <img src="undraw_cloud.svg" alt="Cloud" style="margin-left: 10px;">
    <img src="undraw_heart.svg" alt="Heart" style="margin-left: 10px;">
    <img src="undraw_cloud.svg" alt="Cloud" style="margin-left: 10px;">
    <img src="undraw_heart.svg" alt="Heart" style="margin-left: 10px;">
   <img src="undraw_cloud.svg" alt="Cloud" style="margin-left: 10px;">
</div>

{{< figure src="undraw_floating.svg" class="m-auto mt-6 max-w-prose" >}}


<p style="text-align: center;">
    Illustrations by <a href="https://ninalimpi.com/">Katerina Limpitsouni</a>
</p>

<script src="https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js"></script> <!-- load p5.js from CDN--> 
<script src="/js/particles.js"></script> <!-- this will pick our script  -->



