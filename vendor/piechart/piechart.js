function renderPie(ctx, myLabels, myData) {
    var colors = renderPie.prototype.stringToColour(myLabels);

    if (!ctx.getAttribute("rendered")) {
        var options = {
            segmentShowStroke: false,
            animateRotate: true,
            animateScale: false,
            tooltipTemplate: "<%= value %>%"
        };

        renderPie.prototype.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: myLabels,
                datasets: [{
                    label: '# value',
                    data: myData,
                    backgroundColor: colors[1],
                    borderColor: colors[0],
                    borderWidth: 1
                }]
            },
            options: options
        });
        ctx.setAttribute("rendered", true);
    } else {
        renderPie.prototype.myChart.data.datasets[0].data = myData;
        renderPie.prototype.myChart.data.datasets[0].backgroundColor = colors[1];
        renderPie.prototype.myChart.data.datasets[0].borderColor = colors[0];
        renderPie.prototype.myChart.data.labels = myLabels;
    }

    renderPie.prototype.myChart.update(); // Calling update now animates the position of March from 90 to 50.


}

renderPie.prototype.stringToColour = function(arr) {
    var colors = [[],[]];

    for (var i = 0; i < arr.length; i += 1) {
        var rgb1 = '';
        var rgb2 = '';
        var hash = (arr[i].charCodeAt(0) * 3 >> 1) + '' + (arr[i].charCodeAt(arr[i].length - 1) * arr[i].length << 1);
        hash += parseInt(hash, 16) + (arr[i], arr[i].charCodeAt(0) >> 1) + (arr[i].charCodeAt(arr[i].length - 1) * arr[i].length * 3 << 1);
        rgb1 = `rgb(${hash.slice(0, 5) & 0xFF},${hash.slice(2, 6) & 0xFF},${hash.slice(5, 8) & 0xFF})`;
        rgb2 = `rgba(${hash.slice(0, 5) & 0xFF},${hash.slice(2, 6) & 0xFF},${hash.slice(5, 8) & 0xFF},0.7)`;

        colors[0].push(rgb1);
        colors[1].push(rgb2);
    }

    return colors;
};

