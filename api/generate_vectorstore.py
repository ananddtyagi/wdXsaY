from langchain.document_loaders import PyPDFLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS

def getDocuments(sourceName=""):
    loader = PyPDFLoader("./api/sources/cleancode.pdf")
    data = loader.load_and_split(RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100))
    return data


if __name__ == '__main__':
    documents = getDocuments()

    vectorstore = FAISS.from_documents(documents, embedding=OpenAIEmbeddings())
    vectorstore.save_local("faiss_index_clean_code")


