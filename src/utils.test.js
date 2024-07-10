const { isValidDecimal } = require("./utils")

describe('utils.js', () =>{
    it('should return true if the number is an integer', () => {
        expect(isValidDecimal(42)).toBe(true)
    })
    
    it('should return true if the number has one decimal place', () => {
        expect(isValidDecimal(6.6)).toBe(true)
    })

    it('should return true if the number has two decimal places', () => {
        expect(isValidDecimal(3.14)).toBe(true)
    })
    
    it('should return false for numbers with more than two decimal places', () => {
        expect(isValidDecimal(1.414)).toBe(false)
        expect(isValidDecimal(57.3915)).toBe(false)
    })
})