from fastapi import FastAPI

from app.api.chat import router as chat_router

app = FastAPI(
    title="AI Farmer Query Support System",
    description="RAG-based AI Assistant for Farmers",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "AI Farmer Query Support System is Running 🚜"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# Register Chat API
app.include_router(chat_router)
