import React, { Component } from 'react'
import './login.css';
import fire from '../../config/Fire';
export class Login extends Component {

    state={
        email: '',
        password:'',
        fireError:''
    }
    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
    });
    }
    login = e =>{
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch((error)=>{
            this.setState({fireError:error.message});
        });


    }
    render() {
        let errorNotification = this.state.fireError ? 
        (
            <div className="Error">
                {this.state.fireError}
            </div>
        ): null
        return (
            <>
                {errorNotification}
                <form>
                        <input type="text" className="regField" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                        <input type="password" className="regField" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                        <input onClick={this.login} type="submit" className="submitBtn" value="Login"/>

                </form>
            </>
        )
    }
}

export default Login
