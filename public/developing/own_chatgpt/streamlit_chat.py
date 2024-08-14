# import ollama
# # List models
# ollama.list()
# [model['name'] for model in ollama.list()['models']]

# # show info about a model
# # ollama.show('llama3.1:8b-instruct-q5_K_M')
# {k: v for k,v in ollama.show('llama3.1:8b-instruct-q5_K_M').items() if k != 'license'}
