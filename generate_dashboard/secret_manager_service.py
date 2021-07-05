import json
from dataclasses import dataclass, field

from google.cloud import secretmanager
from google.cloud.secretmanager_v1 import SecretManagerServiceClient
from exceptions import SecretManagerCannotBeReachedException


@dataclass
class SecretManagerService:
    project: str
    secret_manager_prefix: str
    environment: str
    secret_manager_client: SecretManagerServiceClient = field(init=False)

    def __post_init__(self):
        self.secret_manager_client = secretmanager.SecretManagerServiceClient()

    def get_secret_json(self) -> dict:
        try:
            secret_name = f'{self.secret_manager_prefix}-{self.environment}'

            name = self._create_secret_version_path(self.project, secret_name, 'latest')
            content = self.secret_manager_client.access_secret_version(name=name).payload.data.decode('utf-8')
            return json.loads(content)
        except Exception as err:
            raise SecretManagerCannotBeReachedException()

    @staticmethod
    def _create_secret_version_path(project: str, secret: str, secret_version: str) -> str:
        return f'projects/{project}/secrets/{secret}/versions/{secret_version}'