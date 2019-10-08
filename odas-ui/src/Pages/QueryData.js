import React from 'react';

import ReportCard from "../Components/ReportCard";
// Stylesheets
import'../Layout/QueryData.css'
import {Button, Form, FormCheck} from "react-bootstrap";

export default class QueryData extends React.Component {
// TODO Implement the checkbox selections
    render() {
        return(
              <div className={"query-container"}>
                  <div className={"sidebar"}>
                      <div className={"sidebar-title"}>
                          <span>Query Data</span>
                      </div>
                      <div>
                          <div className={"sidebar-info"}>
                            <span>Select data to be reported</span>
                          </div>
                          <div>
                              <Form className={"checkbox-container"}>
                                  <FormCheck custom label={"Stuff"}/>
                                  <FormCheck custom label={"Stuff"}/>
                                  <FormCheck custom label={"Stuff"}/>
                                  <FormCheck custom label={"Stuff"}/>
                                  <FormCheck custom label={"Stuff"}/>
                                  <FormCheck custom label={"Stuff"}/>
                              </Form>
                          </div>
                          <div className={"gen-button-container"}>
                              <Button variant={"info"} className={"gen-button"}>
                                  Generate Report
                              </Button>
                          </div>
                      </div>
                 </div>
                  <div className={"card-container"}>
                    <ReportCard/>
                  </div>
              </div>

        );
    }
}