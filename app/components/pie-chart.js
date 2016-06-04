import Ember from 'ember';

function renderPie(dom, myLabels, myData) {
    var colors = [];

    var data = {
        labels: myLabels,
        datasets: [{
            data: myData,
            backgroundColor: colors
        }]
    };

    var ctx = dom;

    if (ctx.getAttribute("rendered")) {
        console.log("deleted");
        myChart.clear();
        myChart.destroy();

    }
    ctx.setAttribute("rendered", true);

    myChart = new Chart(ctx, {
        type: 'pie',
        data: data
    });
}

function stringToColour(str) {
    // str to hash
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    // int/hash to hex
    for (var i = 0, colour = "#"; i < 3; colour += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));
    return colour;
}

export default Ember.Component.extend({
    tagName: 'canvas',
    classNames: ["pieChars"],
    dateStore: Ember.inject.service(),
    name: "pieChars",
    attributeBindings: ['name'],
    didUpdateAttrs() {
        this._super(...arguments);
        this.set("startDate", this.attrs.startDate.value);
        this.set("endDate", this.attrs.endDate.value);
        this.set("categoriesLength", this.attrs.categoriesLength.value);
        this.set("moneyLength", this.attrs.moneyLength.value);
        console.log("chart update", this.get("startDate"));
    },
    didRender() {
        var modelThis = this;
        console.log("pie after");
        if (!this.get("render")) {
            this.set("render", true);
            var myLabels = [];
            var myData = [];
            var startData = parseInt(modelThis.get("dateStore.startDate").split("-").join(''));
            var endDate = parseInt(modelThis.get("dateStore.endDate").split("-").join(''));

            //console.log("modelThis",modelThis.get("store").peekAll("category"));
            /*modelThis.get("store").peekAll("category").forEach((category, index) => {
                if (category.get("top")) {
                    myLabels.push(category.get("name"));

                    //category.forEach()
  



                    console.log("pie chart index",index);
                }
            });*/

            console.log(myLabels,myData);

            setTimeout(function(modelThis) {

                //renderPie(document.getElementsByName("pieChars")[0], myLabels, myData);
            }, 10, this);
        }
    },
    actions: {

    }
});
