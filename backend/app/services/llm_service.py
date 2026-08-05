from langchain_ollama import ChatOllama
from app.core.config import LLM_MODEL


class LLMService:
    def __init__(self):
        self.llm = ChatOllama(
            model=LLM_MODEL,
            temperature=0
        )

    def invoke(self, prompt: str):
        response = self.llm.invoke(prompt)
        return response.content
