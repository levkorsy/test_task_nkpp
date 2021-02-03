export default {
    methods: {
        setClassByDollarRate(rate) {        // Returns css class due the price changes || Gets object, returns string
            if (rate.current > rate.previous) {
                return 'price-up'
            } else if (rate.current < rate.previous) {
                return 'price-down'
            } else {
                return ''
            }
        }
    }
};