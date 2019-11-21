
import React, { Component } from 'react'
import { Button, Dropdown, Grid, Header } from 'semantic-ui-react'
import axios from "axios";
import LoadSpinner from "./LoadSpinner";


class DropdownExampleRemote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            searchQuery: null,
            value: null,
            satObjects: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        })
    }

    handleChange = (e, { value }) => this.setState({ value });

    fetchOptions = () => {
        this.setState({ isFetching: true });

        axios.get("http://localhost:8000/api/satellites/", {
            headers: {
                'Content-type': "application/json"
            }
        })
            .then(res => {
                setTimeout(() => {
                    this.setState({
                        satObjects: res.data,
                        isFetching: false
                    })
                }, 500)

            })
            .catch(function (err) {
                console.log(err)
            });
    };

    toggleSearch = (e) => this.setState({ search: e.target.checked });

    createSatNameObject(satName, satId) {
        return Object.create(Object.prototype, {
            key: {value: satId},
            text: {value: satName},
            value: {value: satName}
        });
    }

    createSatArray (satName, satId) {
        const nameList = [];
        for(let i = 0; i < satId.length; i++) {
            nameList.push(this.createSatNameObject(satName[i], satId[i]));
        }

        this.setState({
            satObjects: nameList
        });
    }

    render() {
        if (this.state.isLoading) {

            return (
                <LoadSpinner/>
            );
        } else {
        const { multiple, satObjects, isFetching, search, value } = this.state;

        return (
            <Grid>
                <Grid.Column width={8}>
                    <p>
                        <Button onClick={this.fetchOptions}>Fetch</Button>
                        <label>
                            <input
                                type='checkbox'
                                checked={search}
                                onChange={this.toggleSearch}
                            />{' '}
                            Search
                        </label>{' '}
                        <label>
                            <input
                                type='checkbox'
                                checked={multiple}
                                onChange={this.toggleMultiple}
                            />{' '}
                            Multiple
                        </label>
                    </p>
                    <Dropdown
                        fluid
                        selection
                        options={satObjects}
                        value={value}
                        placeholder='Add Users'
                        onChange={this.handleChange}
                        disabled={isFetching}
                        loading={isFetching}
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <Header>State</Header>
                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                </Grid.Column>
            </Grid>
        )
    }}
}

export default DropdownExampleRemote