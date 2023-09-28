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

import os


"""
1. Fetch Relevant Source
2. Setup texts
3. Setup Chain
4. Return generated answer
"""

def getDocuments(sourceName=""):
    loader = PyPDFLoader("./api/sources/cleancode.pdf")
    data = loader.load_and_split(RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100))
    return data

def getInsights():

    documents = getDocuments()

    vectorstore = FAISS.from_documents(documents, embedding=OpenAIEmbeddings())
    retriever = vectorstore.as_retriever()

    template = """
    Answer the question based only on the following context. If you know know, don't return an answer, just say 'I don't know'
    {context}

    {question}
    """

    chain = RetrievalQAWithSourcesChain.from_chain_type(
        llm=OpenAI(temperature=0),
        retriever=retriever
    )

    answer = chain({"question": "What does clean code say about writing comments?"})    

    print(answer)

    return

if __name__ == "__main__":
  getInsights()