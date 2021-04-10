import json
from dataclasses import dataclass, field
from typing import List, Optional

import requests
from src.models.user import User

from src.exceptions.api_importer_exceptions import APIJSONCannotBeRead


@dataclass
class APIImporter:
    url: str
    port: int
    full_url: str = field(init=False)

    def __post_init__(self) -> None:
        self.full_url = f'{self.url}:{self.port}'

    def get_all_people_to_pay(self) -> List[User]:
        # TODO Real call to the API

        return [User('Paul', 'Dubois', '65g56df4g65fd4g65dfg', ' 50/50', 'paul@dubois.fr')]

    def make_http_query(self, payload: dict) -> Optional[List[dict]]:
        try:
            response = requests.post(url=self.url, data=payload)
            json_response = response.json()

            return json_response
        except json.JSONDecodeError:
            raise APIJSONCannotBeRead
        except Exception as e:
            print('An unhandled exception occurred')
            print(e)
