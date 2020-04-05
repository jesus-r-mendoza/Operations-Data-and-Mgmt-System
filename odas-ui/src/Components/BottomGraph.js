import React from 'react';
//Stylesheets
import "../Layout/Reports.css"
// TODO Bootstrap modals for the logs
export default class BottomGraph extends React.Component{
		render(){
				return(
					<div id = "bottomchart">
					<p id="tablechart">Table Chart</p>
					<button id="pause" onClick={this.props.pause}>Stop Graph</button>
					<div>
						<label htmlFor="validIndices" id="validIndicesLabel"><b> Valid Indices: </b></label>
						<select id="validIndices"></select>
					</div>
					<div>
						<label htmlFor="fname" id="chooseUnitLabel"><b> Input Test Index (must be valid, check Valid Indices and type the index number here; if not known, put 0) :  </b></label>
						<input type="text" id="chooseUnit" name="fname" defaultValue="0"></input>
					</div>
					<table style={{width:'100%'}} id = "traces">
						<tbody id = "tracesbody">
						<tr id = "fieldnames">
						</tr>
						<tr id = "data">
						</tr>
						</tbody>
						</table>
					</div>
				); 
		}
	}
	