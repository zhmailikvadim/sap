import { ThemeProvider } from "@ui5/webcomponents-react/lib/ThemeProvider";
import FioriMain from "./FioriMain";
import Configurator from "./Configurator";
import "@ui5/webcomponents/dist/Assets";
import "@ui5/webcomponents-fiori/dist/Assets"; // only if you are using the ShellBar, Product Switch or the Upload Collection
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-react/dist/Assets";
import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <BrowserRouter history={history}>
          <Route exact path="/" component={FioriMain} />
          <Route exact path="/configurator" component={Configurator} />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
export default App;
