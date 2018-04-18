# hackerbay-interview-backend-task
[![Build Status](https://travis-ci.org/Mcdavid95/hackerbay-interview-backend-task.svg?branch=development)](https://travis-ci.org/Mcdavid95/hackerbay-interview-backend-task)

### Endpoints

* ```POST``` ```/api/v1/user/login```
  - takes in ```email``` and password and returns a JSON web token
* ```POST``` ```/api/v1/user/book```
  - adds books using JSON patch. Takes in ```title```, ```description``` ```author```
* ```POST``` ```/api/v1/user/image```
  - creates new thumbnail from an image link. Takes in ```urlImage```{link to image} and ```fileName```
  
  ### Dependencies
  
  * NodeJs
  * GraphicsMagick
  * Express
  
  ### Start
  
  * ```npm start```
  
  ### Test
  
  * ```npm test```
