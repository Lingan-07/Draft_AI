from app.utils.jwt import create_access_token, verify_access_token

token = create_access_token(
    {
        "user_id": 1,
        "email": "test@gmail.com",
        "role": "USER",
    }
)

print(token)

payload = verify_access_token(token)

print(payload)