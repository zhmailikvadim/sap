import React, { Component } from "react";
import { Loader } from "@ui5/webcomponents-react/lib/Loader";
import { FlexBox } from "@ui5/webcomponents-react/lib/FlexBox";
import { RadioButton } from "@ui5/webcomponents-react/lib/RadioButton";
import { FlexBoxJustifyContent } from "@ui5/webcomponents-react/lib/FlexBoxJustifyContent";
import { FlexBoxAlignItems } from "@ui5/webcomponents-react/lib/FlexBoxAlignItems";
import { FlexBoxDirection } from "@ui5/webcomponents-react/lib/FlexBoxDirection";
import { ValueState } from "@ui5/webcomponents-react/lib/ValueState";
import { CheckBox } from "@ui5/webcomponents-react/lib/CheckBox";
import { Badge } from "@ui5/webcomponents-react/lib/Badge";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { StandardListItem } from "@ui5/webcomponents-react/lib/StandardListItem";
import { Card } from "@ui5/webcomponents-react/lib/Card";
import { Icon } from "@ui5/webcomponents-react/lib/Icon";

var basket = [];
var items = [];
var radioButtons = {};
var sum = 0;
var sumString;
var requestOptions = {
  method: "GET",
  credentials: "include",
  headers: {
    //'Access-Control-Allow-Origin': '*',
    //'Authorization': 'Basic ' + 'partner:partner'.toString('base64'),
    //'Access-Control-Allow-Methods' : 'GET,POST,PUT,DELETE,OPTIONS',
    //'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin',
    //'Accept': 'application/json',
    //'Content-Type': 'application/json'
  },
  redirect: "follow",
};

class Configurator extends Component {
  constructor() {
    super();
    this.state = {
      cMaterial: "",
      sum: 0,
      basket: [],
      isLoadingMat: true,
      isLoadingGroup: false,
      data_conf_mat: [],
      data_group: [],
      radioButtons: {},
    };
  }

