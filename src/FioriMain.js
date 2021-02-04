import {
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Link,
  LinkDesign,
  ThemeProvider,
} from "@ui5/webcomponents-react";
import React, { Component } from "react";
import "./App.css";
import DebtChart from "./DebtChart";
import FShellBar from "./FShellBar";
import Configurator from "./Configurator";
import CredChart from "./CredChart";

class FioriMain extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: null,
    };
  }
  onDebtChart = () => {
    this.setState({ activeComponent: "debtChart" });
  };
  onCredChart = () => {
    this.setState({ activeComponent: "credChart" });
  };
  onConfigurator = () => {
    this.setState({ activeComponent: "Configurator" });
  };
  fioriHome = () => {
    window.location.assign(
      "https://sap-odata.gomselmash.by/sap/bc/ui2/flp?sap-client=100"
    );
  };
  cloud = () => {
    window.open("https://cloud.gomselmash.by/");
  };
  belsap = () => {
    window.open("https://belsap.com/category/sap/pr/");
  };
  render() {
    const displayComponent =
      this.state.activeComponent === "debtChart" ? (
        <React.Fragment>
          <DebtChart />
        </React.Fragment>
      ) : this.state.activeComponent === "credChart" ? (
        <React.Fragment>
          <CredChart />
        </React.Fragment>
      ) : this.state.activeComponent === "Configurator" ? (
        <React.Fragment>
          <Configurator />
        </React.Fragment>
      ) : (
        ""
      );
    return (
      <ThemeProvider>
        <FShellBar
          onDebtChart={this.onDebtChart}
          onConfigurator={this.onConfigurator}
          onCredChart={this.onCredChart}
          fioriHome={this.fioriHome}
          cloud={this.cloud}
          belsap={this.belsap}
        />
        {displayComponent}
        <FlexBox
          style={{ width: "100%", height: "90vh" }}
          direction={FlexBoxDirection.Column}
          justifyContent={FlexBoxJustifyContent.End}
          alignItems={FlexBoxAlignItems.End}
        >
          <Link
            href="https://sap.github.io/ui5-webcomponents-react/"
            target="_blank"
            design={LinkDesign.Emphasized}
          >
            UI5 Web Component for React
          </Link>
          <Link
            href="https://sap.github.io/fundamental-react/?path=/docs/introduction-overview--page"
            target="_blank"
            design={LinkDesign.Emphasized}
          >
            SAP Fundamental Component for React
          </Link>
          <Link
            href="https://github.com/zhmailikvadim/sap-fiori"
            target="_blank"
            design={LinkDesign.Emphasized}
          >
            GitHub App SAP GMSM
          </Link>
        </FlexBox>
      </ThemeProvider>
    );
  }
}
export default FioriMain;
