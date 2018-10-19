# MonitoringPortal

This is a tiny application provide a real-time portal for users to monitor their patients' activities. A mockup data server is defined as a simulation of external data source, which allows this server to pull data from an external api. 

Tech Stack
- Vue
- Node/Express
- Socket.io
- ElementUI
- JWT



# Quick start

## install dependencies
npm install

## run for dev
npm run dev

node server.js

access http://localhost:8080/ via your browser



## build for production with minification
npm run build

## serving
npm run start

## access
access http://localhost:3000/ via your browser

## Docker
Please bind port 3000 of the container to port 3000 on localhost of the host machine.



# Question Answers
1. If you had more time, what would you change or focus more time on?
A: At first, I would spend more time on communications with users for requirement elicitation. The given user story is to short for this purposes. Second, Security feature would be implemented for both information protection and privacy issues. Third, improve the notification functionality with classifying info level based on locations (i.e. leaving home / entering unknown area should be hazardous so a warning should be sent to clinicians.

2. Which part of the solution consumed the most amount of time?
A: Define and learn to use suitable technologies for this solution. This task highlights the importance of notifying where each patient is in real-time. In this case, I think websocket would be great for this purpose, so I spent some time on Socket.io and its implementations. 

3. What would you suggest to the customer that they may not have thought of in regards to their request?
A: Since this project aims to serve clinicians and their patients with real-data location data, security and privacy considerations should be a high priority. Hence, this application also needs to help clinicians to identify potential hazards in a short time, which means data filtering and classification would be useful.


# Closing Interview Questions
1. What did you like about this interview?
A: I think this technical test is exciting and challenging, especially the 'real-time' requirement. Since I am not familiar with such a task, it is very interesting for me to find solutions and learn new tools.

2. What would you do to improve this interview process?
I would say a short discussion regarding the solution could be very helpful. Through this conversation, designs and ideas can be explained, and I can gain useful advices from seniors.


