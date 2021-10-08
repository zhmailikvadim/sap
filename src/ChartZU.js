import React, { Component } from "react";
import { Line } from "react-chartjs-3";
import { Loader } from "@ui5/webcomponents-react/lib/Loader";
import "chartjs-plugin-zoom";
import { ActionBar } from "fundamental-react/lib/ActionBar";
import { Button } from "fundamental-react/lib/Button";

const sumVerprMatnr = "sumVerprMatnr";

const sumVerprMatnrTitle =
  "Динамика остатков материалов на складах в разрезе партии";

class ChartZU extends Component {
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
           "https://sap-odata.gomselmash.by/sap/opu/odata/sap/ZRA_C_ZU_CDS/ZRA_C_ZU?$format=json",
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

  onSumVerprMatnr = () => {
    this.setState({ chartType: sumVerprMatnr, title: sumVerprMatnrTitle });
  };

  render() {
    let emphasizedSumVerpr = "";
    let yAxisLabel = "";

    if (this.state.chartType === sumVerprMatnr) {
      emphasizedSumVerpr = "emphasized";
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
        if (a.wlabs < b.wlabs) {
          return 1;
        }
        if (a.wlabs > b.wlabs) {
          return -1;
       }
        return 0;
      }
      return result;
    });

      this.state.data.forEach((element, i) => {
        if (uniqueCeh.indexOf(element.upravlenie_sklad) < 0) {
          uniqueCeh.push(element.upravlenie_sklad);
        }
      });
    
    let chartData = {
      labels: [],
      datasets: [],
    };
    chartData.labels = uniqueLabels;

    let colors = [
      "#FFD700",
      "#1CE6FF",
      "#FF34FF",
      "#FF4A46",
      "#008941",
      "#006FA6",
      "#A30059",
      "#FFDBE5",
      "#7A4900",
      "#0000A6",
      "#63FFAC",
      "#B79762",
      "#004D43",
      "#8FB0FF",
      "#997D87",
      "#5A0007",
      "#809693",
      "#1B4400",
      "#4FC601",
      "#3B5DFF",
      "#4A3B53",
      "#FF2F80",
      "#61615A",
      "#BA0900",
      "#6B7900",
      "#00C2A0",
      "#FFAA92",
      "#FF90C9",
      "#B903AA",
      "#D16100",
      "#DDEFFF",
      "#000035",
      "#7B4F4B",
      "#A1C299",
      "#300018",
      "#0AA6D8",
      "#013349",
      "#00846F",
      "#372101",
      "#FFB500",
      "#C2FFED",
      "#A079BF",
      "#CC0744",
      "#C0B9B2",
      "#C2FF99",
      "#001E09",
      "#00489C",
      "#6F0062",
      "#0CBD66",
      "#EEC3FF",
      "#456D75",
      "#B77B68",
      "#7A87A1",
      "#788D66",
      "#885578",
      "#FAD09F",
      "#FF8A9A",
      "#D157A0",
      "#BEC459",
      "#456648",
      "#0086ED",
      "#886F4C",
      "#34362D",
      "#B4A8BD",
      "#00A6AA",
      "#452C2C",
      "#636375",
      "#A3C8C9",
      "#FF913F",
      "#938A81",
      "#575329",
      "#00FECF",
      "#B05B6F",
      "#8CD0FF",
      "#3B9700",
      "#04F757",
      "#C8A1A1",
      "#1E6E00",
      "#7900D7",
      "#A77500",
      "#6367A9",
      "#A05837",
      "#6B002C",
      "#772600",
      "#D790FF",
      "#9B9700",
      "#549E79",
      "#FFF69F",
      "#201625",
      "#72418F",
      "#BC23FF",
      "#99ADC0",
      "#3A2465",
      "#922329",
      "#5B4534",
      "#FDE8DC",
      "#404E55",
      "#0089A3",
      "#CB7E98",
      "#A4E804",
      "#324E72",
      "#6A3A4C",
    ];
    while (colors.length < 100) {
      do {
        var color = Math.floor(Math.random() * 1000000 + 1);
      } while (colors.indexOf(color) >= 0);
      colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    uniqueCeh.forEach((upravlenie_sklad, i) => {
      let dataset = {
        label: upravlenie_sklad,
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

        chartData.labels.forEach((item_data) => {
          this.state.data.forEach((item, i) => {
            if (upravlenie_sklad === item.upravlenie_sklad && item.data1 === item_data) {

              if (this.state.chartType === sumVerprMatnr) {
                dataset.data.push(item.wlabs);
              }
            }
          });
        });
      chartData.datasets.push(dataset);
    });

      const defaultTableBar = (
      <React.Fragment>
        <ActionBar
          actions={
              <Button
                option={emphasizedSumVerpr}
                onClick={() => this.onSumVerprMatnr()}
              >
                Общие остатки по подразделениям
              </Button>
          }
          description={"Остатки"}
          title={"ZU"}
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
      )  }
      </div>
    ); 
    return <div>{outChart}</div>;
  }
}

export default ChartZU;

