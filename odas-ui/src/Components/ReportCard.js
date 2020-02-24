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
		url: 'http://127.0.0.1:8080/api/sat/6/comp/14/recent/10/',
	}
		
	async getDataFetch(){
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', 'Token cc3c47b2ca27352dd789a67ff5ad847d189adc84');
			const response = 
			await 
			fetch('http://127.0.0.1:8080/api/sat/6/comp/14/recent/10/',
        { headers: myHeaders});
		console.log(await response);
	}
		
	componentDidMount() {
		this.getDataFetch();
//	this.initial(response);
	this.initial();
	setInterval(this.increaseGraphic, 1000);
	} 
	
	initial = () => {
//	initial = (response) => e => {
//		var out = response;
		var compSpecified = false;
//		checkData(out, compSpecified);
	}

	compare = (key,a,b) => e => {
		if(a.key<b.key){
			return -1;
		}
		if(a.key>b.key){
			return 1;
		}
		return 0;
	}			
	titleSpecs = (out) => e => {
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
	checkCompSpecified = (out, compSpecified) => e => {
		compSpecified = out.comp_specified;
		console.log('Test 2: Component Specified?: ', compSpecified);
		return compSpecified;
	}
	checkQuantitiesMatch = (quantity, realQuantity, checkQuantities) => e => {
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
	
	checkData = (out, compSpecified) => e => {
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
	createDataUnit = (out, realQuantity, compSpecified) => e => {
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
	
	sortMeasurements = (outSort, realQuantity, compSpecified) => e => {
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
	makeParameters = (allUnits, allNames, realQuantity, sortedMeasurements, compSpecified) => e => {
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
			
	makeGraphArray = (totalNumGraphs, numUniqueNames, distinctNames, numUniqueUnits, distinctUnits, realQuantity, sortedMeasurements, compSpecified) => e => {
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
			reorder = (totalGraphsArray, totalNumGraphs, compSpecified) => e =>{
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
			setGraphType = (totalGraphsArray, totalNumGraphs, compSpecified) => e => {
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
//				this.plotGraph(compSpecified, exampleGraphData);
			}
/*			plotGraph = (compSpecified, exampleGraphData) => e => {
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
				if(compSpecified==false){
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
				
							var tableKeys = [];
							var tableLog = [];
							var paused = false;
							var alreadyStopped = false;
							
							function getX(count){// = (count) => e =>{
								if(exampleTime[count]!=null){
									//console.log('X Plot: ',exampleTime[count]);
									return exampleTime[count];
								}
								else{
									if(alreadyStopped==false){
										console.log('End of Data.');
										paused = true;
										//clearInterval(interval);
										alreadyStopped=true;
									}
								}
							}
							getX.bind(this)()
							
							function getY(count){// = (count) => e => {
								if(exampleValue[count]!=null){
									this.getData(count);
									//console.log('Y Plot: ', exampleValue[count]);
									return exampleValue[count];
								}
								else{
									if(alreadyStopped==false){
										console.log('End of Data.');
										paused = true;
										//clearInterval(interval);
										alreadyStopped = true;
									}
								}
							}
							getY.bind(this)()
							
						function getData(cnt){// = (cnt) => e => {
									var table = document.getElementById("traces");
									var row = table.insertRow(table.rows.length-1); //insert row at bottom	
										tableKeys = Object.values(initialDataArray[cnt]);
										for(var a=0;a<tableKeys.length;a++){
											var cellAdd = row.insertCell(a);
											var toChart = tableKeys[a];
											cellAdd.innerHTML = (toChart);
										}
							}  
						getData.bind(this)()
						
							Plotly.plot('chart',[{y:[getY(0)],x:[getX(0)],type:'line'}]);
							
							var cnt = 0;
							document.getElementById("pause").addEventListener("click", pause);

							function pause() {
								console.log('Stop enabled.');
								paused = true;
							}	
							pause.bind(this)()
						
						var interval = setInterval(function(){
								
								//[0] at the end of extendTraces because only 1 example trace.
								Plotly.extendTraces('chart',{ y:[[getY(cnt+1)]], x:[[getX(cnt+1)]]}, [0]); 
								
								cnt++;
								if(cnt > 500) {
									Plotly.relayout('chart',{xaxis: {range: [cnt-500,cnt]}, yaxis: {range: [Math.min(exampleValue),Math.max(exampleValue)]}});
								}
								if(paused == true){
									document.getElementById("pause").innerHTML = "Paused";//Date();
									clearInterval(interval);
									console.log('Stopped!');
								}
							},15);
							console.log('finish');
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
	