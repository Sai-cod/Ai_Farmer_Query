from pathlib import Path

from app.preprocessing.pdf_loader import PDFLoader
from app.rag.chunking import TextChunker

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

PDF_FOLDER = BASE_DIR / "data" / "raw" / "pdf"

# Load PDFs
loader = PDFLoader(str(PDF_FOLDER))
documents = loader.load_pdfs()

print(f"\nLoaded {len(documents)} PDF(s)")

# Chunk PDFs
chunker = TextChunker(chunk_size=500, chunk_overlap=100)
chunks = chunker.chunk_documents(documents)

print(f"\nTotal Chunks Created: {len(chunks)}")

print("\nFirst Chunk")
print("=" * 60)
print("Filename:", chunks[0]["filename"])
print("Characters:", len(chunks[0]["content"]))
print(chunks[0]["content"])
