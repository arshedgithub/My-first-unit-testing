const lib = require('../lib')
const db = require('../db')

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return a 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Name');
        expect(result).toMatch(/Name/);
    })
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']))
    });
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1)
        expect(result).toMatchObject({id:1 , price: 10})
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const args = [ null, undefined, NaN, '', 0, false ];
        args.forEach(a => {
            expect(() => lib.registerUser(a)).toThrow();
        });
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function (customerId) {
            console.log('fake reading customer...');
            return {id: customerId, points: 20}
        }
        
        const order = {customerId: 1, totalPrice: 10}
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9)
    });
});