import React from 'react';
// Components
import DateTimePicker from "react-datetime-picker";
import Select from "react-select";
// Redux
import { connect } from 'react-redux';
import { selectRecent, selectStartDate, selectEndDate } from "../Actions";
// Stylesheets
import "../Layout/Reports.css";

const recentNumbersOptions = [
    {value: 5000, label: "All"},
    {value: 1, label: 1},
    {value: 5, label: 5},
    {value: 10, label: 10},
    {value: 50, label: 50},
    {value: 100, label: 100},
    {value: 500, label: 500}
];

class ReportHeader extends React.Component {
    render() {
        return (
            <div className={"report-header"}>
                <div className={"report-header-btn"}>
                    <Select
                        className={"recent-selector"}
                        options={recentNumbersOptions}
                        placeholder={"All"}
                        value={this.props.recent}
                        onChange={e => this.props.selectRecent(e)}
                    />
                    <DateTimePicker
                        onChange={e => this.props.selectStartDate(e)}
                        value={this.props.startDate}
                        disableClock
                        className={"datetime-pickers"}
                    />
                    <DateTimePicker
                        onChange={e => this.props.selectEndDate(e)}
                        value={this.props.endDate}
                        disableClock
                        className={"datetime-pickers"}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        recent: state.selectRecent,
        startDate: state.selectStartDate,
        endDate: state.selectEndDate
    };
};

export default connect(mapStateToProps, {
    selectRecent,
    selectStartDate,
    selectEndDate
})(ReportHeader);