from dataclasses import dataclass


@dataclass
class User:
    name: str
    surname: str
    paypal_account: str
    repartition: str
    email: str