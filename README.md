# IT2810 - Web Development Project 4 - Group 50
With this application you can search for artists, songs, albums ang genres to get information out of our database.

It is available here: [it2810-50.idi.ntnu.no:8084](http://it2810-50.idi.ntnu.no:8084)

### Table of contents:
1. [About us](#AboutUs)
2. [Documentation](#Documentation)
3. [Testing](#Testing)
4. [Setup](#Setup)

### About us <a name="AboutUs"></a>
Our team consists of 5 third year students. Four of us study Computer Science, while the last one studies Computer 
Engineering.


### Documentation <a name ="Documentation"></a>
Read our [documentation](DOC.md) to learn more about the project architecture, the technologies we use etc.

### Testing <a name="Testing"></a>
  Read About our [testing](TESTING.md) to get an overview of our thoughts and overall progress with testing. 

### Setup <a name="Setup"></a>

#### How to run locally
   If you want to clone our repository and run our project locally, then you can do this by opening the terminal 
   and write:
   
   `git clone https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-50.git`
   
   Install the angular CLI for your terminal in order to be able to build our project with the following command:
   
   `npm install @angular/{common,compiler,compiler-cli,core,forms,http,platform-browser,platform-browser-dynamic,platform-server,router,animations}@latest typescript@latest --save`
   
   Now that you have our project locally navigate to the \website folder and install the dependencies with 
   
   `npm install`
   
   Everything is now set up and you can start our server with the following
   
   `npm start`
   
   Then open a new tab of the terminal and run
   
   `ng build --watch`
   
   Our website will now be built locally and are hosted on localhost:8084
