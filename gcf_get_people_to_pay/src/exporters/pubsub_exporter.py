from dataclasses import dataclass
from typing import List

from src.models.user import User


@dataclass
class PubSubExporter:

    def send_users_to_pubsub(self, users: List[User]) -> None:
        pass