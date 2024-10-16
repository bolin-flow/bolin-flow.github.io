+++
title = 'Chat with Your Books'
date = 2024-09-18T20:26:26-00:00
draft = false
tags = ['Information Retrieval', 'LLM', 'RAG']
showTableOfContents = false

+++

 I've always been curious about interacting with books and documents in a way that deepens my understanding. I want to read in a dynamic, interactive way that sparks new insights and encourages deeper contemplation. I wish there were more visuals, thought-provoking questions, and summarized topics or keywords for each section to help readers comprehend and distill what they read.


There are many tools avaialble to build these functionality. For example, parsing and splitting large documents and then building chatbot with LLM, embedding model and information retrieval methods. For each text chunk we are also able to extract keywords with pretrained BERT models or we clustering on top of all text chunks to extract topics from the text data we have. Tools and methods are aviailable there, the challenge part is how to cohesively coordianate these functionalities together to provide smooth user experience wtih the delviered product. If certrain policy constrains, we also need consider how to host these models and datasets to ensure security. In this article, I'm focusing on investigating Azure modeling and search services only since we can host, monitor and evluate within one platform and the secuirty check effort can be saved with one target provider. 

There are numerous tools available to build these functionalities. For instance, we can parse and split large documents, generate interactive responses using LLMs and embedding models, and utilize various information retrieval techniques. For each text chunk, we can also extract keywords using pretrained BERT models or apply clustering to derive relevant topics from the data. While these tools and methods exist, one challenge lies in cohesively integrating these functionalities to create a smooth user experience with the final product. Moreover, when policy constraints are involved, we must ensure secure hosting and proper evaluation of models and datasets. In this article, I focus on exploring Azure search services, as they provide hosting, monitoring, and evaluation capabilities within Azure cloud platform, simplifying the security compliance process with one provider.











