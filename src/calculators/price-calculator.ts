import { Calculator } from ".";
import {Big} from 'big.js'
export class PriceCalculator implements Calculator{
    roundAt:number;
    constructor(roundAt:number){
        this.roundAt = roundAt
    }
    calculate(price:number):string{
        let calculatedPrice  = this.calculateSingleTripPrice(price);
        let calculatedPriceInString = this.roundOff(calculatedPrice);
        return calculatedPriceInString;
    }
    private calculateSingleTripPrice(roundTripPrice:number){
        return roundTripPrice/2;
    }
    private roundOff(priceToBeRoundedOff:number):string{
        const bigNumber = new Big(priceToBeRoundedOff);
        return bigNumber.round(this.roundAt).toString();
    }
}