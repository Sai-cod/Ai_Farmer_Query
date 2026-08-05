from langchain_community.vectorstores import FAISS


class Retriever:
    def __init__(self, embedding_model):
        self.embedding_model = embedding_model
        self.vectorstore = None

    def load_vectorstore(self, vectorstore_path):
        self.vectorstore = FAISS.load_local(
            folder_path=vectorstore_path,
            embeddings=self.embedding_model,
            allow_dangerous_deserialization=True
        )

    def search(self, query, k=3):
        return self.vectorstore.similarity_search(query, k=k)
