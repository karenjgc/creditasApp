import React, { Component } from 'react';

//Style
import './formComponent.scss';

export default class FormComponent extends Component{

    state = {
        cardNumber: '',
        cardName: '',
        cardCvv: '',
        expMonth: '',
        expYear:'',
        cardImg: '',
        cardExpire: ''
    }
    
    showBorder = e => {
        let focusInput = e.type === 'focus' ? e.target.name : '';
        
        this.setState({
            cardImg: focusInput
        }, this.sendData);
    }

    onChange = e => {
        let dataName = e.target.name;
        let dataValue = e.target.value; 

        if(e.target.validity.valid){
            this.setState({
                [dataName]: dataValue
            }, this.sendData);
        }
    }
 
    sendData= () => {
         this.props.evaluateData(this.state);
    }

    render(){
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let years = [19, 20, 21, 22, 23, 24];

        return(
            <div className="formContainer u-paddingT8">                
                <div className="formGroup">
                    <label className="formLabel">Card Number</label>
                    <input
                        name="cardNumber" 
                        pattern="[0-9]*"
                        className="formControl formControl--primary" 
                        onChange={ this.onChange } 
                        onFocus={ this.showBorder }
                        onBlur={ this.showBorder }
                        value={ this.state.cardNumber.substr(0, 16) }
                    />
                </div>
                <div className="formGroup">
                    <label className="formLabel">Card Name</label>
                    <input 
                        name="cardName"
                        className="formControl formControl--primary" 
                        onChange={ this.onChange } 
                        onFocus={ this.showBorder }
                        onBlur={ this.showBorder }
                        value={ this.state.cardName.substr(0, 16) }
                    />
                </div>
                <div className="u-displayFlex">
                    <div className="u-displayFlex u-flexFill u-alignEnd u-marginR1">
                        <div className="formGroup">
                            <label className="formLabel">Expiration Date</label>
                            <select 
                                name="expMonth" 
                                className="formControl formControlArrow formControl--primary" 
                                onChange={ this.onChange }
                                onFocus={ this.showBorder }
                                onBlur={ this.showBorder }
                            >
                                <option value="0">Month</option>
                                {
                                    months.map((val, index) => {
                                        return ( <option value={ val > 9 ? val : ('0' + val)} key={ index }>{ val > 9 ? val : ('0' + val) }</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="formGroup">
                            <select 
                                name="expYear"
                                className="formControl formControl--primary"
                                onChange={ this.onChange }
                                onFocus={ this.showBorder }
                                onBlur={ this.showBorder }
                            >
                                <option value="0">Year</option>
                                {
                                    years.map((val, index) => {
                                        return ( <option value={ '20' + val } key={ index }>{ '20' + val }</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="formLabel">CVV</label>
                        <input 
                            name="cardCvv"
                            pattern="[0-9]*"
                            className="formControl formControl--primary" 
                            onChange={ this.onChange } 
                            onFocus={ this.showBorder }
                            onBlur={ this.showBorder }
                            value={ (this.state.cardCvv.substr(0, 4)) }
                        />
                    </div>
                </div>
                <button className="button button--primary u-width100">Submit</button>
            </div>
        );
    }
}