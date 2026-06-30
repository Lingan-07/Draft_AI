import json

from fastapi import HTTPException
from google import genai
from google.genai import types

from app.core.settings import settings


class AIService:

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

        self.model = settings.GEMINI_MODEL

    def _generate_content(
        self,
        prompt: str,
    ):
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.7,
                    max_output_tokens=2048,
                ),
            )

            text = response.text.strip()

            # Remove markdown code block if Gemini wraps JSON
            if text.startswith("```json"):
                text = (
                    text.replace("```json", "")
                    .replace("```", "")
                    .strip()
                )

            elif text.startswith("```"):
                text = (
                    text.replace("```", "")
                    .strip()
                )

            return json.loads(text)

        except json.JSONDecodeError:
            raise HTTPException(
                status_code=500,
                detail="Gemini returned an invalid JSON response.",
            )

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Gemini Error: {str(e)}",
            )

    def generate(
        self,
        prompt: str,
    ):
        return self._generate_content(prompt)

    def rewrite(
        self,
        prompt: str,
    ):
        return self._generate_content(prompt)

    def improve(
        self,
        prompt: str,
    ):
        return self._generate_content(prompt)

    def shorten(
        self,
        prompt: str,
    ):
        return self._generate_content(prompt)

    def expand(
        self,
        prompt: str,
    ):
        return self._generate_content(prompt)

    def change_tone(
        self,
        prompt: str,
    ):
        return self._generate_content(prompt)


ai_service = AIService()