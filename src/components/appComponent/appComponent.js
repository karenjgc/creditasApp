import React, { Component } from 'react';

//Styles
import '../../index.scss';
import '../../assets/styles/utilities.scss'; 
import '../appComponent/appComponent.scss';

//Components
import FormComponent from '../formComponent/formComponent.js';
import CardComponent from '../cardComponent/cardComponent';

export default class App extends Component{

	state = {
		cardNumber: '',
		cardName: '',
		expMonth: '',
		expYear: '',
		cardCvv: '',
		cardImg: '',
		inputFocus: 0,
	};

	getLogoImg = () => {
		let img = '';

		if(this.state.cardNumber.match(/^[4].*$/g)){
            img = 'visa.svg';
        }else if(this.state.cardNumber.match(/^[5][1-5].*$/g)){
			img = 'masterCard.svg';
        }else if(this.state.cardNumber.match(/^[3].*$/g)){
			img = 'americanExpress.svg';
        }else{
			img = 'discover.svg';
		}
		
		return img;
	}

	evaluateData = (data) => {
		this.setState({
			cardNumber: data.cardNumber,
			cardName: data.cardName,
			expMonth: data.expMonth,
			expYear: data.expYear,
			cardCvv: data.cardCvv,
			cardImg: data.cardImg
		})
	}

	render(){
		return(
			<div className="centerContainer">
				<div className="u-paddingT7">
					<CardComponent cardData={ this.state }/>
					<FormComponent evaluateData = { this.evaluateData }/>
				</div>
			</div>
		)
	}
}