from dataclasses import dataclass, field
from typing import List

from google.cloud import pubsub_v1
from src.models.user import User


@dataclass
class PubSubExporter:
    project_id: str
    topic_id: str
    env: str
    publisher: pubsub_v1.PublisherClient = field(init=False)

    def __post_init__(self):
        self.publisher = pubsub_v1.PublisherClient()
        self.topic_path = f'projects/{self.project_id}/topics/topic-queue-{self.env}-{self.topic_id}'

    def send_users_to_pubsub(self, users: List[User]) -> None:
        for user in users:
            self._send_message_to_pub_sub(user.paypal_account)

    def _send_message_to_pub_sub(self, data: str):
        print(self.topic_path)
        # future = self.publisher.publish(self.topic_path, data.encode('utf-8'), origin='python-sample', username='gcp')
        future = self.publisher.publish(self.topic_path, b'ko')
        future.add_done_callback(self.get_callback(future, data.encode('utf-8')))

    def get_callback(self, f, data):
        def callback(f):
            try:
                print(f.result())
                print('passer')
            except:  # noqa
                print("Please handle {} for {}.".format(f.exception(), data))

        return callback
