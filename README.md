# Todo-List
Assignment to understand Web Technologies

##Step 1

###Tools Overview Briefly study (and install) following tools.

- Visual Studio Code
- Github and Github desktop
- Chrome developer tools
- One good resource is https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw
- Your code should be in the "www" folder

##Step 2

###Develop a website on your local computer

- Have a look at bootstrap 5
- Create a simple website with a navigation bar and footer. Should have “Home”, “ToDo”, “About” links (example.html)
- Create corresponding pages.
- Use Visual Studio Code for creating this website

##Step 3

###ToDo List Project: Design

- Revise JavaScript
- Read about Live Server in VS Code and use it to develop
- Learn about Visual Studio Plugins
- Learn about Emmet
- Create a Todo list (todo.html)
- The user should be able to Create a new task, delete old task


##Step 4

###ToDo List Project: Functionality

- You could use more JavaScript for this module, Use ES6 syntax
- Add check boxes in front of eavh task to allow user to mark it complete
- When user marks a task as complete, it should become grey
- On uncheck, the task text should again take default color.
- Improve the overall look and feel of the list
- Add keyboard shortcuts to select / unselect tasks

##Step 5

###ToDo List Project: Rearranging

- Add handles at the end of each task that allows user to drag it
- Drag and drop functionality should allow to rearrange the tasks
- Use chrome developer tools to see how your site would look on a mobile device.
- Improve JavaScript, make sure your code is modular.

##Step 5

###ToDo List Project: Visual Enhacement & Details

- Add icons to each task
- Completed and incomplete tasks should have different icons
- You can use Bootstrap icons https://icons.getbootstrap.com/
- On double clicking a task, a details pop-up should open
- In details, you would have "Task Details", "Task Due Date", "Task Proirity"
- The tasks would appear in different color based on Proirity
- he would have a icon at the end to indicate that the due date is approcahing


##Step 6

###ToDo List Project: Pure CSS 

- Create the same list using only HTML, CSS & JS without use of BootStrap.
- Use CSS Media Queries to enrure that the site looks good on mobile.
- Explore CSS Animation, when task is checked (completed) fades smoothly to become grey

##Step 6

###ToDo List Project: Using JSON & Web Local Storage

- In this step we add save and restore functionality
- Add 2 buttons for "Save List" & "Load List"
- When user click "Save List" button
- Save the entire list details in JS Object.
- Export the JS Object as JSON
- Save the JSON to "Web Local Storage"
- When user click "Load List" button
- Read the JSON string from the "Web Local Storage"
- Get the JS Object from JSON string
- Restore the entire list from the JS Object.

##Step 6

###ToDo List Project: Host to Web

- Create a firebase account
- Learn about Firebase
- Host your website to Firebase
- Read about HTTP protocol
- Understand REST API, GET and POST requests

##Step 7

###ToDo List Project: User Accuonts & Use Firebase Realtime Database

- Create Login, Register pages and
- Enable users to login to the ToDO list projct using their google Account.
- Learn about Firebase Realtime Database
- Use it to save list for that user
- When ever user opens the site, they should be able to see their ToDO list pro

##Step 8

###ToDo List Project: Caching

- Detect internet connectivity changes 
- When internet is not connected, use the local storage to save user updates.
- When internet come back, these should be save to Firebase database.
- User shuold be informed using "banners" about these connectivity changes.

##Step 9

###ToDo List Project: Node JS

- Study node JS, create hello world application
- Installing node packages using npm
- Global and local installs
- How package.json file works
- Create a simple calculator console application using NodeJS

##Step 10

###ToDo List Project: Web Application using Node

- Study Express
- Create a web application using node js
- Serve the ToDo app created above using Node instead of Firebase hosting.
- List would only be saved locally (local storage in this case)

##Step 11

###ToDo List Project: TODO App on Node, Mogo DB

Learn Mongo DB
- Explore both local version of Mongo DB and Mongo Atlas
- Create a REST API for ToDo Application
- Full fuctionality of the ToDo application should be working with Mongo + Node.js for a single user

##Step 12

###ToDo List Project: User Management

- Creating and using user accounts using Node JS and Mongo.
- Full fuctionality of the ToDo application should be working with multiple users.
