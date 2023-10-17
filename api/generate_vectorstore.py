import os

from langchain.document_loaders import PyPDFLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import SpacyTextSplitter
from langchain.vectorstores import FAISS

def getDocuments(sourceName=""):
    loader = PyPDFLoader("./sources/Loremipsum.pdf")
    splitter = SpacyTextSplitter(pipeline="en_core_web_lg")
    data = loader.load_and_split(splitter)
    return data

async def generateVectorStores(file_path: str) -> bytes:

    # Can use remote url to fetch pdf.
    # https://api.python.langchain.com/en/latest/_modules/langchain/document_loaders/pdf.html
    loader = PyPDFLoader(file_path)
    splitter = SpacyTextSplitter(pipeline="en_core_web_lg")
    documents = loader.load_and_split(splitter)

    vectorstore = FAISS.from_documents(documents, embedding=OpenAIEmbeddings(openai_api_key=os.environ['OPEN_AI_KEY']))
    vs_bytes = vectorstore.serialize_to_bytes()

    os.remove(file_path)

    return vs_bytes


if __name__ == '__main__':
    documents = getDocuments()
    vectorstore = FAISS.from_documents(documents, embedding=OpenAIEmbeddings(openai_api_key=os.environ['OPEN_AI_KEY']))
    vectorstore.save_local("./vectorstores/faiss_index_lorem_ip_sum_spacy_splitter")


