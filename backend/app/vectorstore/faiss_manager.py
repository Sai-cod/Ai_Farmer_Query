from pathlib import Path
from langchain_community.vectorstores import FAISS


class FAISSManager:
    def __init__(self, embedding_model):
        self.embedding_model = embedding_model

    def create_vectorstore(self, chunks):
        print("Preparing texts...")

        texts = [chunk["content"] for chunk in chunks]

        metadatas = [
            {"source": chunk["filename"]}
            for chunk in chunks
        ]

        print(f"Generating embeddings for {len(texts)} chunks...")
        print("This may take several minutes on CPU...")

        vectorstore = FAISS.from_texts(
            texts=texts,
            embedding=self.embedding_model,
            metadatas=metadatas
        )

        print("FAISS index created!")

        return vectorstore

    def save_vectorstore(self, vectorstore, save_path):
        save_path = Path(save_path)

        save_path.parent.mkdir(parents=True, exist_ok=True)

        print("Saving FAISS index...")

        vectorstore.save_local(str(save_path))

        print("Saved successfully!")
