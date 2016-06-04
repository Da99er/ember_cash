import Ember from 'ember';

function renderPie(ctx, myLabels, myData) {
    var colors = [];

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Red", "Blue"],
            datasets: [{
                label: '# value',
                data: [2, 20],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            segmentShowStroke: false,
            animateRotate: true,
            animateScale: false,
            tooltipTemplate: "<%= value %>%"
        }
    });


    /*myChart.data.datasets[0].data[2] = 50; 
    myChart.data.datasets[0].backgroundColor[2] = 'rgba(154, 162, 35, 1)'; 
    myChart.data.datasets[0].borderColor[2] = 'rgba(54, 62, 35, 1)'; 
	myChart.data.labels[2]="qqq";*/
	
    console.log(myChart.data);
	myChart.update(); // Calling update now animates the position of March from 90 to 50.


}

/*// duration is the time for the animation of the redraw in miliseconds
// lazy is a boolean. if true, the animation can be interupted by other animations
myLineChart.data.datasets[0].data[2] = 50; // Would update the first dataset's value of 'March' to be 50
myLineChart.update(); // Calling update now animates the position of March from 90 to 50.
*/

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
    store: Ember.inject.service(),
    dateStore: Ember.inject.service(),
    name: "pieChars",
    attributeBindings: ['name'],
    didUpdateAttrs() {
        this._super(...arguments);
        this.set("startDate", this.attrs.startDate.value);
        this.set("endDate", this.attrs.endDate.value);
        this.set("startRender", this.attrs.startRender.value);
        console.log("chart update", this.get("startDate"));
    },
    didRender() {
        console.log("pie after");

        var myLabels = [];
        var myData = [];
        var startData = parseInt(this.get("dateStore.startDate").split("-").join(''));
        var endDate = parseInt(this.get("dateStore.endDate").split("-").join(''));

        this.get("store").peekAll("category").forEach((category, index) => {

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
            console.log(myLabels, myData);
            renderPie(document.getElementsByName('pieChars')[0], myLabels, myData);
        }, 0);

    },
    actions: {

    }
});
