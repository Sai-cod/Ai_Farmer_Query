from pathlib import Path

from app.preprocessing.pdf_loader import PDFLoader
from app.rag.chunking import TextChunker
from app.rag.embeddings import EmbeddingModel
from app.vectorstore.faiss_manager import FAISSManager

# Project root
BASE_DIR = Path(__file__).resolve().parent.parent

PDF_FOLDER = BASE_DIR / "data" / "raw" / "pdf"
VECTORSTORE_PATH = BASE_DIR / "models" / "faiss_index"

# Step 1: Load PDFs
loader = PDFLoader(str(PDF_FOLDER))
documents = loader.load_pdfs()
print(f"Loaded {len(documents)} PDF(s)")

# Step 2: Chunk Documents
chunker = TextChunker(chunk_size=500, chunk_overlap=100)
chunks = chunker.chunk_documents(documents)
print(f"Created {len(chunks)} chunks")

# Step 3: Load Embedding Model
embedding_model = EmbeddingModel().get_embedding_model()
print("Embedding model loaded")

# Step 4: Create FAISS Index
faiss_manager = FAISSManager(embedding_model)
vectorstore = faiss_manager.create_vectorstore(chunks)

# Step 5: Save FAISS Index
faiss_manager.save_vectorstore(vectorstore, VECTORSTORE_PATH)

print("\n✅ FAISS Index Created Successfully!")
print(f"Saved at: {VECTORSTORE_PATH}")
