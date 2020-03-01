import React from 'react';
import Plot from 'react-plotly.js';
//Stylesheets
import "../Layout/Reports.css"
// TODO Bootstrap modals for the logs
export default class BottomGraph extends React.Component{
		render(){
				return(
					<div id = "bottomchart">
					<p id="tablechart">Table Chart</p>
					<button id="pause">Stop Graph</button>
					<table style={{width:'100%'}} id = "traces">
						<tr id = "fieldnames">
						</tr>
						<tr id = "data">
						</tr>
						</table>
					</div>
				);
		}
	}
	