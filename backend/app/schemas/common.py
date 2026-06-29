from pydantic import BaseModel


class BaseSchema(BaseModel):
    model_config = {
        "from_attributes": True
    }

__all__ = ["BaseModel", "BaseSchema"]