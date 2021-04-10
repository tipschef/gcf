import os
from dataclasses import dataclass, field

from src.exceptions.main_exceptions import EnvironmentVariableNotSetException
from src.exporters.pubsub_exporter import PubSubExporter
from src.importers.api_importer import APIImporter
from src.importers.secret_importer import SecretManagerImporter


@dataclass
class GetPeopleToPayExecution:
    secret_manager_importer: SecretManagerImporter = field(init=False)
    api_importer: APIImporter = field(init=False)
    pub_sub_exporter: PubSubExporter = field(init=False)

    def __post_init__(self):
        self._check_env_variables()

        project_id = os.getenv('PROJECT_ID')
        env = os.getenv('PROJECT_ENV')

        self._build_secret_manager_importer(project_id, env)
        self._build_api_importer()
        self._build_pub_sub_exporter()

    def _build_api_importer(self):
        secret_json = self.secret_manager_importer.get_secret_json()
        self.api_importer = APIImporter(secret_json.get('url'), secret_json.get('port'))

    def _build_secret_manager_importer(self, project_id, env):
        self.secret_manager_importer = SecretManagerImporter(project_id, 'secret-gcf-get_people_to_pay', env)

    def _build_pub_sub_exporter(self):
        self.pub_sub_exporter = PubSubExporter()

    def start(self):
        print('Getting all people to pay from the API')
        people_to_pay = self.api_importer.get_all_people_to_pay()

        print('Send users to be payed to pubsub')
        self.pub_sub_exporter.send_users_to_pubsub(people_to_pay)

    @staticmethod
    def _check_env_variables():
        if not os.getenv('PROJECT_ID'):
            raise EnvironmentVariableNotSetException('PROJECT_ID')
        if not os.getenv('PROJECT_ENV'):
            raise EnvironmentVariableNotSetException('PROJECT_ENV')


def start_gcf_get_people_to_pay(event, context):
    print('Start of the execution of `gcf-get_people_to_pay`')
    print(event)
    print(context)

    GetPeopleToPayExecution().start()

    print('End of the execution of `gcf-get_people_to_pay`')
