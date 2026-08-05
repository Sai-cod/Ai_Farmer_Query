from app.rag.prompt import (
    MARATHI_TO_ENGLISH_PROMPT,
    ENGLISH_TO_MARATHI_PROMPT,
)
from app.services.llm_service import LLMService


class TranslationService:
    def __init__(self):
        self.llm = LLMService()

    def marathi_to_english(self, text: str):
        prompt = MARATHI_TO_ENGLISH_PROMPT.format(text=text)
        return self.llm.invoke(prompt)

    def english_to_marathi(self, text: str):
        prompt = ENGLISH_TO_MARATHI_PROMPT.format(text=text)
        return self.llm.invoke(prompt)
