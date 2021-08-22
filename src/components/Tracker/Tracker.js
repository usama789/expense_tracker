import React, { Component } from 'react'
import fire from '../../config/Fire';
import './Tracker.css'
import Transaction from '../../Transaction/Transaction';
export class Tracker extends Component {


    state={
        transactions:[],
        money:0,

        transactionName: '',
        transactionType: '',
        price:'',
        currentUID: fire.auth().currentUser.uid
    }
    logout=()=>{
        fire.auth().signOut();
    }
    handleChange = input => e =>{
        this.setState({
            [input]: e.target.value !=="0" ? e.target.value: ""
        })
    }
    addTransaction =()=>{
            const {
                transactionName,
                transactionType,
                price,
                money,
                currentUID
            }=this.state;
            //validation
            if(transactionName && transactionType && price){
                const backupState = this.state.transactions;
                backupState.push({    ///push will create a random node 
                    id: backupState.length + 1,
                    name: transactionName,
                    type: transactionType,
                    price: price
                });
                fire.database().ref('Transaction/'+ currentUID).push({
                    id: backupState.length,
                    name:transactionName,
                    type:transactionType,
                    price:price,
                    user_id: currentUID
                }).then((data)=>{
                    console.log("success callback");
                    this.setState({
                        transactions: backupState,
                        money: transactionType === 'deposit' ? money + parseFloat(price) : money - parseFloat(price),
                        transactionType: '',
                        transactionName:'',
                        price: ''
                    })
                    }).catch((error)=>{
                        console.log('error',error);
                })
            }
    }
    render() {
        var currentUser= fire.auth().currentUser;
        return (
            <div className="trackerBlock">
                    <div className="welcome">
                            <span>Hi, {currentUser.displayName}!</span>
                            <button onClick={this.logout} className="logout">Logout</button>
                    </div>
                    <div className="totalMoney">${this.state.money}</div>
                    <div className="transactionBlock">
                        <div className="newTransaction">
                            <form>
                                <input 
                                name="transactionName"
                                placeholder="Transaction Name"
                                type="text"
                                value={this.state.transactionName}
                                onChange={this.handleChange('transactionName')}
                                />
                                <div className="inputGroup">
                                    <select name="type"
                                     value={this.state.transactionType}
                                     onChange={this.handleChange('transactionType')}
                                    >
                                        <option value="0">Type</option>
                                        <option value="expense">Expense</option>
                                        <option value="deposit">Deposit</option>

                                    </select>
                                    <input 
                                        value={this.state.price}
                                        onChange={this.handleChange('price')}
                                        name="price"
                                        placeholder="Price"
                                        type="text"
                                />
                                </div>
                                
                                
                            </form>
                            <button className="addTransaction" onClick={this.addTransaction}>
                                        + Add Transaction
                                </button>

                        </div>

                    </div>
                    <div className="latestTransaction">
                            <p>Latest Transaction</p>
                                <ul>
                                   {
                                       Object.keys(this.state.transactions).map((id)=>(
                                           <Transaction 
                                            type={this.state.transactions[id].type}
                                            name={this.state.transactions[id].name}
                                            price={this.state.transactions[id].price}
                                           
                                           />
                                       ))
                                   }
                                </ul>
                    </div>
                
            </div>
        )
    }
}

export default Tracker
