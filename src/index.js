// -------------------------------------
// Storybook - npm run storybook - Localhost: 8000
// Webpack Dev Server - npm start - Localhost: 9009
// Jest: test runner - npm test (a to run all tests)
// Cypress: End-to-End Testing
// Scheduler-API: npm start
// Scheduler-API: npm run test:server
// Schedule-API: reset:  app.get("/api/debug/reset"
// -------------------------------------

// -------------------------------------
// Not understanding
//  - https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/968?journey_step=56&workbook=24
//  - https://flex-web.compass.lighthouselabs.ca/workbooks/flex-m07w19/activities/963?journey_step=56&workbook=24
// 
// -------------------------------------


import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "index.scss";

import Application from "components/Application";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(<Application />, document.getElementById("root"));

