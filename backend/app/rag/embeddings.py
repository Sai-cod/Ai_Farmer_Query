from langchain_huggingface import HuggingFaceEmbeddings
from app.core.config import EMBEDDING_MODEL


class EmbeddingModel:
    def __init__(self):
        self.embedding_model = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL
        )

    def get_embedding_model(self):
        return self.embedding_model
