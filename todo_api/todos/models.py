import uuid
from django.db import models
from utils.models import BaseModel
from users.models import User


TODO_STATUS = (
    ("Completed", "Completed"),
    ("Not-Completed", "Not-Completed"),
)

class TodoModel(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo = models.TextField()
    status = models.CharField(max_length=50, choices=TODO_STATUS, default="Not-Completed")

    def __str__(self):
        return f"{self.todo}"