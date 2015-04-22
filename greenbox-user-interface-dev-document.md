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

* SASS + Compass
  We will use SASS for the stylesheets because it is just miles ahead of using just CSS3. It will allow use to develop
  stylesheets many times faster and in a more modular and organized manner. Compass will manage browser compatibility for
  CSS3 for us.

###Frameworks:
* ReactJS
  * What?: This will be the framework that provides the view of our user interface. It is responsible for showing data to the user.
  * Why?: ReactJS is one of the biggest frameworks developed by Facebook. It has already proved to be very useful and
    a lot of big companies are moving towards it. It is very fast and efficient in updating the DOM and works seamlessly with other
    Javascript libraries.

* Flux (Alt)
  * What?: Flux is a design pattern developed by Facebook alongside ReactJS. It manages the data within the application
    in a one-way data flow. It uses a Action --> Dispatcher --> Store --> View pattern.
  * Why?: Because it is developed alongside ReactJS, the two frameworks are made for each other. The one-directional
    data flow makes it very insightful how data is flowing through the application and less error prone. In the Greenbox
    we will have a lot of data changing all the time and Flux scales very well to more complex applications. Alt is one
    of the better implementations of Flux.

###Additional Libraries:
* Immutable JS
  * What? This libraries allows you to create objects that are Immutable and only editable via setters.
  * Why? Because Javascript itself is not strict enough about accessing data, this will force developers to not hack in
    objects and follow a logical pattern.

* ReactRouter
  React itself does not provide routing out of the box, so we need something for this.

* Superagent Bluebird
  Because we need to do HTTP calls to the server we need a library for that. Superagent does just that in a very clean
  matter, the bluebird version makes all calls with promises, to make handling them more easy.
