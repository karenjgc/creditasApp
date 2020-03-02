import React, { Component } from 'react';

//Images
import chipCard from '../../assets/img/chipCard.png';
import visa from '../../assets/img/visa.svg';
import masterCard from '../../assets/img/masterCard.svg';
import americanExpress from '../../assets/img/americanExpress.svg';
import discover from '../../assets/img/discover.svg';

//Style
import './cardComponent.scss';

export default class CardComponent extends Component{

    evaluateCardNumber = () => {
        let digitsArray = [];
        let digitAmount =  this.props.cardData.cardNumber.match(/^[3].*$/g) ? 15 : 16;
        let cardNumber = this.props.cardData.cardNumber.substr(0, digitAmount);
       
        for(let i = 0; i < digitAmount; i++){
            digitsArray.push('#');
        }

        for(let i = 0; i < cardNumber.length; i++){
            if(i >= 4 && i <= (digitAmount === 15 ? 9 : 11)){
                digitsArray[i] = '*';
            }else{
                digitsArray[i] = cardNumber.split("")[i];
            }
        }

        if(digitAmount === 15){
            cardNumber = digitsArray.join('').replace(/(.{4})(.{6})/g, "$1  $2  ");
        }else{
            cardNumber = digitsArray.join('').replace(/(.{4})/g, "$1  ");
        }

        return cardNumber;
    }


    render(){
        let cardData = this.props.cardData;
        let logoCard;

        if(cardData.cardNumber.match(/^[4].*$/g)){
            logoCard = visa;
        }else if(cardData.cardNumber.match(/^[5][1-5].*$/g)){
            logoCard = masterCard;
        }else if(cardData.cardNumber.match(/^[3].*$/g)){
            logoCard = americanExpress;
        }else{
            logoCard = discover;
        }

        return(
            <div>
                <div className="flipContainer">
                    <div className={'flipCard' + (cardData.cardImg === 'cardCvv' ? ' flippedCard' : '')}>

                        {/*Front Card*/}
                        <div className="cardFace frontCardFace">
                            <div className="cardHeader">
                                <img className="u-height2" src={ chipCard } alt="chipCard"/>
                                <img className="u-height3" src={ logoCard } alt="logoCard"/>
                            </div>
                            <div className="cardBody">
                                <div className="formGroup">
                                    <input 
                                        name="cardNumber"
                                        type="text" 
                                        className={'formControl formControl--transparent u-fontSize20' + (cardData.cardImg === 'cardNumber' ? ' u-borderWhite' : '') }
                                        value={ (cardData.cardNumber === '' ? '####  ####  ####  ####' : this.evaluateCardNumber() ) } 
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="cardFooter">
                                <div className="u-displayFlex">
                                    <div className={'formGroup u-flexFill u-marginR1' + (cardData.cardImg === 'cardName' ? ' u-borderWhite' : '')}>
                                        <label className="formLabel u-opacity80">Card Holder</label>
                                        <input 
                                            type="text" 
                                            className="formControl formControl--transparent u-padding0" 
                                            value={ cardData.cardName === '' ? 'AD SOYAD' : cardData.cardName.toUpperCase().substr(0, 16) } 
                                            readOnly
                                        />
                                    </div>
                                    <div className={'formGroup' + (cardData.cardImg === 'expMonth' || cardData.cardImg === 'expYear' ? ' u-borderWhite' : '')} >
                                        <label className="formLabel u-opacity80">Expires</label>
                                        <input 
                                            type="text" 
                                            className="formControl formControl--transparent u-padding0" 
                                            value={ (cardData.expMonth === '' || cardData.expMonth == 0 ? 'MM' : cardData.expMonth) + '/' + (cardData.expYear === '' || cardData.expYear == 0 ? 'YYYY' : cardData.expYear) }
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/*Back Card*/}
                        <div className="cardFace backCardFace">
                            <div className="cardHeader u-paddingL0 u-paddingR0">
                                <div className="cardBand"></div>
                            </div>
                            <div className="cardBody">
                                <div className="formGroup">
                                    <label className="formLabel u-textRight">CVV</label>
                                    <input 
                                        name="cardNumber"
                                        type="text" 
                                        className={'formControl formControl--primary u-colorBlack u-textRight' + (cardData.cardImg === 'cardNumber' ? ' u-borderWhite' : '') }
                                        value={ cardData.cardCvv.substr(0, 4).replace(/[0-9]/g, '*')} 
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="cardFooter u-textRight">
                                <img className="u-height3" src={ logoCard } alt="logoCard"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}