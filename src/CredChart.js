import React, { Component } from "react";
import { LineChart } from "@ui5/webcomponents-react-charts/lib/LineChart";
import { Label } from "@ui5/webcomponents-react/lib/Label";
import "chartjs-plugin-zoom";
import { ActionBar } from "fundamental-react/lib/ActionBar";
import { Button } from "fundamental-react/lib/Button";

class CredChart extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data_first: [],
      data_second: [],
      data_third: [],
      data_overall: [],
      chartType: 1,
    };
  }

  async componentDidMount() {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      credentials: "include",
      headers: myHeaders,
      redirect: "follow",
    };
    let sql =
      "https://sap-odata.gomselmash.by/sap/opu/odata/ZHM/ACCOUNT_PAYABE_SRV/CREDIT_HISTORYSet?$format=json&$filter=REPORT_NUMBER eq ";
    let sql_first = `${sql}1`;
    let sql_second = `${sql}2`;
    let sql_third = `${sql}3`;

    await fetch(sql_first, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          data_first: result.d.results,
          isLoading: false,
        });
      })
      .catch((error) => console.log("error", error));

    await fetch(sql_second, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          data_second: result.d.results,
          isLoading: false,
        });
      })
      .catch((error) => console.log("error", error));

    await fetch(sql_third, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          data_third: result.d.results,
          isLoading: false,
        });
      })
      .catch((error) => console.log("error", error));
    await fetch(
      "https://sap-odata.gomselmash.by/sap/opu/odata/ZHM/ACCOUNT_PAYABE_SRV/CREDIT_HISTORYSet?$format=json",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          data_overall: result.d.results,
          isLoading: false,
        });
      })
      .catch((error) => console.log("error", error));
  }
  onFirst = () => {
    this.setState({ chartType: 1 });
  };
  onSecond = () => {
    this.setState({ chartType: 2 });
  };
  onThird = () => {
    this.setState({ chartType: 3 });
  };

  render() {
    let uniqueLabels = [];
    let data;
    let emphasizedFirst;
    let emphasizedSecond;
    let emphasizedThird;

    if (this.state.chartType === 1) {
      data = this.state.data_first;
      emphasizedFirst = "emphasized";
    }
    if (this.state.chartType === 2) {
      data = this.state.data_second;
      emphasizedSecond = "emphasized";
    }
    if (this.state.chartType === 3) {
      data = this.state.data_third;
      emphasizedThird = "emphasized";
    }
    data.forEach((element, i) => {
      if (uniqueLabels.indexOf(element.Data) < 0) {
        uniqueLabels.push(element.Data);
      }
    });

    uniqueLabels.sort((a, b) => {
        let result;
        if (a > b)
          result =  1;
        if (a < b)
          result = -1;
        return result;
      });
    let dataset_array_all = [];
    let measures_array = [];
    let measures_array_overall = [];

    //ALL
    var sortData = data.sort(function (a, b) {
      return a.AmountUsd - b.AmountUsd;
    });
    uniqueLabels.forEach((element, i1) => {
      let dataset_one = {};
      sortData.forEach((element1) => {
        if (element === element1.Data && element1.Hkont !== "OVERALL") {
          dataset_one["data"] = element1.Data;
          dataset_one[element1.Txt20] = element1.AmountUsd;
          if (i1 === uniqueLabels.length - 1) {
            let measure_one = {};
            measure_one["accessor"] = element1.Txt20;
            measure_one["label"] = element1.Txt50;
            measure_one['hideDataLabel'] = true;
            measures_array.push(measure_one);
          }
        }
      });
      dataset_array_all.push(dataset_one);
    });

    //OVER
    let dataset_array_over = [];
    let measures_array_over = [];
    var sortDataOver = data.sort(function (a, b) {
      return a.ExpamountUsd - b.ExpamountUsd;
    });
    var elementExist;
    uniqueLabels.forEach((element, i1) => {
      let dataset_one = {};
      elementExist = false;
      sortDataOver.forEach((element1) => {
        if (
          element === element1.Data &&
          element1.Hkont !== "OVERALL" ) {
          elementExist = true;
          dataset_one["data"] = element1.Data;
          dataset_one[element1.Txt20] = element1.ExpamountUsd;
          if (i1 === uniqueLabels.length - 1) {
            let measure_one = {};
            measure_one["accessor"] = element1.Txt20;
            measure_one["label"] = element1.Txt50;
            measure_one['hideDataLabel'] = true;
            measures_array_over.push(measure_one);
          }
        }
      });
      if (elementExist) {
        dataset_array_over.push(dataset_one);
      }
    });

    //OVERALL
    let dataset_array_overall = [];    
    uniqueLabels.forEach((element, i1) => {
      this.state.data_overall.forEach((element1) => {
        if (element === element1.Data && element1.Hkont === "OVERALL") {
          let dataset_one = {};
          dataset_one["data"] = element1.Data;
          dataset_one[element1.Txt20] = element1.AmountUsd;
          dataset_one["Просроченная"] = element1.ExpamountUsd;
          dataset_array_overall.push(dataset_one);
          if (i1 === uniqueLabels.length - 1) {
            let measure_one = {};
            measure_one["accessor"] = element1.Txt20;
            measure_one["label"] = element1.Txt50;
            measure_one['hideDataLabel'] = true;
            measures_array_overall.push(measure_one);

            let measure_one_over = {};
            measure_one_over["accessor"] = "Просроченная";
            measure_one_over["label"] = "Просроченная";
            measure_one_over['hideDataLabel'] = true;
            measures_array_overall.push(measure_one_over);
          }
        }
      });
    });

    let chartConfig = {
      gridHorizontal: true,
      gridStroke: "var(--sapList_BorderColor)",
      gridVertical: true,
      legendHorizontalAlign: "left",
      legendPosition: "bottom",
      resizeDebounce: 1000,
      xAxisVisible: true,
      yAxisVisible: true,
      zoomingTool: true,
    };
    let dimensions = [{ accessor: "data" }];
    let outChartAll = (
      <React.Fragment>
        <ActionBar
          actions={
            <>
              <Button option={emphasizedFirst} onClick={() => this.onFirst()}>
                Перед поставщиками
              </Button>
              <Button option={emphasizedSecond} onClick={() => this.onSecond()}>
                Займы, кредиты, проценты
              </Button>
              <Button option={emphasizedThird} onClick={() => this.onThird()}>
                Налоги, прочая
              </Button>
            </>
          }
          description={"Кредиторская задолженность"}
          title={"Группы счетов"}
        />
        <Label style={{ color: "blue" }}>Вся кредиторская задолженность</Label>
        <LineChart
          chartConfig={chartConfig}
          dataset={dataset_array_all}
          dimensions={dimensions}
          measures={measures_array}
          onDataPointClick={function noRefCheck() {}}
          onLegendClick={function noRefCheck() {}}
          style={{ height: "90vh", width: "95%" }}
        />
        <Label style={{ color: "blue" }}>
          Просроченная кредиторская задолженность
        </Label>
        <LineChart
          chartConfig={chartConfig}
          dataset={dataset_array_over}
          dimensions={dimensions}
          measures={measures_array_over}
          onDataPointClick={function noRefCheck() {}}
          onLegendClick={function noRefCheck() {}}
          style={{ height: "95vh", width: "95%" }}
        />
        <Label style={{ color: "blue" }}>
          Вся общая и просроченная задолженность
        </Label>
        <LineChart
          chartConfig={chartConfig}
          dataset={dataset_array_overall}
          dimensions={dimensions}
          measures={measures_array_overall}
          onDataPointClick={function noRefCheck() {}}
          onLegendClick={function noRefCheck() {}}
          style={{ height: "90vh", width: "95%" }}
        />
      </React.Fragment>
    );
    return <div>{outChartAll}</div>;
  }
}

export default CredChart;
