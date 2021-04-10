class SecretManagerCannotBeReachedException(Exception):

    def __str__(self):
        print('Secret Manager cannot be reached')
