import React from 'react';
import Plot from 'react-plotly.js';
//Stylesheets
import "../Layout/Reports.css";
import TitleBar from './TitleBar.js';
import BottomGraph from './BottomGraph.js';
// TODO Bootstrap modals for the logs
export default class ReportCard extends React.Component {
//	constructor(){
//		super();
//		this.onClick = this.handleClick.bind(this);
//	}*/

	state = {
		line1:{
			x: [], 
			y: [], 
			name: 'Line 1',
			line: {color: 'red'},
		},
		layout: {
			autosize: false,
			xaxis: {
				showgrid: true,
				zeroline: true,
				showline: true,
				gridcolor: '#bdbdbd',
				gridwidth: 2,
				zerolinecolor: '#969696',
				zerolinewidth: 4,
				linecolor: '#636363',
				linewidth: 6,
				title: 'Date/Time',
				autotick: true,
				},
			yaxis: {
				showgrid: true,
				zeroline: true,
				showline: true,
				gridcolor: '#bdbdbd',
				gridwidth: 2,
				zerolinecolor: '#969696',
				zerolinewidth: 4,
				linecolor: '#636363',
				linewidth: 6,
				title: 'Measurements',
				autotick: true,
				},
			margin: {
				l: 50,
				r: 50,
				b: 50,
				t: 50,
				pad: 4
			},
			width: 600,
			paper_bgcolor: '#000000',
			plot_bgcolor: '#FFFFFF',
			font: {color:"#FFFFFF"},
			datarevision: 0,
		},
		revision: 0,
		url: 'http://127.0.0.1:8080/api/sat/6/comp/14/recent/10/',
		cnt : 0,
		initialDataArray: [],
		paused: false, 
		exampleTime: [], 
		alreadyStopped: false,
		exampleValue: [],
		tableKeys: [],
	}
//	  this.onToggleLoop = this.onToggleLoop.bind(this);
//	}		
	componentDidMount() {
	window.cnt = this.state.cnt;
	window.initialDataArray = this.state.initialDataArray;
	window.paused = this.state.paused;
	window.exampleTime = this.state.exampleTime;
	window.alreadyStopped = this.state.alreadyStopped;
	window.exampleValue = this.state.exampleValue;
	window.tableKeys = this.state.tableKeys;
	var response = require('./testapi.json');
	console.log('start');
	console.log(response);
	this.initial(response);
	window.interval = setInterval(this.increasePlot,1000);
	//window.initialDataArray, window.cnt, window.paused, window.exampleTime, window.alreadyStopped, window.exampleValue, window.tableKeys), 1000);//15);
	} 
	
	initial = (response) => {
		var out = response;
		var compSpecified = false;
		this.checkData(out, compSpecified);
	}

