import { Calculator, PriceCalculator } from "../../calculators"

describe('Price calculators unit test cases',()=>{
    it('should return 0.25 for input 0.5',()=>{
        const priceCalculator:Calculator = new PriceCalculator(2);
        expect(priceCalculator.calculate(0.5)).toStrictEqual("0.25")
    })
    it('should return 0.17 for input 0.33, there by rounding off at 2 decimal places.',()=>{
        const priceCalculator:Calculator = new PriceCalculator(2);
        expect(priceCalculator.calculate(0.33)).toStrictEqual("0.17")
    })
})