import React, {Component} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {ADDRESS} from "../constants";
/**
 *  @author : Ayush Jaiswal
 *  @Date : 18/12/2019
 */

class RegisterVoter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "Ayush",
            lastName: "Jaiswal",
            mobileNumber: "9515365125",
            cardNumber: "951545211236",
            username : "ayush123",
            password: "",
            isRegistered : false
        }
    }

    render() {
        if(this.state.isRegistered === true){
            // return <Home/>;
            return <Redirect to='/'/>;
        }
        return (
            <div>
                <form onSubmit={this.handleRegisterVoter}>

                    First Name : <input type="text"
                                        name="firstName"
                                        onChange={this.changeStateValues}
                                        placeholder={this.state.firstName}
                                        required/> <br/> <br/>

                    Last Name : <input type="text"
                                       name="lastName"
                                       onChange={this.changeStateValues}
                                       placeholder={this.state.lastName}
                                       required /> <br/> <br/>

                    Mobile Number : <input type="number"
                                           name="mobileNumber"
                                           onChange={this.changeStateValues}
                                           placeholder={this.state.mobileNumber}
                                           required /> <br/> <br/>

                    Aadhar Card Number : <input type="text"
                                                name="cardNumber"
                                                onChange={this.changeStateValues}
                                                placeholder={this.state.cardNumber}
                                                required /><br/> <br/>

                    Username : <input type="text"
                                      name="username"
                                      onChange={this.changeStateValues}
                                      placeholder={this.state.username}
                                      required /><br/> <br/>

                    Password : <input type="password"
                                      name="password"
                                      onChange={this.changeStateValues}
                                      placeholder={this.state.password}
                                      required /> <br/> <br/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

    handleRegisterVoter = async (event) => {

        event.preventDefault();

        if( validateName(event.target.firstName.value) === false){
            alert("First Name of Register Voter is not compatible");
            return;
        }

        if(validateName(event.target.lastName.value) === false){
            alert("Last Name of Register Voter is not compatible");
            return;
        }

        if(validateMobilNo(event.target.mobileNumber.value) === false){
            alert("Mobile Number is Invalid");
            return;
        }

        let response = await axios.post(ADDRESS+`registerVoter`,this.state);
        if(response.data === 'Correct'){
            alert("Voter Successfully Registered");
            this.setState({
                isRegistered : true
            });
        }
        console.log(response.data);
    };

    changeStateValues = (event) => {
        this.setState( { [event.target.name] : event.target.value});
    };
}

function validateName(name){

    let valid = true;
    console.log(name);

    for(let i=0;i<name.length;i++){
        console.log(name.length);
        if( !(name[i] >= 'a' && name[i] <= 'z') && !(name[i] >= 'A' && name[i] <= 'Z') ) {
            valid = false;
            break;
        }
    }
    console.log(valid);
    return valid;
}

function validateMobilNo(number) {
    let valid = true;
    if(number.length !== 10)
        valid = false;
    if( !(number[0] === '9' || number[0] === '8' || number[0] === '7' || number[0] === '6'))
        valid = false;
    return valid;
}

export default RegisterVoter;