	compare = (key,a,b) => {
		if(a.key<b.key){
			return -1;
		}
		if(a.key>b.key){
			return 1;
		}
		return 0;
	}			
	titleSpecs = (out)  => {
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
	checkCompSpecified = (out, compSpecified) => {
		compSpecified = out.comp_specified;
		console.log('Test 2: Component Specified?: ', compSpecified);
		return compSpecified;
	}
	checkQuantitiesMatch = (quantity, realQuantity, checkQuantities)  => {
		if(quantity===realQuantity){
			checkQuantities = true;
			return checkQuantities;
			//window.checkQuantities = true;
		}
		console.log('Quantity: ', quantity);
		console.log('Real Quantity: ', realQuantity);
		console.log('Test 3: Quantities Match? : ', checkQuantities);
		if(quantity===realQuantity===0){
			console.log('Error: No Data');
		}
		return checkQuantities;
	}
	errorOutput = (error) =>  {
			var mydiv = document.getElementById("toptitle");
			var newcontent = document.createElement('div');
			newcontent.innerHTML = "Error";
			while (newcontent.firstChild) {
				mydiv.appendChild(newcontent.firstChild);
			}
			var node = document.createElement("p");
			var node2 = document.createElement("p");
			var textnode = document.createTextNode(error);
			var textnode2 = document.createTextNode(error);
			node.appendChild(textnode);
			node2.appendChild(textnode2);
			document.getElementById("toptitle").appendChild(node);
			document.getElementById("tablechart").appendChild(node2);
		}
	
	checkData = (out, compSpecified) => {
				var error;
				console.log('Test 1: Full API:', out);
				if(out.data===true){
					this.titleSpecs(out);
					compSpecified = false;
					compSpecified = this.checkCompSpecified(out, compSpecified);
					var quantity = out.Quantities.CPU; //Quantity has been replaced; therefore, quantity test should always fail.
					var realQuantity = 0;
					realQuantity = out.Measurements.length;
					var checkQuantities = false;
					this.checkQuantitiesMatch(quantity, realQuantity, checkQuantities);
					this.createDataUnit(out, realQuantity, compSpecified);
				}
				else if(out.data===false){
					error = out.error;
					this.errorOutput(error);
				}
				else{
					error = "Error: The API is not in the correct JSON format. Please check again."
					this.errorOutput(error);
				}		
	}
	createDataUnit = (out, realQuantity, compSpecified) => {
				for(var c=0;c<realQuantity;c++){
					var dataUnit = [];
					var data = [];
					if(compSpecified === true){
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
					var outSort = out;
					this.sortMeasurements(outSort, realQuantity, compSpecified);
			}
	
	sortMeasurements = (outSort, realQuantity, compSpecified) => {
				outSort.Measurements.sort(this.compare.bind(null, 'units'));
				console.log('Test 5: Sorted Out: ', outSort.Measurements);
				var allUnits = [];
				var allNames = [];
				var sortedMeasurements = [];
					for(var a=0;a<realQuantity;a++){
						sortedMeasurements.push(outSort.Measurements[a]);
						allUnits.push(outSort.Measurements[a].units);
						if(compSpecified===true){
							allNames.push(outSort.Measurements[a].component_name[0]);
						}
					}
				console.log('Test SortedMeasurements JSON: ', sortedMeasurements);	
				this.makeParameters(allUnits, allNames, realQuantity, sortedMeasurements, compSpecified);				
			}
	makeParameters = (allUnits, allNames, realQuantity, sortedMeasurements, compSpecified) => {
				console.log('Test 6: Data Attributes: ');
				var distinct = (value, index, self) => {
					return self.indexOf(value) === index;
				}
				var distinctUnits = allUnits.filter(distinct);
				console.log('Test Distinct Units: ', distinctUnits);
				var numUniqueUnits = distinctUnits.length;
				console.log('Test Num Unique Units: ', numUniqueUnits);
				var distinctNames = allNames.filter(distinct);
				console.log('Test Distinct Names: ', distinctNames);
				var numUniqueNames = distinctNames.length;
				console.log('Test Num Unique Names: ', numUniqueNames);
				
				var totalNumGraphs = numUniqueUnits*numUniqueNames;
				if(compSpecified === false){
					totalNumGraphs = numUniqueUnits;
				}
				console.log('Total Num Graphs: ', totalNumGraphs);
				this.makeGraphArray(totalNumGraphs, numUniqueNames, distinctNames, numUniqueUnits, distinctUnits, realQuantity, sortedMeasurements, compSpecified);
			}
			
	makeGraphArray = (totalNumGraphs, numUniqueNames, distinctNames, numUniqueUnits, distinctUnits, realQuantity, sortedMeasurements, compSpecified) => {
				var totalGraphsArray = [];
				for(var u=0;u<totalNumGraphs;u++){
					//make dummy positions
					var dummyGraph = [];
					totalGraphsArray.push(dummyGraph);
				}
				console.log('Test Empty Total Graphs Array: ', totalGraphsArray);
							
				if(compSpecified === false){
					numUniqueNames = 1;
				}
							
				for(var a=0;a<realQuantity;a++){
					for(var b=0;b<numUniqueUnits;b++){
						for(var c=0;c<numUniqueNames;c++){
							if(sortedMeasurements[a].units===distinctUnits[b]){
								if(sortedMeasurements[a].component_name===distinctNames[c]){
									totalGraphsArray[b*numUniqueNames+c].push(sortedMeasurements[a]);
								}
							}
						}
					}
				}
				console.log('Test 7: Total Graphs Array: ', totalGraphsArray);
				console.log('Test Total Graphs Array Length', totalGraphsArray.length);
				this.reorder(totalGraphsArray, totalNumGraphs, compSpecified);
			}
			reorder = (totalGraphsArray, totalNumGraphs, compSpecified) => {
				//Flip components to list them in correct sequential order.
				for(var a=0;a<totalGraphsArray.length;a++){
					if(totalGraphsArray[a].length>1){
						totalGraphsArray[a].reverse();
						if(compSpecified===false){
							totalGraphsArray[a].sort(this.compare.bind(null, 'time'));
						}
					}
				}
				console.log('Test 8: Reordered Total Graphs Array: ', totalGraphsArray);
				this.setGraphType(totalGraphsArray, totalNumGraphs, compSpecified);
			}
			setGraphType = (totalGraphsArray, totalNumGraphs, compSpecified) => {
				var altcurrentData = [];
				for(var a=0;a<totalNumGraphs;a++){
					if (totalGraphsArray[a].length!==0&&totalGraphsArray[a].length!==null){
						for(var b=0;b<totalGraphsArray[a].length;b++){
							altcurrentData.push(totalGraphsArray[a][b].value);
						}
					}
				}
				console.log('AltCurrentData:', altcurrentData);
							
				var testIndex;
				var exampleGraphData = [];
				if(compSpecified===true){
					testIndex = 3; //example.
					console.log('Example Specific Unit-Name(Specified): GHz-MainCPU1');
					exampleGraphData = totalGraphsArray[0][testIndex]; //example. 3 
				}
				else{
					testIndex = 0;
					console.log('Example Unspecified Unit-Name(Specified): ');
					exampleGraphData = totalGraphsArray[0];//[testIndex]; //example. 3 
				}
				this.plotGraph(compSpecified, exampleGraphData);
			}
			plotGraph = (compSpecified, exampleGraphData) => {
				console.log('Example Graph Data: ', exampleGraphData);
				var exampleTime = [];
				var exampleValue = [];
				for(var a=0;a<exampleGraphData.length;a++){
					exampleTime.push(exampleGraphData[a].time); //x
								exampleValue.push(exampleGraphData[a].value); //y
							}
				console.log('ExampleTime', exampleTime);
				console.log('ExampleValue', exampleValue);

				var table = document.getElementById("traces");
				var row = table.insertRow(table.rows.length-1); //insert row at bottom
				var initialDataArray = exampleGraphData;//totalGraphsArray[0];//[testIndex];
				console.log('Test Initial Data Array', initialDataArray);
				var tableKeys = [];
				if(compSpecified===false){
					//for(var a=0;a<initialDataArray[0].length;a++){
					var keysHold = (Object.keys(initialDataArray[0]));
					//}
					tableKeys = keysHold;
				}
				else{
					tableKeys = Object.keys(initialDataArray);
				}
				for(var b=0;b<tableKeys.length;b++){
					var cellAdd = row.insertCell(b);
					var toChart = tableKeys[b];
					cellAdd.innerHTML = (toChart);
				}
							//tableKeys = [];
							var paused = false;
							var alreadyStopped = false;
							

						
							//Plotly.plot('chart',[{y:[getY(0)],x:[getX(0)],type:'line'}]);
			//				this.initialDataPoints(getY(0, initialDataArray), getX(0));
			//				this.initialDataPoints(this.getY(0, initialDataArray), this.getX(0));
//							this.initialDataPoints(this.getY(0, initialDataArray, exampleValue, alreadyStopped, paused, tableKeys),this.getX(0, exampleTime, alreadyStopped, paused));
							
							//var cnt = 0;
							document.getElementById("pause").addEventListener("click", pause);
						window.initialDataArray = initialDataArray;
						window.paused = paused;
						window.exampleTime = exampleTime;
						window.alreadyStopped = alreadyStopped;
						window.exampleValue = exampleValue;
						window.tableKeys = tableKeys;
//						var interval = setInterval(this.increasePlot(initialDataArray, window.cnt, paused, exampleTime, alreadyStopped, exampleValue, tableKeys), 15);
/*						if(paused === true){
									document.getElementById("pause").innerHTML = "Paused";//Date();
									clearInterval(interval);
									console.log('Stopped!');
								}	
*/							console.log('finish');
							
							function pause() {
								console.log('Stop enabled.');
								paused = true;
							}	
							pause.bind(this)()
						}

					increasePlot = () => {
//					initialDataArray, cnt, paused, exampleTime, alreadyStopped, exampleValue, tableKeys) => {
								var initialDataArray = window.initialDataArray;
								//this.state.initialDataArray;
								var cnt = this.state.cnt;
								//window.cnt;
								var paused = this.state.paused; 
								//window.paused;
								var exampleTime = window.exampleTime;
								//this.state.exampleTime;
								var alreadyStopped = this.state.alreadyStopped;
								//window.alreadyStopped;
								var exampleValue = window.exampleValue;   
								//this.state.exampleValue;
								var tableKeys = window.tableKeys;
								//this.state.tableKeys;
							console.log('increasePlot'+cnt+paused);	
								//if(this.getY(cnt, initialDataArray, exampleValue, alreadyStopped, paused, tableKeys)!==null&&this.getX(cnt, exampleTime, alreadyStopped, paused)!==null){
								if(cnt<initialDataArray.length){
//								this.initialDataPoints(this.getY(cnt+1, initialDataArray, exampleValue, alreadyStopped, paused, tableKeys),this.getX(cnt+1, exampleTime, alreadyStopped, paused));
								var initialY = this.getY(cnt, initialDataArray, exampleValue, alreadyStopped, paused, tableKeys);
								var initialX = this.getX(cnt, exampleTime, alreadyStopped, paused);
								const { line1, layout } = this.state;
								line1.x.push(initialX);
								line1.y.push(initialY);
								if (line1.x.length >= 500) {
									line1.x.shift();
									line1.y.shift();
								} 
								if(paused === true){
									document.getElementById("pause").innerHTML = "Paused";//Date();
									clearInterval(window.interval);
									console.log('Stopped!');
								}
							console.log('full',initialDataArray, cnt, paused, exampleTime, alreadyStopped, exampleValue, tableKeys);
								this.setState({ revision: this.state.revision + 1 , cnt: this.state.cnt + 1, initialDataArray: window.initialDataArray, exampleTime: window.exampleTime, exampleValue: window.exampleValue, tableKeys: window.tableKeys});
								layout.datarevision = this.state.revision + 1;
								}
								else{
									document.getElementById("pause").innerHTML = "STOPPED";//Date();
									clearInterval(window.interval);
									console.log('Stopped! Finished plotting data, no more values left.');
								}
							}

							getX = (count, exampleTime, alreadyStopped, paused) => {
							console.log('getX');
								if(exampleTime[count]!==null){
									console.log('getX if');
									//console.log('X Plot: ',exampleTime[count]);
									return exampleTime[count];
								}
								else{
									console.log('getX else');
									if(alreadyStopped===false){
										console.log('End of Data.');
										window.paused = true;
										clearInterval(window.interval);
										window.alreadyStopped=true;
									}
								}
							}
							//getX.bind(this)()
							
							getY = (count, initialDataArray, exampleValue, alreadyStopped, paused, tableKeys) => {
				console.log('getY exampleValue', exampleValue);
								if(exampleValue[count]!==null){
				console.log('getY if ', count, initialDataArray);
									this.getData(count, initialDataArray, tableKeys);
									//console.log('Y Plot: ', exampleValue[count]);
									return exampleValue[count];
								}
								else{
						console.log('getY else');
									if(alreadyStopped===false){
										console.log('End of Data.');
										window.paused = true;
										clearInterval(window.interval);
										window.alreadyStopped = true;
									}
								}
							}
							
						getData = (cnt, initialDataArray, tableKeys) => {
									var table = document.getElementById("traces");
									var row = table.insertRow(table.rows.length-1); //insert row at bottom	
							console.log('getData');
								if(initialDataArray[cnt]!==null){		
							console.log('getData if');
										tableKeys = Object.values(initialDataArray[cnt]);
										for(var a=0;a<tableKeys.length;a++){
									console.log('getData if for ');
											var cellAdd = row.insertCell(a);
											var toChart = tableKeys[a];
											cellAdd.innerHTML = (toChart);
										}
								}
							}  
/*
	initialDataPoints = (initialY, initialX) => {
    const { line1, layout } = this.state;
console.log('initialDataPoints',initialY, initialX);
    line1.x.push(initialX);
    line1.y.push(initialY);
    if (line1.x.length >= 500) {
      line1.x.shift();
      line1.y.shift();
    } 
    this.setState({ revision: this.state.revision + 1 });
    layout.datarevision = this.state.revision + 1;
  }
  */
    render() {
        return (
        <div className={"card-container"}>
            <div className={"card"}>
                <div className={"graph-report"}>{this.props.children}
				          <TitleBar/>
					         <Plot 
					          data={[this.state.line1]}
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