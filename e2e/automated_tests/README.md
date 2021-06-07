### Prerequisites:
Before running test use should install NodeJS >6.1.0 at you environment:
https://nodejs.org/en/download/

## 1. Running of auto-tests locally

#### 1.1 Install components
As soon as project is loaded, go to the root and perform command:
```
npm install
```
It will install all components based on package.json file into node_modules folder.
#### 1.2 Run all tests 

*If you are not interested in seeing GUI while tests execution you may run tests in Electron*
https://www.npmjs.com/package/electron.

To run all tests in Electron:
```
npx cypress run
```
*If you prefer to see the application GUI while tests execution you may run tests in Chrome.*

To run all tests in Chrome:
```
npx cypress run -b chrome
```
##### 1.3 Run single test file
Cypress provides the Test Runner that allows you to run testing files separately and see 
the execution process:  https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview

To open it use the following command:
```
npx cypress open
```
In the Test Runner you will see the list of testing files. You may click any of them and execution 
tests within a single it would be started in a separate window. Pay attention that results recording 
and reports creation is not performed if you use the Test Runner. So, this option is mostly for 
development and issues investigation. For running all the scope you should better use other options.