  async componentDidMount() {
    let sql =
      "https://sap-odata.gomselmash.by/sap/opu/odata/ZHM/C_CONF_MAT_CDS/xZHMxc_conf_mat?$format=json";

    await fetch(sql, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          data_conf_mat: result.d.results,
          isLoadingMat: false,
        });
      })
      .catch((error) => console.log("error", error));
  }

  onCmatSelect = async (item) => {
    basket = [];
    this.setState({
      basket: basket,
      cMaterial: item.matnr_ext,
    });
    let conf_mat_uuid = item.conf_mat_uuid;
    let sql =
      "https://sap-odata.gomselmash.by/sap/opu/odata/ZHM/C_CONF_MAT_CDS/xZHMxc_conf_mat(guid'" +
      conf_mat_uuid +
      "')?$format=json&$expand=to_groupdata2/to_itemtdata";
    this.setState({
      data_group: [],
      isLoadingGroup: true,
    });
    await fetch(sql, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          data_group: result.d.to_groupdata2.results,
          isLoadingGroup: false,
        });
        items = [];
        radioButtons = {};
        this.state.data_group.forEach((item) =>
          item.to_itemtdata.results.forEach((material, i) => {
            items.push(material);
            radioButtons[material.matnr_ext] = false;
          })
        );
        this.setState({
          radioButtons: radioButtons,
        });
      })
      .catch((error) => console.log("error", error));
  };
  onItemRadioSelect = (e) => {
    basket = this.state.basket;
    if (e.target.selected) {
      basket.push(e.target.value);
      items.forEach((item) => {
        if (
          e.target.name === item.mat_group_uuid &&
          e.target.value !== item.matnr_ext
        ) {
          let idx = basket.indexOf(item.matnr_ext);
          if (idx > -1) {
            basket.splice(basket.indexOf(item.matnr_ext), 1);
          }
        }
      });
    }
    this.setState({
      basket: basket,
    });
  };
  onItemRadioClick = (e) => {
    radioButtons = this.state.radioButtons;
    radioButtons[e.target.value] = e.target.selected;
    this.setState({
      radioButtons: radioButtons,
    });
  };
  onItemCheckBoxChange = (e) => {
    basket = this.state.basket;

    if (e.target.checked) {
      basket.push(e.target.name);
    } else {
      basket.splice(basket.indexOf(e.target.name), 1);
    }
    this.setState({
      basket: basket,
    });
  };

  render() {
    sum = 0;
    this.state.basket.forEach(
      (item) =>
        (sum =
          sum +
          parseFloat(
            items[
              items
                .map(function (e) {
                  return e.matnr_ext;
                })
                .indexOf(item)
            ].price
          ))
    );
    sumString = "Стоимость комплекта: " + sum + " USD";
    let confMat;
    if (this.state.isLoadingMat) {
      confMat = (
        <div>
          <Badge
            className=""
            colorScheme={2}
            icon={<Icon name="employee" />}
            slot=""
            style={{}}
            tooltip="Гостевой вход Логин:partner Пароль:partner маленькими буквами"
          >
            Гостевой вход: Логин:partner Пароль:partner маленькими буквами
          </Badge>
          <Loader />
        </div>
      );
    } else {
      confMat = (
        <FlexBox
          style={{
            width: "100%",
          }}
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          direction={FlexBoxDirection.Column}
        >
          <Badge
            key="12"
            className=""
            colorScheme={2}
            //icon={<Icon name="employee" />}
            slot=""
            style={{}}
            tooltip="Наши модели"
          >
            Наши модели сельскохозяственной техники
          </Badge>
          <FlexBox alignItems={FlexBoxAlignItems.Center}>
            {this.state.data_conf_mat.map((item) => (
              <RadioButton
                key={item.matnr_ext}
                wrap={true}
                name="ConfMat"
                text={item.matnr_ext}
                valueState={ValueState.Error}
                onClick={this.onCmatSelect.bind(null, item)}
              />
            ))}
          </FlexBox>
          <Badge
            className=""
            colorScheme={2}
            //icon={<Icon name="employee" />}
            slot=""
            style={{}}
            tooltip={this.state.cMaterial}
          >
            {this.state.cMaterial}
          </Badge>
          <p></p>
        </FlexBox>
      );
    }

    let confGroup;
    if (this.state.isLoadingGroup) {
      confGroup = <Loader />;
    } else {
      confGroup = (
        <FlexBox
          style={{ width: "95%", border: "1px" }}
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          direction={FlexBoxDirection.Row}
        >
          <FlexBox
            alignItems={FlexBoxAlignItems.Start}
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
          >
            {this.state.data_group.map((item) => (
              <div key={item.mat_group_uuid}>
                <FlexBox
                  key={item.group_name}
                  alignItems={FlexBoxAlignItems.Center}
                  direction={FlexBoxDirection.Column}
                  justifyContent={FlexBoxJustifyContent.SpaceBetween}
                >
                  {" "}
                  <Badge
                    key={item.group_name}
                    className=""
                    colorScheme={1}
                    //icon={<Icon name="employee" />}
                    slot=""
                    style={{}}
                    tooltip={item.group_description}
                  >
                    {item.group_name}
                  </Badge>
                </FlexBox>
                {item.to_itemtdata.results.map((material, i) =>
                  item.type_of_group === "ONE" ? (
                    <FlexBox
                      key={material.matnr_ext}
                      alignItems={FlexBoxAlignItems.Start}
                      direction={FlexBoxDirection.Column}
                      justifyContent={FlexBoxJustifyContent.Start}
                    >
                      <RadioButton
                        key={material.matnr_ext}
                        name={item.mat_group_uuid}
                        checked={this.state.radioButtons[material]}
                        text={
                          material.maktx +
                          ": " +
                          material.matnr_ext +
                          " Цена: " +
                          material.price
                        }
                        valueState={ValueState.Warning}
                        value={material.matnr_ext}
                        onClick={this.onItemRadioClick}
                        onSelect={this.onItemRadioSelect}
                      />
                    </FlexBox>
                  ) : (
                    <FlexBox
                      key={material.matnr_ext}
                      alignItems={FlexBoxAlignItems.Start}
                      direction={FlexBoxDirection.Column}
                      justifyContent={FlexBoxJustifyContent.Start}
                    >
                      <CheckBox
                        key={material.matnr_ext}
                        name={material.matnr_ext}
                        text={
                          material.maktx +
                          ": " +
                          material.matnr_ext +
                          " Цена: " +
                          material.price
                        }
                        value-state={ValueState.Warning}
                        onChange={this.onItemCheckBoxChange}
                      />
                    </FlexBox>
                  )
                )}
              </div>
            ))}
          </FlexBox>
          <FlexBox
            alignItems={FlexBoxAlignItems.Start}
            direction={FlexBoxDirection.Column}
            justifyContent={FlexBoxJustifyContent.SpaceBetween}
          >
            <Card
              avatar={<Icon name="cart-5" />}
              className=""
              heading={sumString}
              onHeaderClick={function noRefCheck() {}}
              slot=""
              ///status="3 of 5"
              style={
                {
                  // width: "300px",
                }
              }
              subheading="Состав:"
              tooltip=""
            >
              {this.state.basket.map((item) => (
                <StandardListItem
                  key={
                    items[
                      items
                        .map(function (e) {
                          return e.matnr_ext;
                        })
                        .indexOf(item)
                    ].maktx
                  }
                  info={
                    items[
                      items
                        .map(function (e) {
                          return e.matnr_ext;
                        })
                        .indexOf(item)
                    ].price
                  }
                  description={item}
                >
                  {
                    items[
                      items
                        .map(function (e) {
                          return e.matnr_ext;
                        })
                        .indexOf(item)
                    ].maktx
                  }
                </StandardListItem>
              ))}
            </Card>
          </FlexBox>
        </FlexBox>
      );
    }
    return (
      <div>
        {confMat}
        {confGroup}
      </div>
    );
  }
}
export default Configurator;
