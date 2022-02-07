import React, { Component } from "react";
import "./QrReader.css";
import ReactQrReader from "./ReactQrReader";
import ReactWeblineindiaQrcodeScanner from "./ReactWeblineindiaQrcodeScanner";
import ReactWebcamQrScanner from "./ReactWebcamQrScanner";
import {
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Table,
  TableCell,
  Label,
  TableRow,
  TableColumn,
  ShellBar,
  StandardListItem,
  Badge,
} from "@ui5/webcomponents-react";
import moment from "moment";

const MOMENT = require("moment");

const menuItems= {1:"1. react-webcam-qr-scanner",2:"2. react-weblineindia-qrcode-scanner",3:"3. react-qr-reader"}

const interval = 2;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: "1",
      headers : {},
      data: "NoResult",
      delay: 200,
      result: "Ready",
      qrList: [
       // { id: 0, qr_code: "Test", date: "12052012", time: "12:35" },
       {qr_code: "Test"},
      ],
      success_add_sql: true,
    };
  }

  updateData = (result) => {
    console.log("Callback");

    console.log(this.state.success_add_sql);
    if (result && this.state.success_add_sql) {
      this.setState({ success_add_sql: false });
      let qrList = this.state.qrList;
      let qrOne = {};
      console.log(result);
      qrOne.TEXT = result;
      const date = MOMENT(new Date()).format("YYYY-MM-DD HH:mm:ss");
      console.log(date);
      const time = new Date().toLocaleTimeString();
      //qrOne.date = date;
      //qrOne.time = time;
      this.setState({ result });
      console.log(qrOne);
      console.log(qrList);
      let qrOld = qrList[qrList.findIndex((x) => x.qr_code === qrOne.qr_code)];
      console.log(qrOld);
      let diff = interval;
      if (qrOld) {
        diff = moment(qrOne.date).diff(moment(qrOld.date), "seconds");
        console.log(diff);
      }
      if (diff >= interval || !qrOld) {
        console.log(JSON.stringify(qrOne));
        let url = "https://sap-odata-dev.gomselmash.by/sap/opu/odata/sap/ZVA_QRREADER_SRV/TextSet?$format=json";

        var myHeaders = new Headers();
        myHeaders.append("x-csrf-token", "fetch");
        myHeaders.append("Authorization", "Basic emhtYWlsaWtfdnY6SHlkcmFyZ3lydW04MA==");
        //myHeaders.append("Cookie", "SAP_SESSIONID_NWD_100=aD96jCbP7T5t3xN8yNYNnyXUtOKH1hHsoycAUFa-bjE%3d; sap-usercontext=sap-client=100");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        let token;
        fetch(url, requestOptions)
          .then(response => {response.headers.forEach((value, key, object) => {
            if (key === 'x-csrf-token'){
              token = value
            }
            
            });
          })
          .then(result => {console.log(token)
          
            var myHeaders1 = new Headers();
            myHeaders1.append("x-csrf-token", token);
            myHeaders1.append("Content-Type", "application/json");  
            myHeaders1.append("Authorization", "Basic emhtYWlsaWtfdnY6SHlkcmFyZ3lydW04MA==");
    
            fetch("https://sap-odata-dev.gomselmash.by/sap/opu/odata/sap/ZVA_QRREADER_SRV/TextSet", {
              method: "POST",
              myHeaders1,  
              body: JSON.stringify({
                "TEXT": "TEXT"
              })
            })
              .then((res) => {
                console.log(res);
                return res.json();
              })
              .then((data) => {
                console.log(data);
                if (data.success) {
                  qrOne.id = data.id;
                  qrList.unshift(qrOne);
                  qrList.sort((a, b) => {
                    let result;
                    if (a.id > b.id) result = -1;
                    if (a.id < b.id) result = 1;
                    return result;
                  });
                  this.setState({ qrList, success_add_sql: true });
                  console.log(this.state.success_add_sql);
                }
              })
              .catch((err) => {
                console.log(err);
              });         
          })
          .catch(error => console.log('error', error))
      } else {
        qrList.unshift(qrOne);
        this.setState({qrList, success_add_sql: true });
      }
    }
  };

  handleError(err) {
    console.error(err);
  }

  onMenuItemClick = (result) => {
    console.log(result.detail.item.innerText);
    this.setState({ menuItem: result.detail.item.dataset.key });
    console.log(this.state.enuItem);
  };

  render() {
    const displayQrReader =
      this.state.menuItem === "1" ? (
        <React.Fragment>
          <ReactWebcamQrScanner updateData={this.updateData} />
        </React.Fragment>
      ) : this.state.menuItem === "2" ? (
        <React.Fragment>
          <ReactWeblineindiaQrcodeScanner updateData={this.updateData} />
        </React.Fragment>
      ) : this.state.menuItem === "3" ? (
        <React.Fragment>
          <ReactQrReader updateData={this.updateData} />
        </React.Fragment>
      ) : (
        ""
      );
    return (
      <div>
        <ShellBar
          className=""
          logo={<img alt="" src="http://localhost:3000/pic_time.jpg" />}
          menuItems={
            <>
              <StandardListItem data-key="1">
              {menuItems[1]}
              </StandardListItem>
              <StandardListItem data-key="2">
              {menuItems[2]}
              </StandardListItem>
              <StandardListItem data-key="3">
              {menuItems[3]}
              </StandardListItem>
            </>
          }
          notificationsCount=""
          onCoPilotClick={function noRefCheck() {}}
          onLogoClick={function noRefCheck() {}}
          onMenuItemClick={this.onMenuItemClick}
          onNotificationsClick={function noRefCheck() {}}
          onProductSwitchClick={function noRefCheck() {}}
          onProfileClick={function noRefCheck() {}}
          primaryTitle="Choose a QR Code Scanner"
          secondaryTitle="QR Scanner"
          showCoPilot
          showNotifications
          tooltip="Choose a QR Code Scanner for React"
        />
        <Badge key="12" colorScheme={3} tooltip={this.state.result}>
          {this.state.result}
        </Badge>
        <FlexBox
          style={{ width: "95%", border: "1px" }}
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          direction={FlexBoxDirection.Row}
        >
          <FlexBox
            style={{ width: "95%", border: "1px" }}
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
            direction={FlexBoxDirection.Column}
          >
            <Badge key="12" colorScheme={6} tooltip={menuItems[this.state.menuItem]}>
              {menuItems[this.state.menuItem]}
            </Badge>
            {displayQrReader}
          </FlexBox>
          <Table
            columns={
              <>
                <TableColumn minWidth={12} popinText="ID">
                  <Label>ID</Label>
                </TableColumn>
                <TableColumn minWidth={12} popinText="QR Code">
                  <Label>QR Code</Label>
                </TableColumn>
                <TableColumn minWidth={12} popinText="Data">
                  <Label>Data</Label>
                </TableColumn>
                <TableColumn demandPopin minWidth={12} popinText="Time">
                  <Label>Time</Label>
                </TableColumn>
              </>
            }
          >
            {this.state.qrList.map((element) => (
              <TableRow>
                <TableCell>
                  <Label>{element.id}</Label>
                </TableCell>
                <TableCell>
                  <Label>{element.qr_code}</Label>
                </TableCell>
                <TableCell>
                  <Label>{element.date}</Label>
                </TableCell>
                <TableCell>
                  <Label>{element.time}</Label>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </FlexBox>
      </div>
    );
  }
}

export default App;
