from fastapi import APIRouter
from pydantic import BaseModel

from app.services.chat_service import ChatService

router = APIRouter()

chat_service = ChatService()


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


@router.post("/ask", response_model=ChatResponse)
def ask_question(request: ChatRequest):
    result = chat_service.ask(request.question)

    return ChatResponse(
        answer=result["answer"]
    )
