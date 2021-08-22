import React, { Component } from 'react'
import fire from '../../config/Fire';
import './login.css'
export class Register extends Component {

    state={
        email: '',
        password:'',
        displayName: '',
        fireError:''
    }

    handleChange = e =>{
            this.setState({
                    [e.target.name]: e.target.value
            });
    }
    register = e =>{
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((user)=>{
            var currentUser = fire.auth().currentUser;
            currentUser.updateProfile({
                displayName: this.state.displayName
            })
        }).catch((error)=>{
            this.setState({fireError:error.message});
        });


    }

    render() {
        let errorNotification = this.state.fireError ? 
        (<div className="Error">
            {this.state.fireError}
        </div>) : null
        return (
            <>
                {errorNotification}
                <form>
                        <input type="text" className="regField" placeholder="Your name" name="displayName" 
                        onChange={this.handleChange}
                        value={this.state.displayName}
                        /> 
                        <input type="text" className="regField" placeholder="Email" name="email" 
                          onChange={this.handleChange}
                          value={this.state.email}
                        />
                        <input type="password" className="regField" placeholder="Password" name="password" 
                          onChange={this.handleChange}
                          value={this.state.password}
                        />
                        <input onClick={this.register} type="submit" className="submitBtn" value="Register"/>

                </form>
            </>
        )
    }
}

export default Register
