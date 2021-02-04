import React, { Component } from "react";
//import Loader from "./Loader";
//import OData from 'react-odata';
//import buildQuery from 'odata-query';
import { Loader } from "@ui5/webcomponents-react/lib/Loader";
import { FlexBox } from "@ui5/webcomponents-react/lib/FlexBox";
import { RadioButton } from "@ui5/webcomponents-react/lib/RadioButton";
//import { Label } from "@ui5/webcomponents-react/lib/Label";
import { FlexBoxJustifyContent } from "@ui5/webcomponents-react/lib/FlexBoxJustifyContent";
import { FlexBoxAlignItems } from "@ui5/webcomponents-react/lib/FlexBoxAlignItems";
import { FlexBoxDirection } from "@ui5/webcomponents-react/lib/FlexBoxDirection";
import { ValueState } from "@ui5/webcomponents-react/lib/ValueState";
import { CheckBox } from "@ui5/webcomponents-react/lib/CheckBox";
import { Badge } from "@ui5/webcomponents-react/lib/Badge";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import { List } from "@ui5/webcomponents-react/lib/List";
import { StandardListItem } from "@ui5/webcomponents-react/lib/StandardListItem";
import { Card } from "@ui5/webcomponents-react/lib/Card";

//import { Icon } from '@ui5/webcomponents-react/lib/Icon';
//import { Carousel } from "@ui5/webcomponents-react/lib/Carousel";
//"import {useMDXComponents} from './context';
//import { MDXCreateElement } from "@ui5/webcomponents-react/lib/"
//import {MDXCreateElement} from '@mdx-js/react'
var myHeaders = new Headers();
var basket = [];
var items = [];
var sum = 0;
var sumString;
var requestOptions = {
  method: "GET",
  credentials: "include",
  headers: myHeaders,
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
    };
  }

  async componentDidMount() {
    // const query = buildQuery({...})
    let sql =
      "https://sap-odata.gomselmash.by/sap/opu/odata/ZHM/C_CONF_MAT_CDS/xZHMxc_conf_mat?$format=json";

    await fetch(sql, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
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
    console.log(item);
    let conf_mat_uuid = item.conf_mat_uuid;
    let sql =
      "https://sap-odata.gomselmash.by/sap/opu/odata/ZHM/C_CONF_MAT_CDS/xZHMxc_conf_mat(guid'" +
      conf_mat_uuid +
      "')?$format=json&$expand=to_groupdata2/to_itemtdata";
    console.log(sql);
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
        this.state.data_group.map((item) =>
          item.to_itemtdata.results.map((material, i) => items.push(material))
        );
        console.log(items);
      })
      .catch((error) => console.log("error", error));
  };

  onItemRadioSelect = (e) => {
    basket = this.state.basket;
    if (e.target.selected) {
      basket.push(e.target.value);
      console.log(basket);
      items.forEach((item) => {
        if (
          e.target.name === item.mat_group_uuid &&
          e.target.value !== item.matnr_ext
        ) {
          let idx = basket.indexOf(item.matnr_ext);
          console.log(idx);
          if (idx > -1) {
            console.log("Delete", item.matnr_ext);
            console.log(basket.splice(basket.indexOf(item.matnr_ext), 1));
          }
        }
      });
    }
    this.setState({
      basket: basket,
    });
  };
  onItemCheckBoxChange = (e) => {
    console.log(e.target.checked, e.target.name);
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
    console.log(this.state.basket);
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
      confMat = <Loader />;
    } else {
      confMat = (
        <FlexBox
          style={{
            width: "100%",
          }}
          justifyContent={FlexBoxJustifyContent.SpaceBetween}
          direction={FlexBoxDirection.Column}
        >
          <FlexBox alignItems={FlexBoxAlignItems.Center}>
            {this.state.data_conf_mat.map((item) => (
              <RadioButton
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
              <div>
                <FlexBox
                  alignItems={FlexBoxAlignItems.Center}
                  direction={FlexBoxDirection.Column}
                  justifyContent={FlexBoxJustifyContent.SpaceBetween}
                >
                  {" "}
                  <Badge
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
                      alignItems={FlexBoxAlignItems.Start}
                      direction={FlexBoxDirection.Column}
                      justifyContent={FlexBoxJustifyContent.Start}
                    >
                      <RadioButton
                        name={item.mat_group_uuid}
                        text={
                          material.maktx +
                          ": " +
                          material.matnr_ext +
                          " Цена: " +
                          material.price
                        }
                        valueState={ValueState.Warning}
                        value={material.matnr_ext}
                        //onClick={this.onItemSelect.bind(null, material)}
                        onSelect={this.onItemRadioSelect}
                      />
                    </FlexBox>
                  ) : (
                    <FlexBox
                      alignItems={FlexBoxAlignItems.Start}
                      direction={FlexBoxDirection.Column}
                      justifyContent={FlexBoxJustifyContent.Start}
                    >
                      <CheckBox
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
              //avatar={<Icon name="person-placeholder" />}
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
                  info={
                    items[
                      items
                        .map(function (e) {
                          return e.matnr_ext;
                        })
                        .indexOf(item)
                    ].price
                  }
                  description={
                    items[
                      items
                        .map(function (e) {
                          return e.matnr_ext;
                        })
                        .indexOf(item)
                    ].maktx
                  }
                >
                  {item}
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
