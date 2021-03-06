import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import axios from 'axios';

class VoterPage extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem("token");
        let loggedIn = true;
        if(token == null ){
            loggedIn = false;
        }
        this.state = {
            loggedIn
        }
    }

    componentDidMount = async () => {
        console.log(JSON.stringify(this.props.username));
    };

    handleChange = (event) => {
        this.setState({
            loggedIn : false
        });
        localStorage.removeItem("token");
    };

    castVote = async (event) => {

        let voterDetails = {
            username : this.props.username,
            votedTo : "BJP"
        };

        let response = await axios.post(`http://172.30.143.206:4000/castVote` ,voterDetails );
        alert(JSON.stringify(response.data));
    };

    render() {
        if(this.state.loggedIn === false){
            return < Redirect to="/" />;
        }
        return (
            <div>
                <h1> Welcome to Logged in page .. </h1>
                <button onClick={this.castVote} > Cast Vote </button> <br/><br/>
                <Link to="/" onClick={this.handleChange}> Logout </Link>
            </div>
        );
    }
}

export default VoterPage;
