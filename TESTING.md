### TESTING

#### Frontend
To test frontned we have used Karma together with Jasmine. We have mostly focused on testing that the components 
render correctly, and testing our DataService which interacts with our REST api backend. The test files can be found 
with the component it is testing. To test the service we have used Mocks. 

To run the fronted tests:
- Clone the project (can be skipped if you already have the repo): `git clone https://github
.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-50.git`
- run `npm install`
- run `ng test -sm=false`

#### Backend
To test our backend we have used Jasmine. Since our backend functionality is mostly just our REST api, it is the REST
 API we have decided to test. The tests see if we are able to both fetch data from and write to the database. Our 
 backend tests can be found in `website/spec/server-tests`

To run the backend tests:
- Clone the project (can be skipped if you already have the repo): `git clone https://github
.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-50.git`
- run `npm install`
- run `npm install -g jasmine`
- run `jasmine test`


#### e2e
To test e2e we have used Protractor. The focus has been to see that the site works as expected. 

To run the e2e tests:
- Clone the project (can be skipped if you already have the repo): `git clone https://github
.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-50.git`
- run (can be skipped if already done) `npm install`
- run `ng e2e`
