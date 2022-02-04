import React, { Component } from "react";
import "./QrReader.css";
import QrReader from "react-webcam-qr-scanner";

class ReactWebcamQrScanner extends Component {
  constructor(props) {
    super(props);
    this.state = { result: "No result", delay: 200 };
  }

  onScan = (result) => {
    if (result.data) {
      this.setState({ result:result.data });
      console.log(this.state.result);
      this.props.updateData(this.state.result);
    }
  };

  onError = (result) => {
    console.log(result);
  };


  handleScannerLoad= (mode) => {
    console.log(mode);
  };


  render() {    return (
      <QrReader
        className="some-classname"
        onDecode={this.onScan}
        onScannerLoad={this.handleScannerLoad}
        constraints={{ 
            audio: false, 
            video: { 
              facingMode: "environment" 
            } 
          }}
          captureSize={{ width: 1280, height: 720 }}
      />
    );
  }
}
export default ReactWebcamQrScanner;