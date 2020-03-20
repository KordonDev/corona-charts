import Chart from 'chart.js';

// https://developer.github.com/v3/repos/contents/ folder
// /repos/:owner/:repo/contents/:path
// https://api.github.com/repos/octokit/octokit.rb/contents/README.md
// https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports/

// Folder
fetch('https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports')
    .then(response => response.json())
    .then(files => files.filter(file => file.name.endsWith('.csv')).map(file => file.download_url))
    .then(urls => urls[0])
    .then(u => fetchData(u))

// data ('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-17-2020.csv')
const fetchData = (url) => fetch(url).then(res => res.text())

// http://techslides.com/convert-csv-to-json-in-javascript
const convertCsvToJson = (csv) => {
    return csv;
}

const sampleData = {
    Germany: [
        {
            date: new Date('2020-03-19T18:53:02'),
            confirmed: 15000,
            deaths: 40,
            recovered: 90,
        },
        {
            date: new Date('2020-03-18T18:53:02'),
            confirmed: 11000,
            deaths: 30,
            recovered: 70,
        }, {
            date: new Date('2020-03-17T18:53:02'),
            confirmed: 9257,
            deaths: 24,
            recovered: 67,
        }, {
            date: new Date('2020-03-16T20:13:11'),
            confirmed: 7272,
            deaths: 17,
            recovered: 67,
        }
    ].sort((day1, day2) => day1.date.getTime() - day2.date.getTime())
};

const labels = sampleData.Germany.map(day => `${day.date.getDate()}.${day.date.getMonth()+1}.`);
const data = sampleData.Germany.map(day => day.confirmed);
const ctx = document.getElementById('myChart').getContext('2d');

const newData = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: 'red',
        borderColor: 'red',
        data: data,
        fill: false,
        hidden: false,
    }]
}

var config = {
    type: 'line',
    data: newData,
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            x: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            },
            y: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }
        }
    }
};
new Chart(ctx, config);
