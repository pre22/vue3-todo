import uuid
from django.db import models
from utils.models import BaseModel


class TodoModel(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
