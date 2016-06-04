import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'canvas',
    classNames: ["pieChars"],
    store: Ember.inject.service(),
    dateStore: Ember.inject.service(),
    name: "pieChars",
    attributeBindings: ['name'],
    didUpdateAttrs() {
        this._super(...arguments);
        this.set("startDate", this.attrs.startDate.value);
        this.set("endDate", this.attrs.endDate.value);
    },
    didRender() {
        var myLabels = [];
        var myData = [];
        var startData = parseInt(this.get("dateStore.startDate").split("-").join(''));
        var endDate = parseInt(this.get("dateStore.endDate").split("-").join(''));

        this.get("store").peekAll("category").forEach((category) => {

            if (category.get("top")) {
                myLabels.push(category.get("name"));
                var filteredMoneyByDates = 0;

                category.get("money").then((money) => {
                    money.forEach((el) => {
                        var elData = parseInt(el.get("createDate").split("-").join(''));

                        if (elData >= startData && elData <= endDate) {
                            filteredMoneyByDates += parseInt(el.get("price")) || 0;
                        }

                    });
                    myData.push(filteredMoneyByDates);
                });
            }
        });

        setTimeout(function() {
            renderPie(document.getElementsByName('pieChars')[0], myLabels, myData);
        }, 0);

    },
    actions: {

    }
});
