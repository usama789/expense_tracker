import React, { Component } from 'react'
import Login from './forms/login';
import Register from './forms/Register';
import fire from '../config/Fire';
import Tracker from './Tracker/Tracker';
import Spinner from '../assets/loader.gif';
import './main.css';
export class Main extends Component {
    state = {
        user:1,
        loading:true,
        formSwitcher:false
    }
    formSwitcher= (action)=>{
        console.log(action);
        this.setState({
            formSwitcher: action === 'register' ? true : false
        });
    }
    componentDidMount(){
        this.authListener();
    }
    authListener(){
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({user});
            }
            else{
                this.setState({user:null});
            }
        });
    }
    render() {
        const form = !this.state.formSwitcher ? <Login /> : <Register />
        if(this.state.user === 1){
            return(
                <div className="mainBlock">
                        <div className="Spinner">
                                <img  alt="spinner" src={Spinner} className="ImgSpinner"/>
                        </div>
                </div>
            )
        }
        return (
            <>
                    {!this.state.user ? (
                    
                    <div className = "mainBlock">
                    {form}
                        {!this.state.formSwitcher ? (
                            <span className="underline">
                            Not registered? <button onClick={()=> this.formSwitcher(!this.state.formSwitcher ? 'register': 'login')} className="linkBtn">Create an account!</button>

                        </span>
                        ):
                        <span className="underline">
                        Have an account? <button onClick={()=> this.formSwitcher(!this.state.formSwitcher ? 'register': 'login')} className="linkBtn">Sign in here</button>

                    </span>
                            
                            
                        }   
                    </div>
                    ): (<Tracker />)
                }
            </>
        )
    }
}

export default Main
