class APIJSONCannotBeRead(Exception):

    def __str__(self):
        print('The response from the API cannot be read')
