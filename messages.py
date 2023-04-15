from apiclient import discovery
from httplib2 import Http
from oauth2client import client, file, tools
import pandas as pd
import random

SCOPES = "https://www.googleapis.com/auth/forms.responses.readonly"
DISCOVERY_DOC = "https://forms.googleapis.com/$discovery/rest?version=v1"

def refresh_messages():
    """Fetches a message from the Google Form and creates local database"""

    store = file.Storage('token.json')
    creds = None
    if not creds or creds.invalid:
        flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
        creds = tools.run_flow(flow, store)
    service = discovery.build('forms', 'v1', http=creds.authorize(
        Http()), discoveryServiceUrl=DISCOVERY_DOC, static_discovery=False)

    # Prints the responses of your specified form:
    form_id = '1BaWJvUVODdoshFyzfgiGp2iuLCkBoRFr5TAtgwIcs6k'
    response = service.forms().responses().list(formId=form_id).execute()

    messages = []
    for response in response['responses']:
        message = response['answers']['3be5d8d8']['textAnswers']['answers'][0]['value']
        messages.append(message)

    print(messages)

    # Create a dataframe from the text answer values
    df = pd.DataFrame({'messages': messages})
    df.to_csv('messages.csv', index=False)

def fetch_message():
    """Fetches a random message from the local database"""

    df = pd.read_csv('messages.csv')

    random_index = random.randint(0, len(df) - 1)
    random_message = df.iloc[random_index]['messages']

    return random_message

if __name__ == "__main__":
    refresh_messages()