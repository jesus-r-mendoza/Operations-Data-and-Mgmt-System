import React from 'react';
import Plot from 'react-plotly.js';
//Stylesheets
import "../Layout/Reports.css"
// TODO Bootstrap modals for the logs
export default class ReportCard extends React.Component {
	state = {
		
		line1: {
			x: [-3, -2, -1], 
			y: [1,2,3], 
			name: 'Line 1'
		}, 
		line2: {
			x: [1,2,3],
			y:[-3,-2,-1], 
			name: 'Line2'
		},
		layout: {
			datarevision: 0,
		},
		revision: 0,
	}
	
	
	
	  componentDidMount() {
    setInterval(this.increaseGraphic, 1000);
  } 
  rand = () => parseInt(Math.random() * 10 + this.state.revision, 10);
	increaseGraphic = () => {
    const { line1, line2, layout } = this.state;
    line1.x.push(this.rand());
    line1.y.push(this.rand());
    if (line1.x.length >= 10) {
      line1.x.shift();
      line1.y.shift();
    } 
    line2.x.push(this.rand());
    line2.y.push(this.rand());
    if (line2.x.length >= 10) {
      line2.x.shift();
      line2.y.shift();
    }
    this.setState({ revision: this.state.revision + 1 });
    layout.datarevision = this.state.revision + 1;
  }
    render() {
        return (
            <div className={"card"}>
                <div className={"graph-report"}>{this.props.children}
				<TitleBar/>
					<Plot 
					data={[
							this.state.line1, 
							this.state.line2,
					]}
					layout = {this.state.layout}
					revision={this.state.revision}
					graphDiv = "graph"
					/>
					<BottomGraph/>
                </div>
            </div>
        );
    }
}

	class TitleBar extends React.Component{
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
	class BottomGraph extends React.Component{
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
	