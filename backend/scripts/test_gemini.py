from app.services.ai_service import ai_service

response = ai_service.generate(
    "Say hello in one sentence."
)

print(response)