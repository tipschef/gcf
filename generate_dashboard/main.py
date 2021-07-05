import os
from dataclasses import dataclass, field

from generate_dashboard.api_service import APIService
from generate_dashboard.exceptions import EnvironmentVariableNotSetException
from generate_dashboard.secret_manager_service import SecretManagerService


@dataclass
class GenerateDashboardExecution:
    api_service: APIService = field(init=False)

    def __post_init__(self):
        self._check_env_variables()

        project_id = os.getenv('PROJECT_ID')
        env = os.getenv('PROJECT_ENV')

        self._build_secret_manager_importer(project_id, env)
        self._build_api_service()

    def _build_api_service(self):
        secret_json = self.secret_manager_importer.get_secret_json()
        self.api_service = APIService(secret_json.get('api_url'), secret_json.get('user_account'), secret_json.get('user_password'))

    def _build_secret_manager_importer(self, project_id, env):
        self.secret_manager_importer = SecretManagerService(project_id, 'secret-gcf-generate_dashboard', env)

    def start(self):
        self.api_service.create_dashboard_data()

    @staticmethod
    def _check_env_variables():
        if not os.getenv('PROJECT_ID'):
            raise EnvironmentVariableNotSetException('PROJECT_ID')
        if not os.getenv('PROJECT_ENV'):
            raise EnvironmentVariableNotSetException('PROJECT_ENV')


def start_gcf_generate_dashboard(event, context):
    print('Start of the execution of `generate_dashboard`')
    print(event)
    print(context)

    GenerateDashboardExecution().start()

    print('End of the execution of `generate_dashboard`')
