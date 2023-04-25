# Human Computer Interaction Final Prototype

Serendipity is a program where users virtually open messages written by others and write their own messages for future users to open. Serendipity hopes to spread positivity and improve people's moods through messages that contain happy and postive notes. Users will hopefully feel a sense of value when they share their own messages. Additionally, Serendipity will help reinforce a positive community that will benefit people's daily lives and faciliate productive communication through anonymous messages. 

Serendipity uses a Kinect Azure sensor to track people in front of the display. The Kinect returns joint and body positions which we utilize to navigate and interact with the program. 

**Task 1:** Improving other people’s moods through authentic positivity
- The system will share uplifting and authentic messages for people (filter out bad/negative words). This simple, but meaningful moment of the day will provide a positive impact and improve people’s mood.

**Task 2:** Facilitate communication and build community between strangers 
- The system will build a strong community at Yale by facilitating communication between people. Allowing users to leave anonymous, positive messages for others will make our campus more connected.

To contribute, submit your own via [Message Google Form](https://docs.google.com/forms/d/e/1FAIpQLScH_FncTkA2onxPRmCydOxVaJquJRJmsYl6Z26GNj-0JHCQaw/viewform?usp=sf_link)

<hr>

## Setup

### Virtual Environment
1. python3 -m venv <env_name>
2. source <env_name>/bin/activate
3. pip install -r requirements.txt

OR

1. pipenv install -r requirements.txt

### Running App
- Option 1 (recommended): python runserver.py <port_number>
  - eg. python runserver.py 8000
- Option 2: flask run

Bugs: sometimes a rare issue with Flask arises where only a blank page loads. To address this, re-open on the application on a different port number.

### Refreshing Database

*Messsages.csv* can be updated with form messages which are filtered out for bad words and will be randomly selected for display in the app.

Due to manual authentication requirements of the google forms api which would hinder the user experience, we decided to have a local datastore of the messages that can be periodically refreshed. To refresh this database you must go through the following instructions:

1. python messages.py
2. You will be redirected to your browser where you must use a yale.edu account to authenticate your requset to the API
- Important that it is an **account within the yale university domain** due to restricted permissions of a developing app.

<hr>

## Constraints

As previously mentioned in the *Refreshing Database* section under **Setup**, the [Google Forms API](https://developers.google.com/forms/api/guides/retrieve-forms-responses) has strict authentication requirements. In order to refresh the database, you must have a google account within the yale domain and use it during the authentication proccess while running messages.py. This is only relevant if you wish to refresh the datastore.

<hr>

## Collaboration Records

### Gabe Dos Santos:

My main contribution to this project was creating the structure and flask backend. I first made very simple html files for all of the pages to work as a starting point. From there we tried to connect to the google forms api via javascript but found that we needed a backend for authentication. Therefore I created a simple flask backend based on a previous class. When setting up the google forms API, we found that it required manual authentication for every call so I decided to create a local csv datastore of the messages that could be periodically updated. Then I connected the messages.csv to the frontend and displayed a random one each time. I also worked on creating the basic structure for our kinect functions by having a utils file that processes the frame and returns only the releveant information we want to know such as isLeftHandRaised. Finally, I contacted a ULA to check our setup.sh and run.sh files and give permissions to run our application on the TV.

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