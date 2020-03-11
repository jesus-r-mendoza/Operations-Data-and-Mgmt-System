import React from 'react';
import Plot from 'react-plotly.js';
//Stylesheets
import "../Layout/Reports.css"
// TODO Bootstrap modals for the logs
	export default class TitleBar extends React.Component{
		render(){
			return (
				<div className="titlebar">
				<div className="navbar" id="toptitle"><span>Real-Time Telemetry Data: </span></div>
				<div>
					<div id="toptitle2"><span> </span></div>
				</div>
				<div className="wrapper">
					<div id="chart"></div>
					<div id="chart0"></div>
					<div id = "bottomchart2">
					<table style={{width:'100%'}} id = "traces2">
						<tr id = "fieldnames2">
						</tr>
						<tr id = "data2">
						</tr> 
					</table>
					</div>
				</div>
				</div>
			);
		}
	}