import React, { Component } from 'react';
import {
    ToggleButton,
  } from "@ui5/webcomponents-react";
//import Button from 'react-bootstrap/Button';
//import { ButtonToolbar } from 'react-bootstrap';
import './TableBar.css';
const debt = 'debt'
const debtOver = 'debt_over'
const debtAndOver = 'debt_and_over'
class TableBar extends Component {
    targetElement = null;
   
    componentDidMount() {
      // 3. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
      // Specifically, the target element is the one we would like to allow scroll on (NOT a parent of that element).
      // This is also the element to apply the CSS '-webkit-overflow-scrolling: touch;' if desired.
      this.targetElement = document.querySelector('#buttons');
      //disableBodyScroll(this.targetElement);
    }    
    render()
    {
        let debt_act;
        let debt_over_act;
        let debt_and_over_act;
        if (this.props.chartType === debt)
        {
            debt_act = true
            debt_over_act = false
            debt_and_over_act = false
        }
        if (this.props.chartType === debtOver)
        {
            debt_act = false
            debt_over_act = true
            debt_and_over_act = false
        }   
        if (this.props.chartType === debtAndOver)
        {
            debt_act = false
            debt_over_act = false
            debt_and_over_act = true

        }               
    return (
            <div>
            <ToggleButton design="Transparent" icon="employee" pressed= {debt_act}
                onClick={() => this.props.onDebt()} >Вся  задолженность
            </ToggleButton>
            <ToggleButton design="Transparent" icon="employee" pressed = {debt_over_act}
                onClick={() => this.props.onDebtOver()} >Просроченная задолженность
            </ToggleButton> 
            <ToggleButton design="Transparent" icon="employee" pressed = {debt_and_over_act}
                onClick={() => this.props.onDebtAndOver()} >Общая задолженность
            </ToggleButton>    
            </div>                                       
    )
}}
export default TableBar;