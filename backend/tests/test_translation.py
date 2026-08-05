from app.services.translation_service import TranslationService

translator = TranslationService()

marathi_text = "सोयाबीन बियाणे प्रक्रिया कशी करावी?"

english = translator.marathi_to_english(marathi_text)

print("\nMarathi:")
print(marathi_text)

print("\nEnglish:")
print(english)

marathi = translator.english_to_marathi(english)

print("\nBack to Marathi:")
print(marathi)
