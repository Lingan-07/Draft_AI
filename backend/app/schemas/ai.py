from pydantic import BaseModel


class ToneRequest(BaseModel):
    tone: str