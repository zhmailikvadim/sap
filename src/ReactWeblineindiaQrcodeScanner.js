import React, { Component } from "react";
import "./QrReader.css";
import QrReader from "react-weblineindia-qrcode-scanner";

class ReactWeblineindiaQrcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = { result: "No result", delay: 200 };
  }

  onScan = (result) => {
    if (result) {
      this.setState({ result });
      console.log(this.state.result);
      this.props.updateData(result);
    }
  };

  onError = (result) => {
    console.log(result);
  };

  render() {
    const previewStyle = {
      height: "100%",
      width: "100%",
    };
    return (
      <QrReader
        delay={this.state.delay}
        style={previewStyle}
        onError={this.onError}
        onScan={this.onScan}
      />
    );
  }
}
export default ReactWeblineindiaQrcodeScanner;