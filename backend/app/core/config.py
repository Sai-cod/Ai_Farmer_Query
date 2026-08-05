from pathlib import Path

# ==========================
# Project Paths
# ==========================

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATA_DIR = BASE_DIR / "data" / "raw" / "pdf"

VECTORSTORE_PATH = BASE_DIR / "models" / "faiss_index"

# ==========================
# Embedding Model
# ==========================

EMBEDDING_MODEL = "BAAI/bge-m3"

# ==========================
# LLM
# ==========================

LLM_MODEL = "gemma3:4b"

# ==========================
# Chunking
# ==========================

CHUNK_SIZE = 500

CHUNK_OVERLAP = 100

# ==========================
# Retrieval
# ==========================

TOP_K = 3
