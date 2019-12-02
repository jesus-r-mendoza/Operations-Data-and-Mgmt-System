import React from 'react';
// Components
import DateTimePicker from "react-datetime-picker";
// Redux
import { connect } from 'react-redux';
import { selectRecent, selectStartDate, selectEndDate } from "../Actions";
import {Col, Container, Row} from "react-bootstrap";
// import NumberPicker from "react-number-picker";

class ReportHeader extends React.Component {

    handleRecentNumber = e => {
        console.log(e);
        this.props.selectRecent(e);
    };

    render() {
        return (
            <div className={"report-header"}>
                <Container className={"report-header-btn"}>
                    <Row>
                        <Col>
                            {/*Back arrow*/}
                        </Col>
                        <Col>
                            {/*<NumberPicker*/}
                            {/*    value={this.props.recent}*/}
                            {/*    onChange={this.handleRecentNumber.bind(this)}*/}
                            {/*/>*/}
                        </Col>
                        <Col>
                            <DateTimePicker
                                onChange={e => this.props.selectStartDate(e)}
                                value={this.props.startDate}
                                disableClock
                                className={"datetime-pickers"}
                            />
                        </Col>
                        <Col>
                            <DateTimePicker
                                onChange={e => this.props.selectEndDate(e)}
                                value={this.props.endDate}
                                disableClock
                                className={"datetime-pickers"}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        recent: state.selectRecent,
        startDate: state.selectDate,
        endDate: state.selectDate
    };
};

export default connect(mapStateToProps, { selectRecent, selectStartDate, selectEndDate })(ReportHeader)