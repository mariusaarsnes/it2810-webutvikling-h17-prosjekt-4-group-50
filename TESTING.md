Our `testing` branch has not yet been merged into `dev`. This is mostly because all the tests are not working as of now, 
since pulling from dev created new problems. So to see our tests kindly change to the `testing` branch. 

To run the tests simply clone the project and pull down the testing branch. Run `npm install` and then run `npm test`. This should be enough for the tests to start. 

Most of the work that has been done with testing has been to make the standard generated tests to work. 
This has been done by importing different provders etc. and making mock-data and -services. Most of the errors that are present now are because the code pass observables. To solve this we will use mockdata and mockservices to simulate the rendering of components, we just have not come around to it yet. 

In general we would like any type of feedback that can help us with the testing. If you have any tips on how to make tests with Material UI work, mainly how to make attributes bind to different tags, 
it would be greatly appreciated if you shared them with us. Our main problem right now is `Failed: Template parse errors:
Can't bind to 'matRowDefColumns' since it isn't a known property of 'mat-row'.` Normally, importing `matRowDefColumns` would solve the problem (it has with other Mat* properties that has been unknown), however that is not possible in this case.

Also, we have not started on writng tests for our backend. 
We will mainly focus on testing our REST-API, since that is basically the only backend functionality we have. 
If you have any valuable input on how to do this it would be greatly appreciated.


