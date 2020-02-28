import React, {Component} from 'react';
import axios from 'axios';
import {ADDRESS} from "../constants";
import {Modal, Button, Accordion, DropdownButton} from "react-bootstrap";
import VoterDetails from "./VoterDetails";
import "./AdminPage.css";
import {Input} from "semantic-ui-react";

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingVoters: [],
            selectedVoter: 0,
            isDisplayActive: false,
        };
    }

    componentDidMount = async () => {
        let response = await axios.get(ADDRESS + `fetchPendingVoters`);
        this.setState({
            pendingVoters: response.data.map((item) => {
                return item.Record
            }),
        });
        this.setState({
            pendingVoters: this.state.pendingVoters.splice(0, this.state.pendingVoters.length - 1),
        });
        console.log(this.state.pendingVoters);
    };

    render() {
        let divStyleOuter = {
            width: "60%",
            height: "60%",
            marginLeft: "20%",
            marginRight: "20%",
            marginTop: "2%",
            marginBottom: "2%",
            textAlign: "center",
            backgroundColor: "rgb(220,220,220)"
        };
        let displayDiv = {
            display: (this.state.pendingVoters.length === 0) ? "None" : "Block",
        };
        let displayNone = {
            display: (this.state.pendingVoters.length !== 0) ? "None" : "Block",
        };

        return (
            <>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: "6%",
                    marginTop: "2%",
                }}> Welcome to the admin Page.. </h1>
                <div style={{...divStyleOuter,"backgroundColor":"none"}}>
                    <Accordion>
                        <Accordion.Toggle as={ DropdownButton } variant="primary" eventKey="0" title="Add Election Dates">

                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <div style={{backgroundColor: "rgb(220,220,220)"}}>
                                <label style={{
                                    textAlign:"center",
                                }}>Constituency: </label>
                                <Input type={"text"}/>
                            </div>
                        </Accordion.Collapse>
                    </Accordion>
                </div>

                <Modal show={this.state.isDisplayActive} onHide={() => this.setState({isDisplayActive: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title> Voter Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VoterDetails voterDetails={this.state.pendingVoters[this.state.voterSelected]}
                                      closeVoterDetails={() => this.setState({isDisplayActive: false})}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({isDisplayActive: false})}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <div style={divStyleOuter}>
                    <div style={displayDiv}>
                        <table className="table table-hover">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">UserName</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.pendingVoters.map((item, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td align={"center"}
                                                    onClick={() => this.setState({
                                                        voterSelected: index,
                                                        isDisplayActive: true,
                                                    })}
                                                    className="username"
                                                >
                                                    {item.username}
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div style={displayNone}>
                        <h1> No Pending Voters </h1>
                    </div>
                </div>
            </>
        );
    }
}

export default AdminPage;
