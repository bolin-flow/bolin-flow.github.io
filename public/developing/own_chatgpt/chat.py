import ollama
# List models
ollama.list()
[model['name'] for model in ollama.list()['models']]