export default {
    methods: {
        // Returns css class due the price changes || Gets object, returns string
        setClassByDollarRate(rate) {
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