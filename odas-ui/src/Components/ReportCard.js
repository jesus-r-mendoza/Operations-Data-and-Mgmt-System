import React from 'react';
import Plot from 'react-plotly.js';
//Stylesheets
import "../Layout/Reports.css"
// TODO Bootstrap modals for the logs
export default class ReportCard extends React.Component {
    render() {
        return (
            <div className={"card"}>
                <div className={"graph-report"}>
                    <Plot>
                        /*
						data={[
                            {
                                x: [1, 2, 3],
                                y: [2, 6, 3],
                                type: 'scatter',
                                mode: 'lines+points',
                                marker: {color: 'red'},
                            },
                            {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                        ]}
                        layout={ {width: 'autosize', height: 300, title: 'A Fancy Plot'} }
						*/
						/*
						function getData() {
							return Math.random();
						}  
						Plotly.plot('chart',[{y:[getData()],type:'line'}]);
						var cnt = 0;
						setInterval(function(){
							Plotly.extendTraces('chart',{ y:[[getData()]]}, [0]);
							cnt++;
							if(cnt > 500) {
								Plotly.relayout('chart',{xaxis: {range: [cnt-500,cnt]}});
							}
						},15);
						*/
						
							<head>
    <meta http-equiv="content-type" content = "text/html; charset= UTF-8"/>

	<script src="plotly.min.js"></script>
	<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
	<script src="xml2json.js"></script>	
	
	<script>

	</script>
	</head>
	<body>
	<div className="navbar" id="toptitle"><span>Real-Time Telemetry Data: </span></div>
	<div className="wrapper">
		<div id="chart"></div>
		<div id="chart0"></div>
		<div id = "bottomchart2">
			<tr id = "fieldnames2">
			</tr>
			<tr id = "data2">
			</tr>
		</table>
		</div>
		<script src="xml2json.js"></script>
		<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script>	
			console.log('start');
			var done = false;
			var keys = [];
			var numKeys = 0;
			var rawvalues = [];
			var keysValues = [];
			var json = "";
			//var myList = document.querySelector('ul');

//TEST 4
/*			
			$.ajax({
				method: 'GET',
//WARNING: ALWAYS ADD/REMOVE API KEY
				url: 'https://cors-anywhere.herokuapp.com/https://sscweb.sci.gsfc.nasa.gov/WS/sscr/2/locations/mms1,mms2/20190101T000000Z,20190101T001000Z/gse,geo/?',
				success: function(html) {
					console.log('herokutest');
					console.log(html);
				}
			})
*/			
			var request = new Request(
//TEST 3
			//'http://127.0.0.1:8000/api/satellites/1/recent/7/');
			//'http://127.0.0.1:8000/api/satellites/4/recent/100/');
			//'http://127.0.0.1:8000/api/satellites/3/recent/100/');
			//	'http://127.0.0.1:8000/api/recent/100/');
		//	'http://127.0.0.1:8000/api/sat/2/recent/7/');
		//	'http://127.0.0.1:8000/api/sat/3/meas/from=2019-01-01T22:43:23/to=now/');
		// 	'http://127.0.0.1:8000/api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=2019-11-19T00:00:00/');
	//	 	'http://127.0.0.1:8000/api/sat/1/comp/1+2+5/recent/10/');//true
		//	'http://127.0.0.1:8000/api/sat/3/meas/from=2019-01-01T22:43:23/to=now/');//true
		//	'http://127.0.0.1:8000/api/sat/6/comp/14/recent/10/'); //false
			'http://127.0.0.1:8000/api/sat/4/meas/comp/10/from=2019-01-01T22:43:23/to=now/');//false
//TEST 1
//			'https://raw.githubusercontent.com/nlee806/temp/master/testdata.txt'); //testType = 1
	// /locations/{observatories}/{timeRange}/{coordinateSystems}/ 
	// {observatories} = a comma separated list of observatory identifiers for which location data is being requested. The values must be from those returned by Get Observatories.
	//{timeRange} = time range for which data location is being requested. There must be two comma separated basic format (minimal number of separators) ISO 8601 date values.
	//{coordinateSystems} = a comma separated list of the names of the coordinate systems in which to represent the returned location information. The values must be from this list: geo, gm, gse, gsm, sm, geitod, geij2000. If no values are given, gse will be assumed. For each coordinate system, the X, Y, Z, Latitude, Longitude, and local-time (if applicable) values will be returned.
	//Satellite observatories: mms1,mms2
	//Time range: 20190101T000000Z,20190101T001000Z
	//Coordinate systems: gse,geo
//TEST 2
//WARNING: ALWAYS ADD/REMOVE API KEY testType = 2
//			'https://sscweb.sci.gsfc.nasa.gov/WS/sscr/2/locations/mms1,mms2/20190101T000000Z,20190101T001000Z/gse,geo/?');  
			//'https://sscweb.sci.gsfc.nasa.gov/WebServices/REST/json/results/themis2.json.txt');
			//app.get('/YourPath/:parameterName', 
			//function (req, res) {
			fetch(request)//, {mode: 'no-cors', headers: {'Access-Control-Allow-Origin':'*'}})//"same-origin"})//no-cors"})
				.then(res => res.json()) //testType = 1, 3
/*				.then(res => res.text()) //testType = 2
				.then(text => {
//				console.log(text);
			//from xmljson_test.html
			function parseXml(xml) {
				var dom = null;
				if (window.DOMParser) {
					try { 
						dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
					} 
					catch (e) { dom = null; }
				}
				else if (window.ActiveXObject) {
					try {
						dom = new ActiveXObject('Microsoft.XMLDOM');
						dom.async = false;
						if (!dom.loadXML(xml)) // parse error ..
							window.alert(dom.parseError.reason + dom.parseError.srcText);
						} 
					catch (e) { dom = null; }
				}
				else
					alert("Error!");
					return dom;
				}
				json = xml2json(parseXml(text), "  ");
//				console.log('jsontest');
//				console.log(json);
				})
*/
				.then((out) => {
					var testType = 3;
					
					//------------- odas api json ------------------------------
					if(testType==3){
						console.log('test full API', out);
						if(out.data==true){
							var mydiv = document.getElementById("toptitle");
							var newcontent = document.createElement('div');
							newcontent.innerHTML = out.Satellite.name+": Launched "+out.Satellite.year_launched;
							while (newcontent.firstChild) {
								mydiv.appendChild(newcontent.firstChild);
							}
							var compSpecified = false;
							compSpecified = out.comp_specified;
							console.log('Component Specified?: ', compSpecified);
							var outSort = out;
							var measurementsComponent_Category = [];
							var measurementsComponent_Description = [];
							var measurementsComponent_Model = [];
							var measurementsComponent_Name = [];
							var measurementsTime = [];
							var measurementsUnits = [];
							var measurementsValue = [];
							var data = [];
							
							var quantity = out.Quantities; //Quantity has been replaced; therefore, quantity test should always fail.
							var realQuantity = 0;
							//if(compSpecified==true){
								realQuantity = out.Measurements.length;
							//}
							//else{
							//	realQuantity = out.Measurements.length;
							//}
							var checkQuantities = false;
							if(quantity==realQuantity){
								checkQuantities = true;
							}
							console.log('Real Quantity: ', realQuantity);
							console.log('Test: Quantities Match? : ', checkQuantities);
							
							for(var a=0;a<realQuantity;a++){
								if(compSpecified == true){
								measurementsComponent_Category.push(out.Measurements[a].component_category[0]);
								measurementsComponent_Description.push(out.Measurements[a].component_description[0]);
								measurementsComponent_Model.push(out.Measurements[a].component_model[0]);
								measurementsComponent_Name.push(out.Measurements[a].component_name[0]);
								}
								measurementsTime.push(out.Measurements[a].time);
								measurementsUnits.push(out.Measurements[a].units);
								measurementsValue.push(out.Measurements[a].value);
							}
							//ignore
//							console.log('Component_Categories: ', measurementsComponent_Category);
							//ignore
//							console.log('Component_Description: ', measurementsComponent_Description);
							//ignore
//							console.log('Component_Model: ', measurementsComponent_Model);
							
//							console.log('Component_Name: ', measurementsComponent_Name);
//							console.log('Time: ', measurementsTime);
//							console.log('Units: ', measurementsUnits);
//							console.log('Value: ', measurementsValue);
							
							for(var c=0;c<realQuantity;c++){
								var dataUnit = [];
								if(compSpecified == true){
								dataUnit.push(measurementsComponent_Category[c]);
								dataUnit.push(measurementsComponent_Description[c]);
								dataUnit.push(measurementsComponent_Model[c]);
								dataUnit.push(measurementsComponent_Name[c]);
								}
								dataUnit.push(measurementsTime[c]);
								dataUnit.push(measurementsUnits[c]);
								dataUnit.push(measurementsValue[c]);
								data.push(dataUnit);
							}
							console.log('Test Formatted Data Array: ', data);
							
							function compare(a,b){
								if(a.units<b.units){
									return -1;
								}
								if(a.units>b.units){
									return 1;
								}
								return 0;
							}
							outSort.Measurements.sort(compare);
//						console.log('Test Sorted Out: ', outSort.Measurements);
							var sortedMeasurements = [];
							var allUnits = [];
							var allNames = [];
								for(var a=0;a<realQuantity;a++){
									sortedMeasurements.push(outSort.Measurements[a]);
									allUnits.push(outSort.Measurements[a].units);
									if(compSpecified==true){
									allNames.push(outSort.Measurements[a].component_name[0]);
									}
								}
						console.log('Test SortedMeasurements JSON: ', sortedMeasurements);
							
							const distinct = (value, index, self) => {
								return self.indexOf(value) === index;
							}
							const distinctUnits = allUnits.filter(distinct);
						console.log('Test Distinct Units: ', distinctUnits);
							var numUniqueUnits = distinctUnits.length;
						console.log('Test Num Unique Units: ', numUniqueUnits);
							const distinctNames = allNames.filter(distinct);
						console.log('Test Distinct Names: ', distinctNames);
							var numUniqueNames = distinctNames.length;
						console.log('Test Num Unique Names: ', numUniqueNames);
						//Alternative
//						const alternativeDistinctUnits = [...new Set(sortedMeasurements.map(x => x.units))];
//						console.log('Alternative Test Distinct Units 2: ', alternativeDistinctUnits);
						//Alternative
							var totalNumGraphs = numUniqueUnits*numUniqueNames;
							if(compSpecified == false){
								totalNumGraphs = numUniqueUnits;
							}
						console.log('Total Num Graphs: ', totalNumGraphs);
							
							var totalGraphsArray = [];
							var totalGraphsArrayForm = []
							for(var a=0;a<totalNumGraphs;a++){
								//make dummy positions
								var dummyGraph = [];
								totalGraphsArray.push(dummyGraph);
								totalGraphsArrayForm.push(dummyGraph);
							}
						console.log('Test Empty Total Graphs Array: ', totalGraphsArray);
							
							function compareNames(a,b){
								if(a.component_name[0]<b.component_name[0]){
									return -1;
								}
								if(a.component_name[0]>b.component_name[0]){
									return 1;
								}
								return 0;
							}
							
							if(compSpecified == false){
								numUniqueNames = 1;
							}
							
							for(var a=0;a<realQuantity;a++){
							//for all 7 data values
							//ex. MainCPU2, Degrees Celcius(sic)
								var subsectionSameUnit = [];
								for(var b=0;b<numUniqueUnits;b++){
								//for each unique unit Degrees, GHz, Volts
								//3 times for each point
								//ex. Degrees Celcius
									//if(compSpecified==true){
									for(var c=0;c<numUniqueNames;c++){
										if(sortedMeasurements[a].units==distinctUnits[b]){
											//all data points with the same unique unit
											//matching distinct unit
											//current point 
											//ex. MainCPU2, Degrees Celcius. 
							//			subsectionSameUnit.push(sortedMeasurements[a]);		
											if(sortedMeasurements[a].component_name==distinctNames[c]){
												//all data points with the same unique name
												//matching distinct name 
												totalGraphsArray[b*numUniqueNames+c].push(sortedMeasurements[a]);
										/*		var dataUnit2 = [];
												dataUnit2.push(sortedMeasurements[a].component_category[0]);
												dataUnit2.push(sortedMeasurements[a].component_description[0]);
												dataUnit2.push(sortedMeasurements[a].component_model[0]);
												dataUnit2.push(sortedMeasurements[a].component_name[0]);
												dataUnit2.push(sortedMeasurements[a].time);
												dataUnit2.push(sortedMeasurements[a].units);
												dataUnit2.push(sortedMeasurements[a].value);
												console.log('dataUnit2', dataUnit2);
												totalGraphsArrayForm[b*numUniqueNames+c].push(dataUnit2);
											*/
											}
											else{
											}
										}
										else{	
										}
										//when finished with same unique units.
										//sort by names, then put into total graph array
							//			subsectionSameUnit.sort(compareNames);
									}
									//}
								}
							}
							console.log('Test Total Graphs Array: ', totalGraphsArray);
							
							console.log('Test Total Graphs Array Length', totalGraphsArray.length);
							
							function compareTime(a,b){
								if(a.time<b.time){
									return -1;
								}
								if(a.time>b.time){
									return 1;
								}
								return 0;
							}			
							//Flip components to list them in correct sequential order.
							for(var a=0;a<totalGraphsArray.length;a++){
								if(totalGraphsArray[a].length>1){
									totalGraphsArray[a].reverse();
									if(compSpecified==false){
										totalGraphsArray[a].sort(compareTime);
									}
								}
							}
							console.log('Test Reordered Total Graphs Array: ', totalGraphsArray);
							console.log('Test Reordered Total Graphs Array Form: ', totalGraphsArrayForm);
							
							//Alternative
							
							var altcurrentData = [];
							for(var a=0;a<totalNumGraphs;a++){
								//no empty graphs
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
							}
							else{
								testIndex = 1;
								console.log('Texample Unspecified Unit-Name(Specified): ');
							}
							exampleGraphData = totalGraphsArray[testIndex]; //example. 3 
							console.log('Example Graph Data: ', exampleGraphData);
							exampleTime = [];
							exampleValue = [];
							for(var a=0;a<exampleGraphData.length;a++){
								exampleTime.push(exampleGraphData[a].time); //x
								exampleValue.push(exampleGraphData[a].value); //y
							}
				console.log('ExampleTime', exampleTime);
				console.log('ExampleValue', exampleValue);

							var table = document.getElementById("traces");
							var row = table.insertRow(table.rows.length-1); //insert row at bottom
							var initialDataArray = totalGraphsArray[testIndex];
						console.log('Test Initial Data Array', initialDataArray);
							//for(var a=0;a<initialDataArray[0].length;a++){
								//tableKeys.push(Object.keys(initialDataArray[0][a]));
								tableKeys = Object.keys(initialDataArray[0]);
							//}
							for(var b=0;b<tableKeys.length;b++){
								var cellAdd = row.insertCell(b);
								//console.log('tableKeysb', tableKeys[b]);
								var toChart = tableKeys[b];
								cellAdd.innerHTML = (toChart);
							}
				
							var tableKeys = [];
							var tableLog = [];
							var paused = false;
							var alreadyStopped = false;
							function getX(count){
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
							function getY(count){
								if(exampleValue[count]!=null){
									getData(count);
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
							function getData(cnt) {
						//console.log('New row', cnt);
									var table = document.getElementById("traces");
									var row = table.insertRow(table.rows.length-1); //insert row at bottom	
						//console.log('test initialDataArray', initialDataArray);
									//for(var r=1;r<initialDataArray.length;r++){//24 times down by column
						//console.log('test tableKeys', Object.values(initialDataArray[cnt]));
										tableKeys = Object.values(initialDataArray[cnt]);
										for(var a=0;a<tableKeys.length;a++){
											var cellAdd = row.insertCell(a);
											var toChart = tableKeys[a];
											cellAdd.innerHTML = (toChart);
										}
									//}
								//return exampleValue;//altcurrentData;//Math.random();
							}  
							Plotly.plot('chart',[{y:[getY(0)],x:[getX(0)],type:'line'}]);
							
							var cnt = 0;
							
							document.getElementById("pause").addEventListener("click", pause);
							function pause() {
								console.log('Stop enabled.');
								paused = true;
							}	
						
			var interval = 	setInterval(function(){
								/*if(cnt<exampleGraphData){ //10 rows
									console.log('New row', cnt);
									var table = document.getElementById("traces");
									var row = table.insertRow(table.rows.length-1); //insert row at bottom	
									for(var r=1;r<initialDataArray.length;r++){//24 times down by column
										tableKeys = Object.values(initialDataArray[r]);
										for(var a=0;a<tableKeys.length;a++){
											var cellAdd = row.insertCell(a);
											//console.log('multipleTraces', multipleTraces[a]);
											var toChart = tableKeys[a];
											cellAdd.innerHTML = (toChart);
										}
									}
								}*/
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
							
							//Alternative
							
							
/*							//Graphing on Plotly for each array
							var fixChartNumber = 'chart';
							var chartNumber = 'chart';
							var chartNumberExtra = 0;
							for(var a=0;a<totalNumGraphs;a++){
								var currentData = [];
								//no empty graphs
								if (totalGraphsArray[a].length!=0&&totalGraphsArray[a].length!=null){
									for(var b=0;b<totalGraphsArray[a].length;b++){
										currentData.push(totalGraphsArray[a][b].value);
									}
								console.log('Test CurrentData: ', currentData);
								
									var newChartNumber = ""+fixChartNumber+(chartNumberExtra).toString();
								console.log('test New Chart Number: ', newChartNumber);
									chartNumber = newChartNumber;
									var newChart = document.createElement("div");
									newChart.setAttribute("id", ""+fixChartNumber+(chartNumberExtra+1).toString());
									document.getElementById(newChartNumber).appendChild(newChart);
									chartNumberExtra++;
									
									function getData() {
										return currentData;
										//return data;
										//return Math.random();
									}  
								console.log('Test ChartNumber: ', chartNumber);
									//initial plot.
									Plotly.plot(chartNumber,[{y:[getData()],type:'line'}]);
									var cnt = 0;
									//extend new datapoints
									setInterval(function(){
										Plotly.extendTraces(chartNumber,{ y:[[getData()]]}, [currentData.length-1]);
										cnt++;
										//slide along with new data
										if(cnt > 500) {
											Plotly.relayout(chartNumber,{xaxis: {range: [cnt-500,cnt]}});
										}
									},15);
								//setTimeout(function() {
								//}, (3*1000));									
									
								}
								else{
								}
							}
							//Graphing Plotly ends.
*/						
							
							console.log('finish');
						}
						else if(out.data==false){
							var mydiv = document.getElementById("toptitle");
							var newcontent = document.createElement('div');
							newcontent.innerHTML = "Error";
							while (newcontent.firstChild) {
								mydiv.appendChild(newcontent.firstChild);
							}
							var node = document.createElement("p");
							var node2 = document.createElement("p");
							var textnode = document.createTextNode(out.error);
							var textnode2 = document.createTextNode(out.error);
							node.appendChild(textnode);
							node2.appendChild(textnode2);
							document.getElementById("toptitle").appendChild(node);
							document.getElementById("tablechart").appendChild(node2);
							
						}
						else{
							var mydiv = document.getElementById("toptitle");
							var newcontent = document.createElement('div');
							newcontent.innerHTML = "Error";
							while (newcontent.firstChild) {
								mydiv.appendChild(newcontent.firstChild);
							}
							var node = document.createElement("p");
							var node2 = document.createElement("p");
							var textnode = document.createTextNode("Error: The API is not in the correct JSON format. Please check again.");
							var textnode2 = document.createTextNode("Error: The API is not in the correct JSON format. Please check again.");
							node.appendChild(textnode);
							node2.appendChild(textnode2);
							document.getElementById("toptitle").appendChild(node);
							document.getElementById("tablechart").appendChild(node2);
						}
					}
					
					//--------------odas api json ----------------
					//--------------testdata2.json ---------------
					else if(testType==2){
					out = JSON.parse(json);
					//var stringJSON = JSON.stringify(out);
					//console.log(typeof(stringJSON));
					//console.log('stringJSON', stringJSON);
					//console.log(typeof(out));
					console.log(out.Response.Result[0]);
					console.log(out.Response.Result[1]);
					console.log(out.Response.Result[2]); //2->infinity observatories
					var observatories = [];
					var coordinates = [];
					//numObservatories = number of Datas
					var numObservatories = -2; // -1 to account for StatusCode, StatusSubCode
					var numCoordinates = 0;
					var id = "";
					var masterData = [];
					var masterType = [];
					var masterSubType = [];
					var masterTime = [];
					var masterRadialLength = [];
					var masterFields = [];
					var timeArray = [];
					var radialLengthArray = [];
					var coordinateSystems = [];
					var arrangeDataPoints = [];
					var masterDatatempArray = [];
					var masterSingleDataArray = [];
					var masterSingleDataArrayLength = 0;
					var firstKey = "";
					var dataLength = 0;
					var fieldCount = 0;
					var numDatas = out.Response.Result.length - 2;
					var coordinateLength = 0;
					console.log('numDatas', numDatas);
					console.log('out.Response.Result.length',out.Response.Result.length);
					console.log('out.Response.Result[2].Data.length',out.Response.Result[2].Data.length);
					
					for(var a=0;a<out.Response.Result.length;a++){ //0123
						if(a>=2){// if, only if is DataArray
							for(var b=0;b<out.Response.Result[a].Data.length;b++){
								if(b==0){// Id
									id = (out.Response.Result[a].Data[0].Id);//mms1
									observatories.push(id); //mms1, mms2
								}
								if(Object.keys(out.Response.Result[a].Data[b])=="Coordinates"){//2 times
									//mms1, geo
									var secondvalue = Object.values(out.Response.Result[a].Data[b].Coordinates[0]);
									masterType.push([id, secondvalue[0]]);
									//lines to plot
									
								//	coordinates.push(out.Response.Result[a].Data[b].Coordinates);
									//names of CoordinateSystems, Geo, Gre
									//coordinateSystems.push(out.Response.Result[a].Data[b].Coordinates[0]);
									coordinateLength = out.Response.Result[a].Data[b].Coordinates.length; //length of Data[1] and Data[2]
									//masterType.push(masterSubType); //mms1, geo
									dataLength = (coordinateLength-1)/6; //PROBLEM: May be calculated more than once.
									console.log('dataLength', dataLength);
									//NASA standard: 6 field types in Coordinates.
									for(var q=0;q<dataLength;q++){//sets of 10 to mastertempdata.
										var r=[];
										masterData.push(r);
									}
									//console.log('empty masterData', masterData);
									for(var c=0;c<coordinateLength;c++){ //0..61
							//var currentDataPoints = [];
										if(c!=0){//data X, Y, Z, ...
											var currentKey = Object.keys(out.Response.Result[a].Data[b].Coordinates[c]);
											//console.log('c', c, 'currentKey', currentKey);
											//X
											if(currentKey[0]!=firstKey){//different field
												console.log('different field-currentKey[0]', currentKey[0]);
												//if(c!=1){//not 1st X					
													console.log('firstKey', firstKey[0]);
													if(masterFields.includes(firstKey[0])==false){
														masterFields.push(firstKey[0]);
													//	console.log('masterFields pushed', firstKey[0]);
													}
													//masterData.push();
													fieldCount = 0;
												//}
												//if(c==1){
												//	fieldCount = 0;
												//}
												firstKey = currentKey; //X
												var currentValue = Object.values(out.Response.Result[a].Data[b].Coordinates[c]);
												console.log('currentValue', currentValue);
												console.log('fieldCount', fieldCount);
												masterDatatempArray = masterData[fieldCount];
												//console.log('masterDatatempArraya', masterDatatempArray);
												masterData[fieldCount].push(currentValue);
												fieldCount++;
											}
											else{
												var currentValue = Object.values(out.Response.Result[a].Data[b].Coordinates[c]);
												//console.log('currentValue', currentValue);
												if(c==1){
													//arrangeDataPoints.push();
													
												}
												//console.log('fieldCount', fieldCount);
												masterDatatempArray = masterData[fieldCount];
												//console.log('masterDatatempArrayb', masterDatatempArray);
												masterData[fieldCount].push(currentValue);
												fieldCount++;
												
											}
										}										
									}
									//masterData.push([]);
									numCoordinates++;
								}
								if(Object.keys(out.Response.Result[a].Data[b])=="Time"){
									masterTime.push(Object.values(out.Response.Result[a].Data[b]));
								}
								if(Object.keys(out.Response.Result[a].Data[b])=="RadialLength"){
									masterRadialLength.push(Object.values(out.Response.Result[a].Data[b]));
								}
							}
						}
						numObservatories++;
					}
					masterSingleDataArrayLength = numDatas*numObservatories*6;
					for(var w=0;w<masterSingleDataArrayLength;w++){
						var tempHolder = [];
						masterSingleDataArray.push(tempHolder);
						//for example, size 24 array.
					}
					console.log('masterSingleDataArrayLength', masterSingleDataArrayLength);
					console.log('numObservatories', numObservatories);
					console.log('observatories', observatories);
					console.log('masterData', masterData);
					console.log('masterFields', masterFields);
					console.log('masterRadialLength', masterRadialLength);
					console.log('masterTime', masterTime);
					console.log('masterType', masterType);
					console.log('masterDatatempArrayc', masterDatatempArray);
					
					for(var t=0;t<masterType.length;t++){
						for(var u=1;u<masterFields.length;u++){ //PROBLEM: Fix the size for 1st index.
							var para = document.createElement("td");
							var node = document.createTextNode(masterType[t]+" "+masterFields[u]);
							para.appendChild(node);
							var element = document.getElementById("fieldnames");
							element.appendChild(para);
						}
					}
					
					var data = [];
					for(var q=0;q<dataLength;q++){ //10
						for(var s=0;s<masterSingleDataArrayLength;s++){ //24
							var dataAdd = {y:[masterData[q][s]], type: 'line'};
							data.push(dataAdd);
						}
					}
					//Initial Point
					var datapoint = [];
					for(var s=0;s<masterSingleDataArrayLength;s++){ //24
						var datapointAdd = {y:masterData[0][s], type: 'line'};
						datapoint.push(datapointAdd);
						}
					var chartCheck = 0;
					var totalxlength = 500; //display 500 points before sliding
					var indices = []; //24 indices
						for (var w=0;w<masterSingleDataArrayLength;w++){
							indices.push(w);
						}
					var multipleTraces = [];
					function getData(r, index) {
						return masterData[r][index];
					}  
					Plotly.plot('chart',datapoint);
					var cnt = 0;
					var paused = false;
					
					document.getElementById("pause").addEventListener("click", pause);
					function pause() {
						console.log('Pause enabled.');
						paused = true;
						}
					
	var interval = 	setInterval(function(){
						multipleTraces = [];
						twodecimalPlaces = [];
						if(cnt<dataLength){ //10 rows
console.log('New row', cnt);
							var table = document.getElementById("traces");
							var row = table.insertRow(table.rows.length-1); //insert row at bottom	
						//}
						console.log('masterSingleDataArrayLength', masterSingleDataArrayLength);
						for(var r=0;r<masterSingleDataArrayLength;r++){//24 times down by column
							//if(cnt<dataLength){
							console.log('getData',getData(cnt,r)); //0..10, 0..24
								multipleTraces.push(getData(cnt,r)); //0..10, 0..24
							//console.log('dataLength', dataLength);//10
							//console.log('multTracestest1', multipleTraces.length);//1..24
							if(cnt<masterSingleDataArrayLength-1){
								if(r==masterSingleDataArrayLength-1){
							//console.log('multTraceestest2', multipleTraces.length);//24
									for(var a=0;a<masterSingleDataArrayLength;a++){
										var cellAdd = row.insertCell(a);
							console.log('multipleTraces', multipleTraces[a]);
								//if(multipleTraces.length<dataLength){
										var toChart = multipleTraces[a];
										cellAdd.innerHTML = (toChart);
								//	}
									}
								}
							}
						}
						}
						
						if(paused == true){
							document.getElementById("pause").innerHTML = "Paused";//Date();
						clearInterval(interval);
						console.log('Paused!');
						}
						
						if(cnt<dataLength){
						Plotly.extendTraces('chart',{y:multipleTraces}, indices);
						}
						cnt++;
						if(cnt>totalxlength){ //displaying 500 points, then slides
							Plotly.relayout('chart', {
								xaxis: {
									range: [cnt-totalxlength, cnt]
								}
						});
						
						
						}
					},200); //update every 200 seconds.
					console.log('finish');
					}
//					//--------------testdata2.json-----------------
//					//------------github testdata.txt--------------
					else if (testType==1){
					//res.setHeader('Access-Control-Allow-Origin', 'https://sscweb.sci.gsfc.nasa.gov/WebServices/REST/json/results/themis2.json.txt');
					console.log('Status Code: ', out.Result.StatusCode);
					console.log('Status Sub Code: ', out.Result.StatusSubCode);
					keys = Object.keys(out.Result.Data[1][0]);
					console.log('keys = ', keys);
					numKeys = keys.length;
					console.log('numKeys = ', numKeys);
					rawvalues = Object.values(out.Result.Data[1][0]);
					console.log('values = ',rawvalues);
					for(var i=0;i<numKeys;i++){
						var currentrawvalue = rawvalues[i];
						var datarawvalue = [];
						if(keys[i]!="Id"){
							datarawvalue = currentrawvalue[currentrawvalue.length-1];
						}
						else{
							datarawvalue = currentrawvalue;
						}
						keysValues.push([keys[i], datarawvalue]);
					}
					console.log('KeysValues', keysValues);
					//console.log('Output: ', out);
					//myList = JSON.parse(out);
					//return res.json();
	//			})
	//			.catch(err => console.error(err));				
			var chartValuesFields = [];
			var sumChartValues = [];
			var chartValues = [];
			var chartValuesIndex = 0;
			console.log('testc');
			var totalxlength = 0;//500;
			var data = [];//[{y:[getData()], type: 'line'}, {y: [getData()],type: 'line'}, {y: [getData()],type: 'line'}];
			var finalKeyValues = [];
			var finalKeyValuesNum = 0;
			console.log('testd', keysValues[3][1][0]);
			for(var q=0;q<numKeys;q++){
				if(typeof keysValues[q][1][0]==='number'){ //must be numeric type
					if(keysValues[q][1].length>totalxlength){
						totalxlength = keysValues[q][1].length;
					}
					finalKeyValuesNum++;
					finalKeyValues.push(keysValues[q]);
					var counting = 0;
					//data array is initial points
					//for(int y=0;y<totalxlength;y++){ //<17 times
						var dataAdd = {y:[keysValues[q][1][0]], type: 'line'};
						data.push(dataAdd);
					//}
					var addToChartValuesFields = keysValues[q][0]; //may be redundant in for loop, only need once
					chartValuesFields.push(addToChartValuesFields);
					var addToChartValues = keysValues[q][1][0];
					chartValues.push(addToChartValues);
					//console.log('addToChartValuesFields', chartValuesFields);
					//console.log('addToChartValues', chartValues);
					
					//var para = document.createElement("td");
					//var node = document.createTextNode(chartValuesFields);
					//para.appendChild(node);
					//var para2 = document.createElement("p");
					//var node2 = document.createTextNode(chartValues);
					//para2.appendChild(node2);

				}
				//if "Coordinates" special case
			}
			chartValuesIndex++;
			chartValuesIndex++;
			for(var a=0;a<chartValuesFields.length;a++){
console.log('chartValuesFields length', chartValuesFields.length, 'chartValuesFields[a]', chartValuesFields[a]);
				var para = document.createElement("td");
				var node = document.createTextNode(chartValuesFields[a]);
				para.appendChild(node);
				sumChartValues.push(chartValuesFields);
				sumChartValues.push(chartValues);
				var element = document.getElementById("fieldnames");
				element.appendChild(para);
			}
			//element.appendChild(para2);
			console.log('sumChartValues initial', sumChartValues);
			
			Plotly.plot('chart', data);
			var cnt=0;
			var dataindex = 0;
			var multipleTraces = [];
			console.log('finalKeyValuesNum', finalKeyValuesNum);
			
			var indices = [];
			for (var w=0;w<finalKeyValuesNum;w++){
				indices.push(w);
			}
			console.log('indices', indices);
			setInterval(function(){
				multipleTraces = []; //clear
				var table = document.getElementById("traces");
				var row = table.insertRow(table.rows.length-1); //insert row at bottom
				for(var r=0;r<finalKeyValuesNum;r++){//<17 times down by column
					multipleTraces.push([getData(r, dataindex)]);
					
					if(r==finalKeyValuesNum-1){
						for(var a=0;a<multipleTraces.length;a++){
							var cellAdd = row.insertCell(a);
							cellAdd.innerHTML = (multipleTraces[a]);
						}
					}
				}
				//console.log('sumChartValues initial', sumChartValues);
				chartValuesIndex++;
				console.log('multpltraces', multipleTraces);
				/*var para1 = document.createElement("p");
				var node3 = document.createTextNode(addToChartValuesFields);
				para1.appendChild(node);
				var node4 = document.createTextNode(addToChartValues);
				para1.appendChild(node4);
				var element = document.getElementById("bottomchart");
				element.appendChild(para1);
				*///console.log('dataindex', dataindex);
				//console.log('multipleTraces',multipleTraces);
				Plotly.extendTraces('chart',{y:multipleTraces},indices)
				//Plotly.extendTraces('chart',{y:[[getData()]]},[0])
				//Plotly.extendTraces('chart',{y:[[getData()]]},[1])
				//Plotly.extendTraces('chart',{y:[[getData()]]},[2])
				dataindex++;
				cnt++;
				if(cnt>totalxlength){
					Plotly.relayout('chart', {
						xaxis: {
							range: [cnt-totalxlength, cnt]
						}
					});
				}
			},200); //update every 200 seconds.
			var keyIndex = 0;
			var valueIndex = 0;
			function getData(r, dataindex){//keyIndex, valueIndex){
				//for(int r=0;r<totalxlength;r++){ //30 times
				return finalKeyValues[r][1][dataindex];
					//var dataAdd = {y:[getData(q, keysValues[q][1][r])], type: 'line'};
					//data.push(dataAdd);
				//}
				//return Math.random();
			}
		}//testType
		})
				.catch(err => console.error(err));	
		//}
		</script>
	</div>
	<div id = "bottomchart">
	<p id="tablechart">Table Chart</p>
	<button id="pause">Stop Graph</button>
	<table style="width:100%" id = "traces">
			<tr id = "fieldnames">
			</tr>
			<tr id = "data">
			</tr>
		</table>
	</div>
	</body>
						
                    </Plot>
                </div>
            </div>
        );
    }
}