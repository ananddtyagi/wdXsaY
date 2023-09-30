from operator import itemgetter

from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
from langchain.vectorstores import FAISS
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate

import os


"""
1. Fetch Relevant Source
2. Setup texts
3. Setup Chain
4. Return generated answer
"""


def getInsights():

    vectorstore = FAISS.load_local("./faiss_index_clean_code", embeddings=OpenAIEmbeddings())

    retriever = vectorstore.as_retriever()
    template = \
    """
    Given the following extracted parts of a long document and a question, create a final answer with references ("SOURCES"). 
    If you don't know the answer, just say that you don't know. Don't try to make up an answer.
    ALWAYS return a "SOURCES" part in your answer.
    
    QUESTION: {question}
    =========
    {summaries}
    =========
    FINAL ANSWER : 
    SOURCES: """  
    prompt_template = PromptTemplate(template=template, input_variables=["summaries", "question"])
    chain_type_kwargs = {"prompt": prompt_template}

    chain = RetrievalQAWithSourcesChain.from_chain_type(
        llm=OpenAI(temperature=0),
        retriever=retriever,
        chain_type_kwargs=chain_type_kwargs,
        return_source_documents=True
    )


    answer = chain({"question": "What does clean code say about writing comments?"})    

    print(answer)

    return

if __name__ == "__main__":
  getInsights()