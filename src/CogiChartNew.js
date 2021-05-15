import React, { Component } from "react";
import { Line } from "react-chartjs-3";
import { Loader } from "@ui5/webcomponents-react/lib/Loader";
import "chartjs-plugin-zoom";
import { ActionBar } from "fundamental-react/lib/ActionBar";
import { Button } from "fundamental-react/lib/Button";

const countMatnr = "countMatnr";
const sumVerprMatnr = "sumVerprMatnr";
const sumVerprAll = "sumVerprAll";

const countMatnrTitle =
  "Количество просроченных (3 дня и более) несписанных уникальных материалов";
const sumVerprMatnrTitle =
  "Стоимость просроченных (3 дня и более) несписанных материалов, BYN";
const sumVerprAllTitle =
  "Всего просроченных (3 дня и более) несписанных материалов, BYN";

class CogiChartNew extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isLoading_fcat: true,
      data: [],
      dataSAP: [],
      fcat: [],
      fields: [],
      chartType: sumVerprMatnr,
      title: sumVerprMatnrTitle,
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

    await fetch(
      "https://sap-odata.gomselmash.by/sap/opu/odata/ZHM/I_SAVE_COGI_CDS/xZHMxI_SAVE_COGI?$format=json",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          data: result.d.results,
          isLoading: false,
        });
      })
      .catch((error) => console.log("error", error));
  }

  onCountMatnr = () => {
    this.setState({ chartType: countMatnr, title: countMatnrTitle });
  };
  onSumVerprMatnr = () => {
    this.setState({ chartType: sumVerprMatnr, title: sumVerprMatnrTitle });
  };
  onSumVerprAll = () => {
    this.setState({ chartType: sumVerprAll, title: sumVerprAllTitle });
  };

  render() {
    let emphasizedCountMatnr = "";
    let emphasizedSumVerpr = "";
    let emphasizedSumAll = "";
    let yAxisLabel = "";
    if (this.state.chartType === countMatnr) {
      emphasizedCountMatnr = "emphasized";
      yAxisLabel = "Штуки, ШТ";
    }
    if (this.state.chartType === sumVerprMatnr) {
      emphasizedSumVerpr = "emphasized";
      yAxisLabel = "Белорусский рубль, BYN";
    }
    if (this.state.chartType === sumVerprAll) {
      emphasizedSumAll = "emphasized";
      yAxisLabel = "Белорусский рубль, BYN";
    }

    let uniqueLabels = [];
    let uniqueCeh = [];

    this.state.data.sort((a, b) => {
      let result;
      if (a.data1 > b.data1) result = 1;
      if (a.data1 < b.data1) result = -1;
      return result;
    });

    this.state.data.forEach((element, i) => {
      if (uniqueLabels.indexOf(element.data1) < 0) {
        uniqueLabels.push(element.data1);
      }
    });

    this.state.data.sort((a, b) => {
      let result;
      if (a.data1 < b.data1) {
        return 1;
      }
      if (a.data1 > b.data1) {
        return -1;
      }

      if (a.data1 === b.data1) {
        if (a.count_matnr < b.count_matnr) {
          return 1;
        }
        if (a.count_matnr > b.count_matnr) {
          return -1;
        }
        return 0;
      }
      return result;
    });

    if (this.state.chartType === sumVerprAll) {
      uniqueCeh.push("Общая");
    } else {
      this.state.data.forEach((element, i) => {
        if (uniqueCeh.indexOf(element.nazw) < 0) {
          uniqueCeh.push(element.nazw);
        }
      });
    }

    let chartData = {
      labels: [],
      datasets: [],
    };
    chartData.labels = uniqueLabels;

    let colors = [
      "#000000",
      "#7ad319",
      "#d20e45",
      "#ff6900",
      "#f47373",
      "#b80000",
      "#2ccce4",
      "#9900ef",
      "#5300eb",
      "#194d33",
      "#5d888e",
      "#cdbc2a",
      "#a11a17",
      "#4caf50",
      "#7b64ff",
      "#09c618",
      "#f80d2e",
      "#4a84e7",
      "#301c56",
      "#ffeb3b",
      "#93ff00",
      "#57051f",
      "#0705ff",
      "#DE3163",
      "#FFBF00",
      "#40E0D0",
      "#8B0000",
      "#006400",
      "#000080",
    ];

    uniqueCeh.forEach((nazw, i) => {
      let dataset = {
        label: nazw,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: colors[i],
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [], // ДАННЫЕ - здесь ваши данные- 652230, 1580, 28748.. - так же в массиве и в том же порядке.
      };

      if (this.state.chartType === sumVerprAll) {
        chartData.labels.forEach((item_data) => {
          let sumVerpr = 0;
          this.state.data.forEach((item, i) => {
            if (item.data1 === item_data) {
              sumVerpr = sumVerpr + Number(item.verpr_count);
            }
          });

          dataset.data.push(sumVerpr);
        });
      } else {
        chartData.labels.forEach((item_data) => {
          this.state.data.forEach((item, i) => {
            if (nazw === item.nazw && item.data1 === item_data) {
              if (this.state.chartType === countMatnr) {
                dataset.data.push(item.count_matnr);
              }
              if (this.state.chartType === sumVerprMatnr) {
                dataset.data.push(item.verpr_count);
              }
            }
          });
        });
      }
      chartData.datasets.push(dataset);
    });

    const defaultTableBar = (
      <React.Fragment>
        <ActionBar
          actions={
            <>
              <Button
                option={emphasizedCountMatnr}
                onClick={() => this.onCountMatnr()}
              >
                Просрочено списание ТМЦ (номенклатура)
              </Button>
              <Button
                option={emphasizedSumVerpr}
                onClick={() => this.onSumVerprMatnr()}
              >
                Просрочено списание ТМЦ (стоимость)
              </Button>
              <Button
                option={emphasizedSumAll}
                onClick={() => this.onSumVerprAll()}
              >
                Общая стоимость несвоевременно списанных ТМЦ
              </Button>
            </>
          }
          description={"Несвоевременное списание ТМЦ, более 3 дней"}
          title={"COGI"}
        />
      </React.Fragment>
    );

    const options = {
      tooltips: {
        mode: "index",
      },

      title: {
        display: true,
        fontColor: "#000000",
        fontSize: 16,
        text: this.state.title,
      },
      zoom: {
        enabled: true,
        mode: "y",
      },
      pan: {
        enabled: true,
        mode: "xy",
      },
      showScale: true,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              fontColor: "#218493",
              labelString:
                "Дата: прошлые периоды - на последнюю дату месяца, текущий период - по дням",
            },
            ticks: {
              //suggestedMax: 10,
              //min: 1000,
              //max:30,
              //stepSize: 3
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              fontColor: "#218493",
              display: true,
              labelString: yAxisLabel,
            },
            ticks: {
              callback: function (value, index, values) {
                return Number(value)
                  .toFixed(0)
                  .replace(/./g, function (c, i, a) {
                    return i > 0 && c !== "." && (a.length - i) % 3 === 0
                      ? " " + c
                      : c;
                  });
              },

              //min: 0,
              // max:5000000
              //stepSize: 1000000
            },
          },
        ],
      },
    };
    const outChart = (
      <div className="container">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            {defaultTableBar}
            <div style={{ position: "sticky", margin: "left", width: "90vw" }}>
              <Line data={chartData} options={options} title="График" />
            </div>
          </React.Fragment>
        )}
      </div>
    );
    return <div>{outChart}</div>;
  }
}

export default CogiChartNew;
