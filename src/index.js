// -------------------------------------
// Storybook - npm run storybook - Localhost: 8000
// Webpack Dev Server - npm start - Localhost: 9009
// Jest: test runner - npm test (a to run all tests)
// Cypress: End-to-End Testing


import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

ReactDOM.render(<Application />, document.getElementById("root"));
