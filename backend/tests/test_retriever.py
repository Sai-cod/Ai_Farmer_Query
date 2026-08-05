from pathlib import Path

from app.rag.embeddings import EmbeddingModel
from app.rag.retriever import Retriever

# Project root
BASE_DIR = Path(__file__).resolve().parent.parent

VECTORSTORE_PATH = BASE_DIR / "models" / "faiss_index"

# Load embedding model
embedding_model = EmbeddingModel().get_embedding_model()

# Load FAISS
retriever = Retriever(embedding_model)
retriever.load_vectorstore(str(VECTORSTORE_PATH))

# Test query
query = "What is the seed treatment for soybean?"

results = retriever.search(query, k=3)

print("\nRetrieved Chunks:\n")

for i, doc in enumerate(results, start=1):
    print("=" * 60)
    print(f"Result {i}")
    print(f"Source: {doc.metadata.get('source')}")
    print(doc.page_content[:500])
