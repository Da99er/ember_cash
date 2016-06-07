import Ember from 'ember';

export default Ember.Service.extend({
    nowDate:moment(new Date()).format("YYYY-MM-DD"),
    startDate:moment(new Date()).format("YYYY-MM-DD"),
    endDate:moment(new Date()).format("YYYY-MM-DD"),
    startRender:0 //value for send to pie chart component start command to render
});
