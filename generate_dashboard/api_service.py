from dataclasses import dataclass
from typing import Optional, List

import requests


@dataclass
class APIService:
    url: str
    user_account: str
    user_password: str

    def create_dashboard_data(self):
        self._make_http_query('/v1/users/dashboard/data')

    def _authenticate(self):
        try:
            body = {'username': self.user_account, 'password': self.user_password}
            response = requests.post(url=f'{self.url}/v1/auth/token', data=body)
            json_response = response.json()

            return json_response
        except Exception as exception:
            print('An unhandled exception occurred')
            print(exception)

    @staticmethod
    def _get_token(json_response: dict):
        return json_response.get('access_token')

    def _make_http_query(self, url_route: str) -> Optional[List[dict]]:
        try:
            token = self._get_token(self._authenticate())
            headers = {'Authorization': f'Bearer {token}'}
            response = requests.get(url=f'{self.url}{url_route}', headers=headers)
            json_response = response.json()

            return json_response
        except Exception as e:
            print('An unhandled exception occurred')
            print(e)
