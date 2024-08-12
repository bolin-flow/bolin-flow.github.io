+++
title = 'Build Own ChatGPT: An Easy How-To'
date = 2024-08-12T16:16:00-00:00
draft = false
tags = ['LLM', 'Ollama']
showTableOfContents = true

+++


## Download Ollama and Run Commands

Ollama is a versatile tool that offers a range of language models with detailed specifications. To get started, [download Ollama](https://ollama.com/download) and explore the different models available on the Ollama website. From now, we are able to use Ollama commands in our terminals. 

Run `ollama`, then we are able to see available commands:
![ollama_command.png](ollama_command.png)

Here we can find a list of llama3.1 models listed in [llama3.1 download page](https://ollama.com/library/llama3.1:8b-instruct-q4_K_M/blobs/11ce4ee3e170) There are some comparisons made fir dufferebt types of

## LLM Sizes, Types and Quantizations

In the context of large language models (LLMs):

- Chat: Direct conversation with the model, where the character card serves as your prompt.
- Instruct: A chat between "you" and the "assistant," following the model's prompt format.
- Chat-Instruct: A conversation where you interact with a character card using the instruct template. For example, "You are an AI playing [X character]; respond as the character would." This is then adapted to formats like Alpaca, Wizard, etc.

There is no definitive "best" option, but for factual information, instruct mode is typically more reliable. However, instruct-chat doesn't necessarily improve character portrayal or produce longer responses. one may work better than the other for a particular model and prompt.

K_M or K_S suffixes indicate a texture pack, where most textures are of a specific resolution, but some critical textures are kept at a higher resolution.

For more information on model suffixes and quantization in LLMs, visit [this page](https://www.reddit.com/r/LocalLLaMA/comments/17lavtr/how_do_i_choose_the_llama_model_its_so_confusing/). For performance statistics on different model sizes and quantizations, check [this comment](https://github.com/ggerganov/llama.cpp/pull/1684#issuecomment-1579252501) 


Let's select one instruct small model and download it using ollama with this command `ollama run llama3.1:8b-instruct-q5_K_M`

![download_llama3_model.png](download_llama3_model.png)