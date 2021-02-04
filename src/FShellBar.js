import { Shellbar } from "fundamental-react";
import React from "react";

function FShellBar(props) {
  return (
    <Shellbar
      actions={[
        {
          glyph: "settings",
          label: "Settings",
          notificationCount: 0,
          callback: () =>props.belsap(),
        },
      ]}
      logoSAP
      productSwitch={{
        label: "Product Switch",
      }}
      productSwitchList={[
        {
          callback: () => props.fioriHome(),
          title: "Fiori панель",
          subtitle: "Программы SAP Fiori",
          //image: "./assets/01.png",
          selected: true,
          glyph: "e-care",
        },
        {
          callback: () => props.cloud(),
          title: "Облако",
          subtitle: "Управление системой",
          //image: "./assets/05.png",
          glyph: "cloud",
        },        
        {
          callback: () => props.onDebtChart(),
          title: "Долги дебиторов",
          subtitle: "Управление сбытом",
          //image: "./assets/02.png",
          glyph: "monitor-payments",
        },
        {
          callback: () => props.onCredChart(),
          title: "Долги кредиторов",
          subtitle: "Управление закупками",
          //image: "./assets/03.png",
          glyph: "simple-payment",
        },
        {
          callback: () => props.onConfigurator(),
          title: "Конфигуратор изделия",
          subtitle: "Управление конструкцией",
          //image: "./assets/04.png",
          glyph: "database",
        }
      ]}
      productTitle="SAP"
      subtitle="GMSM"
      onLogoClick={() => console.log(`selected!`)}
      profile={{
        image: "https://www.gomselmash.by/images/exmp/zdanieIK.JPG",
        userName: "Vadzim Zhmailik",
      }}
    />
  );
}
export default FShellBar;
