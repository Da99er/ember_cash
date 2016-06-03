import Ember from 'ember';

export function totalCost(params) {
    var summ = 0;
    params[0].forEach((el) => {
        summ += parseInt(el.get("price"));
    });
    return summ;
}

export default Ember.Helper.helper(totalCost);
