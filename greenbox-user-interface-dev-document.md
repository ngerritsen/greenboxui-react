#Greenbox user interface developer document

##Introduction
The purpose of the Greenbox user interface is to show the user the current state of his system and let him edit the
parameters that define his growing process. It may also be used to view historical data in a visual manner, give the user
insight in his/her data in different kinds of views (grids/graphs/reports) and view help.

The user interface has to be fast, interactive and up to date. In some cases it has to view the latest data, not older
then a few seconds. To archieve this the user interface has to frequently communicate with the back-end via an API.

##The development stack
To build this user interface we need to use some framework(s) and libraries. Javascript itself does not provide enough
functionality to develop this. The following choices have been made:

###Languages:
* Javascript (ES6 + JSX)
  We are using EcmaScript 6 because it is the latest version of Javascript with a lot of useful features like imports,
  classes and arrow functions. It will speed up development and be ready for the future. Because a lot of browsers do not
  support it yet we use Babel to transpile it to vanilla JS. We use JSX on top of ES6 because it is the recommended way
  to develop in the ReactJS framework. Babel also transpiles this for us.

  Babel ES6 Transpiler: [babeljs.io](https://babeljs.io/)

* SASS + Compass
  We will use SASS for the stylesheets because it is just miles ahead of using just CSS3. It will allow use to develop
  stylesheets many times faster and in a more modular and organized manner. Compass will manage browser compatibility for
  CSS3 for us.

  SASS: [sass-lang.com](http://sass-lang.com/)  
  Compass: [compass-style.org](http://compass-style.org/)

###Frameworks:
* ReactJS
  * What?: This will be the framework that provides the view of our user interface. It is responsible for showing data to the user.
  * Why?: ReactJS is one of the biggest frameworks developed by Facebook. It has already proved to be very useful and
    a lot of big companies are moving towards it. It is very fast and efficient in updating the DOM and works seamlessly with other
    Javascript libraries.
    
  * React: [facebook.github.io/react](https://facebook.github.io/react/)

* Flux (Alt)
  * What?: Flux is a design pattern developed by Facebook alongside ReactJS. It manages the data within the application
    in a one-way data flow. It uses a Action --> Dispatcher --> Store --> View pattern.
  * Why?: Because it is developed alongside ReactJS, the two frameworks are made for each other. The one-directional
    data flow makes it very insightful how data is flowing through the application and less error prone. In the Greenbox
    we will have a lot of data changing all the time and Flux scales very well to more complex applications. Alt is one
    of the better implementations of Flux.
    
  * Flux: [facebook.github.io/flux](http://facebook.github.io/flux/)  
  * Alt: [github.com/goatslacker/alt](https://github.com/goatslacker/alt)

###Additional Libraries:
* Immutable JS
  * What? This libraries allows you to create objects that are Immutable and only editable via setters.
  * Why? Because Javascript itself is not strict enough about accessing data, this will force developers to not hack in
    objects and follow a logical pattern. It also features a lot of nice utility functions for mutating collections.
    
  * Immutable: [facebook.github.io/immutable-js](http://facebook.github.io/immutable-js/)

* React Router
  * What? Allows you to create routing in you application, allowing for a single page application.
  * Why? React itself does not provide routing out of the box, so we need something for this. React Router is the only
    serious option that works well with React out of the box.
    
  * React Router: [github.com/rackt/react-router](https://github.com/rackt/react-router)

* Superagent Bluebird
  * What? Superagent is an HTTP call library for Javascript. Bluebird is a promise library.
  * Why? Because we need to do HTTP calls to the server we need a library for that. Superagent does just that in a very
    clean matter, the bluebird version makes all calls with promises, to make handling them more easy.
    
  * Superagent: [github.com/visionmedia/superagent](https://github.com/visionmedia/superagent)  
  * Bluebird: [github.com/petkaantonov/bluebird](https://github.com/petkaantonov/bluebird)  
  * Superagent Bluebird: [npmjs.com/package/superagent-bluebird-promise](https://www.npmjs.com/package/superagent-bluebird-promise)

* Underscore
  * What? Underscore provides utility functions for objects and arrays
  * Why? Not in all parts of the application we will/should/can currently work with Immutable collections.
  
  * Underscore: [underscorejs.org](http://underscorejs.org/)

* Moment.js
  * What? Library for manipulating date/time
  * Why? With only Javascript working with date/time is a pain, Moment makes this easy.
  
  * Moment.js: [momentjs.com](http://momentjs.com/)

* React Chartjs
  * What? Library for showing charts/graphs with React components
  * Why? ChartJS is one of the better chart libs, and since we are using React, the React version is handy.
  
  * Chart.js: [chartjs.org](http://www.chartjs.org/)  
  * React Chart.js: [github.com/jhudson8/react-chartjs](https://github.com/jhudson8/react-chartjs)

###Tesing:
We unit test components with common sense. If there is logic that is useful to test, then you do it. Do not test library
or framework functionality. Try only to test input -> output of a component, don't test the intermediate steps to allow
for easy refactoring. We always have one test file per javascript file (if that file needs testing). It will have the
same name as that file but with .test appended to the name.

When testing React components, use the ReactTestUtils to render the component in the DOM. Do not
directly access state of the component you are testing, try to test what's rendered in to the DOM. Trigger scenarios by
setting new props or Simulating a DOM event.

When testing Flux (Alt) stores you can use Alt.flush() after each test to get a fresh store.

Testing framework used is Jasmine with Karma as it's runner. Jasmine is a full featured testing framework and on of the
most popular/supported framework. Karma runs Jasmine tests in a real browser for more realistic tests. For react

Jasmine Guide: [jasmine.github.io/2.2/introduction.html](http://jasmine.github.io/2.2/introduction.html)  

###Code Style:
We follow the following styleguides, just to have some guidance on code style and keeping code consistent and recognizable.

EcmaScript 6 Styleguide: [github.com/elierotenberg/coding-styles/blob/master/es6.md](https://github.com/elierotenberg/coding-styles/blob/master/es6.md)  
ReactJS StyleGuide: [reactjsnews.com/react-style-guide-patterns-i-like](https://reactjsnews.com/react-style-guide-patterns-i-like)