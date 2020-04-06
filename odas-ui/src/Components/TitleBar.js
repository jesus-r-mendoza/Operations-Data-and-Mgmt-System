import React from 'react';
//Stylesheets
import "../Layout/Reports.css"

export default class TitleBar extends React.Component{
	render(){
		return (
			<div className="titlebar">
				<div className="navbar" id="toptitle"><span>Real-Time Telemetry Data: </span></div>
				<div>
					<div id="toptitle2"><span> </span></div>
				</div>
			</div>
		);
	}
}