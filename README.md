# IT2810 - Web Development Project 4 - Group 50
With this application you can search for artists, songs, albums ang genres to get information out of our database.

### Table of contents:
1. [About us](#AboutUs)
2. [Documentation](#Documentation) 
3. [File Structure](#FileStruct)
4. [Setup](#Setup)

### About us <a name="AboutUs"></a>
Our team consists of 5 third year students. Four of us study Computer Science, while the last one studies Computer 
Engineering.


### Documentation <a name ="Documentation"></a>
A given requirement for the project is that we use Nodejs on the backend, and Angular frontend. This made
it pretty easy deciding on which type of architecture we wanted to go for. We ended up going for the wastly used MEAN
Stack. The MEANS stack provides a set of Open Source components that together provide an end-to-end framework. 
Starting from the top, to the bottom, the stack is made up of:

- Angular: A front-end framework which runs the projects javascript in the web browser. We chose to go for Angular 4,
 simply because it is the newest version of Angular.
- Express: A back-end framework running on top of Node. The Express framework can be used to render everything on the
 page, route between pages and much more. In our project we have decided to use very little of the functionality 
 express provides, focusing on using it for our REST-API.
- Node: A run-time environment that lets us implement our Javascript code back-end. We don't really use much of nodes
 functionality except for running both the server-side and the web-application. 
- MongoDB: A document database. We use this database to store our data, in JSON documents. MongoDB gives us much 
flexibility in deciding both how we want to associate data with each other and how we want to store it.

In addition to express, we also use mongoose to make it easier to connect, and interact with the database. The figure
below illustrates how the different aspects of the stack interact with each other.

![alt text](images/image.png "Image of our MEAN stack")


Write about Data her: structure and a little bit about MongoDB.

Write about design:


### File Structure <a name="FileStruct"></a>

### Setup <a name="Setup"></a>
