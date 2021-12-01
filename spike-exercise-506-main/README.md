# Spike-exercise-506

Our MadRentals is a IOS application developed using the MERN stack. Evidently, this repo is divided into two different sub-repos: 'backend' and 'mobile'.


A sample Renter account: 
username: cody@gmail.com
password: password

A sample Owner account:
username: butler@gmail.com
password: password


#### Backend 
Backend is the server that provides all the APIs that the frontend will utilize to satisfy user's request.
#### Mobile
Mobile is the folder where our mobile app resides in. 


## Requirement
- You need Node.js installed on your machine. We prefer to use the latest version of Node. 
- You need to have Expo Cli installed on your machine
   `npm install -g expo-cli`
- You need an IOS device (Iphone) with Expo Go installed.

(If having trouble running the app, please check this link :https://reactnative.dev/docs/environment-setup out)



## Getting Started

To use our application, you need to run both the server and the mobile on your computer.

#### Server
You need to first go into the 'backend' folder.\
`cd backend`\
Then, install all dependencies (Skip this step if already ran it)\
`npm install` \
Finally, run the server\
`node app.js`

#### Mobile
In **another terminal**, we will run the mobile app host.\
First, go into the mobile folder.\
`cd mobile`\
Then, install all dependencies (Skip this step if already ran it)\
`npm install` 

Change the IP address in the `mobile/api.js`  file to your IPv4 address.\
It should look something like this:\
`export default "10.141.18.15";`

Run the expo server\
`npm start`

When your browser opens with QR code displayed, scan the QR code with your Iphone camera app, and click when redirection appears.\
You will then be lead to the Expo app and you App should be running.
