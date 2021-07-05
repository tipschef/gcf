class EnvironmentVariableNotSetException(Exception):
    def __init__(self, message):
        super().__init__()
        self.message = message

    def __str__(self):
        return f'{self.message} shall be set as an environment variable'


class SecretManagerCannotBeReachedException(Exception):

    def __str__(self):
        print('Secret Manager cannot be reached')
