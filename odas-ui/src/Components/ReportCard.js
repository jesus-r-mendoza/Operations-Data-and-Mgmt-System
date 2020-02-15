import React from 'react';
import Plot from 'react-plotly.js';
//Stylesheets
import "../Layout/Reports.css"

const ReportCard = () => {
    return (
        <div className={"card-container"}>
            <div className={"card"}>
                <div className={"graph-report"}>
                    <Plot
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
                        layout={ {width: 500, height: 350, title: 'A Fancy Plot'} }
                    />
                </div>
            </div>
        </div>
    );
};

export default ReportCard;