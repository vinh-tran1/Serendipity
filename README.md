# Human Computer Interaction Final Prototype

### Description:

Serendipity engages the community to anonymously share positive messages among one another. It displays 3 unique messages for the user to choose from. Once they move to the card they desire to open, the hidden message will be revealed for a temporary period. Thereafter, the user can exit or decide to leave a new message behind by scanning a QR code to fill out a google form.


### What We Hope To Achieve:

Serendipity is a program where users virtually open messages written by others and write their own messages for future users to open. Serendipity hopes to spread authentic positivity and improve other people's moods through messages that contain happy and uplifting words. Not only that, users will also hopefully feel a sense of value themselves when they write and share their own messages. Additionally, Serendipity will help reinforce a more positive and cohesive community that will benefit people's daily lives and faciliate productive communication through anonymous messages. 

Serendipity uses a Kinect Azure sensor to track people in front of the display. The Kinect returns joint and body positions which we utilize to navigate and interact with the program. 

To contribute, scan the QR code at the end to submit your own via [Message Google Form](https://docs.google.com/forms/d/e/1FAIpQLScH_FncTkA2onxPRmCydOxVaJquJRJmsYl6Z26GNj-0JHCQaw/viewform?usp=sf_link)

<hr>

## Setup

### Virtual Environment
1. python3 -m venv <env_name>
2. source <env_name>/bin/activate
3. pip install -r requirements.txt

### Running App
- Option 1 (recommended): python runserver.py <port_number>
  - eg. python runserver.py 17290
- Option 2: flask run

Bugs: sometimes a rare issue with Flask arises where only a blank page loads. To address this, re-open on the application on a different port number

### Refreshing Database

Due to manual authentication requirements of the google forms api which would hinder the user experience, we decided to have a local datastore of the messages that can be periodically refreshed. To refresh this database you must go through the following instructions:

1. python messages.py
2. You will be redirected to your browser where you must use a yale.edu account to authenticate your requset to the API
- Important that it is an account within the yale university domain due to restricted permissions of a developing app.

*Messsages.csv* will be updated as used for future requests by randomly selecting resposnes

<hr>

## Constraints

- As previously mentioned in the *Refreshing Database* section under **Setup**, the [Google Forms API](https://developers.google.com/forms/api/guides/retrieve-forms-responses) has strict authentication requirements. In order to refresh the database, you must have a google account within the Yale domain and use it during the authentication proccess while running messages.py
- For best performance, users should stand at least 2 feet away (but no more than 7 feet) from the TV screen and limit people in the background

<hr>

## Collaboration Records

### Gabe Dos Santos:

abc

### Vinh Tran:

abc

### Connor Lee:

I mainly contributed to dealing with the page navigation of the program. I used the right hand, left hand, body position detection functions that Vinh made to write functions that will go to next page, return home, or open messages. I helped with styling each of the pages and made sure that we had proper indicators to display the status of our program such as progress bars. I also made sure to include a bad word filter, so that people would not be able to submit disgraceful messages. I created a function to keep track of a single user, so that multiple people would not interfere with the interaction. Gabe did a great job with creating cool animations for our pages and integrating the Google API for submitting messages. Vinh did a great job helping style the pages and creating useful utility functions. 

<hr>

## References

Course resource to guide taking input from the kinect sensor:
[Display Input Reference](https://cpsc484-584-hci.gitlab.io/s23/display_tutorial/)

CSS Framework simplifying styling:
[Bootstrap Framework](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
