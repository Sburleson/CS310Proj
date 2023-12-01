# CS310Proj

### Functionality:
When a user first pulls up the page, they are greeted by the EZ Housing logo as well as two text boxes that prompt the user to enter their studentID and a password. When the user clicks "submit" the input information is saved in the database that will store the credit information and roommate information for the student. A navigation bar in the top right of the page takes users to "Home", "Residence Halls", and "Survey". The residence halls page uses an API and JSON to store the information for each of the residence halls. The user can select any of the housing options at Elizabethtown College, and a picture of the selected housing option appears in the middle of the screen. Eventually, users will be able to scroll through images of the floorplans, but currently the page shows the outside of the selected building. The survey page consists of a dropdown bar that allows users to select the type of residence hall that they want. They can also input the studentID for their roommates. Eventually, the studentID submittion will be sent to the database and the average number of credits will be calculated for the roommate group. A JavaScript function will calculate the average and create a queue of students based on the order of credits. The order of queue will be shown on each of the pages so users can see when they can select housing.

### Design:
The website consists of two main logos that feature the EZ Housing name. We have a bird logo that keeps a simple Etown theme, and we have a text logo that adds to the visual appeal of the website. We use the same color scheme as Elizabethtown College to keep the website consistent with the college. Bootstrap and FontAwesome has been implemented to give the page a more user-friendly feel. 


### Use:
First, login to the website using correct credentials. In future use, these credentials will be provided to the user from the college. Then, browse the possible housing options on the residence hall page to determine where you want to live. Next, click the survey button in the navigation bar. This takes you to the survey page where you can input your student ID as well as your roommates. Click the save button. The group will be created and you are prompted to click on the housing button. Your group ID will display on the screen and you can see your number in the queue. If you are first in the queue, you can select your housing by entering the RoomID for the place you want to live. If the room is vacant, then your selection is saved properly. Otherwise, a message will appear and you are told to select another room.


### API Documentation:
Queue-order: 
  Type: GET

Check Room Occupancy:
  Type: POST

Occupy Room:
  Type: POST

Login:
  Type: POST

Group:
  Type: POST
