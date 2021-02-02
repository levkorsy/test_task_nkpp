export default {
    methods: {
        setClassByDollarRate(rate) {
            if(rate.current > rate.previous){
                return 'price-up'
            } else if(rate.current < rate.previous){
                return 'price-down'
            } else {
                return ''
            }
        }
    }
};