import { ThemeProvider } from "@ui5/webcomponents-react/lib/ThemeProvider";
import FioriMain from "./FioriMain";
import Configurator from "./Configurator";
import "@ui5/webcomponents/dist/Assets";
import "@ui5/webcomponents-fiori/dist/Assets"; // only if you are using the ShellBar, Product Switch or the Upload Collection
import "@ui5/webcomponents-react/dist/Assets";
import "@ui5/webcomponents-icons/dist/Assets";
import React, { Component } from "react";
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <Router history={history}>
        <Switch>
          <Route exact path="/" component={FioriMain} />
          <Route path="/configurator" component={Configurator} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}
export default App;
