import React from 'react';
import Plot from 'react-plotly.js';
//Stylesheets
import "../Layout/Reports.css"
// TODO Bootstrap modals for the logs

const ReportCard = () => {
    return (
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
                    layout={ {width: 'autosize', height: 300, title: 'A Fancy Plot'} }
                />
            </div>
        </div>
    );
};

export default ReportCard;