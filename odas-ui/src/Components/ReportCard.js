import React from 'react';
import Plot from 'react-plotly.js';
//Stylesheets
import "../Layout/Reports.css";
//import TitleBar from './TitleBar';
//import BottomGraph from './BottomGraph';
// TODO Bootstrap modals for the logs
export default class ReportCard extends React.Component {
/*	constructor(){
		super();
//		this.onClick = this.handleClick.bind(this);
	}*/
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
		url: 'http://127.0.0.1:8000/api/sat/6/comp/14/recent/10/',
	}
		
	componentDidMount() {
	//this.initial();
	//this.testheaders();
	//this.testurl();
	//fetch(this.url).then(response=>{
	//	console.log(response.headers)
	//})
	setInterval(this.increaseGraphic, 1000);
	} 
/*	
	initial = () => {
	//const myHeaders = new Headers();
	
	var out;
	var compSpecified = false;
	var quantity; 
	var realQuantity;
	var checkQuantities;
	var outSort;
	var data;
	var sortedMeasurements = [];
	var allUnits = [];
	var allNames = [];
	var distinct;
	var distinctUnits;
	var numUniqueUnits;
	var distinctNames;
	var numUniqueNames;
	var totalNumGraphs;
	var totalGraphsArray;
	var altcurrentData;	
	}
	//testheaders = () => {
	//	this.myHeaders.append('Content-Type', 'application/json');
	//	this.myHeaders.append('Authorization', 'Token cc3c47b2ca27352dd789a67ff5ad847d189adc84');
	//}
	//testurl=()=>{
	//	this.url = window.url+'sat/6/comp/14/recent/10/';
	//}
	checkData = () =>{
				var error;
				console.log('Test 1: Full API:', out);
				if(out.data==true){
					titleSpecs(out);
					window.compSpecified = false;
					checkCompSpecified(out);
					quantity = out.Quantities.CPU; //Quantity has been replaced; therefore, quantity test should always fail.
					realQuantity = 0;
					realQuantity = out.Measurements.length;
					checkQuantities = false;
					checkQuantitiesMatch(quantity, realQuantity);
					outSort = out; //will leave original out untouched.
					data = [];
				}
				else if(out.data==false){
					error = out.error;
					errorOutput(error);
				}
				else{
					error = "Error: The API is not in the correct JSON format. Please check again."
					errorOutput(error);
				}
			}
	
	createDataUnit = () => {
				for(var c=0;c<realQuantity;c++){
					var dataUnit = [];
					if(compSpecified == true){
						dataUnit.push(out.Component.category);
						dataUnit.push(out.Component.description);
						dataUnit.push(out.Component.model);
						dataUnit.push(out.Component.name);
					}
						dataUnit.push(out.Measurements[c].time);
						dataUnit.push(out.Measurements[c].units);
						dataUnit.push(out.Measurements[c].value);
						data.push(dataUnit);
				}
					console.log('Test 4: Formatted Data Array: ', data);
			}
	
	sortMeasurements = () => {
				outSort.Measurements.sort(compare.bind(null, 'units'));
				console.log('Test 5: Sorted Out: ', outSort.Measurements);
					for(var a=0;a<realQuantity;a++){
						sortedMeasurements.push(outSort.Measurements[a]);
						allUnits.push(outSort.Measurements[a].units);
						if(compSpecified==true){
							allNames.push(outSort.Measurements[a].component_name[0]);
						}
					}
				console.log('Test SortedMeasurements JSON: ', sortedMeasurements);				
			}
			
	makeParameters = () => {
				console.log('Test 6: Data Attributes: ');
				distinct = (value, index, self) => {
					return self.indexOf(value) === index;
				}
				distinctUnits = allUnits.filter(distinct);
				console.log('Test Distinct Units: ', distinctUnits);
				numUniqueUnits = distinctUnits.length;
				console.log('Test Num Unique Units: ', numUniqueUnits);
				distinctNames = allNames.filter(distinct);
				console.log('Test Distinct Names: ', distinctNames);
				numUniqueNames = distinctNames.length;
				console.log('Test Num Unique Names: ', numUniqueNames);
				
				totalNumGraphs = numUniqueUnits*numUniqueNames;
				if(compSpecified == false){
					totalNumGraphs = numUniqueUnits;
				}
				console.log('Total Num Graphs: ', totalNumGraphs);
			}
	
	makeGraphArray = () =>{
				totalGraphsArray = [];
				for(var a=0;a<totalNumGraphs;a++){
					//make dummy positions
					var dummyGraph = [];
					totalGraphsArray.push(dummyGraph);
				}
				console.log('Test Empty Total Graphs Array: ', totalGraphsArray);
							
				if(compSpecified == false){
					numUniqueNames = 1;
				}
							
				for(var a=0;a<realQuantity;a++){
					for(var b=0;b<numUniqueUnits;b++){
						for(var c=0;c<numUniqueNames;c++){
							if(sortedMeasurements[a].units==distinctUnits[b]){
								if(sortedMeasurements[a].component_name==distinctNames[c]){
									totalGraphsArray[b*numUniqueNames+c].push(sortedMeasurements[a]);
								}
							}
						}
					}
				}
				console.log('Test 7: Total Graphs Array: ', totalGraphsArray);
				console.log('Test Total Graphs Array Length', totalGraphsArray.length);
			}
			
	reorder = () => {
				//Flip components to list them in correct sequential order.
				for(var a=0;a<totalGraphsArray.length;a++){
					if(totalGraphsArray[a].length>1){
						totalGraphsArray[a].reverse();
						if(compSpecified==false){
							totalGraphsArray[a].sort(compare.bind(null, 'time'));
						}
					}
				}
				console.log('Test 8: Reordered Total Graphs Array: ', totalGraphsArray);
			}
	setGraphType = () =>{
				altcurrentData = [];
				for(var a=0;a<totalNumGraphs;a++){
					if (totalGraphsArray[a].length!=0&&totalGraphsArray[a].length!=null){
						for(var b=0;b<totalGraphsArray[a].length;b++){
							altcurrentData.push(totalGraphsArray[a][b].value);
						}
					}
				}
				console.log('AltCurrentData:', altcurrentData);
							
				var testIndex;
				if(compSpecified==true){
					testIndex = 3; //example.
					console.log('Example Specific Unit-Name(Specified): GHz-MainCPU1');
					exampleGraphData = totalGraphsArray[0][testIndex]; //example. 3 
				}
				else{
					testIndex = 0;
					console.log('Example Unspecified Unit-Name(Specified): ');
					exampleGraphData = totalGraphsArray[0];//[testIndex]; //example. 3 
				}
			}
	 titleSpecs(out){
			var mydiv = document.getElementById("toptitle");
			var newcontent = document.createElement('div');
			newcontent.innerHTML = out.Satellite.name;
			var mydiv2 = document.getElementById("toptitle2");
			var newcontent2 = document.createElement('div');
			newcontent2.innerHTML = ": Launched "+out.Satellite.year_launched;
			var newcontent3 = document.createElement('div');
			newcontent3.innerHTML = ""+out.Satellite.mission_description;
			while (newcontent.firstChild) {
				mydiv.appendChild(newcontent.firstChild);
				mydiv.appendChild(newcontent2.firstChild);
				mydiv2.appendChild(newcontent3.firstChild);
			}
		}
		checkCompSpecified(out){
			compSpecified = out.comp_specified;
			window.compSpecified = out.comp_specified;
			console.log('Test 2: Component Specified?: ', compSpecified);
		}
		checkQuantitiesMatch(quantity, realQuantity){
			if(quantity==realQuantity){
				checkQuantities = true;
				window.checkQuantities = true;
			}
			console.log('Quantity: ', quantity);
			console.log('Real Quantity: ', realQuantity);
			console.log('Test 3: Quantities Match? : ', checkQuantities);
			if(quantity==realQuantity==0){
				console.log('Error: No Data');
			}
		}
		compare(key,a,b){
			if(a.key<b.key){
				return -1;
			}
			if(a.key>b.key){
				return 1;
			}
			return 0;
		}
	
  */
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
        <div className={"card-container"}>
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
	