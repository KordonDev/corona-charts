import Chart from 'chart.js';
import { CountryData } from '../services/util';

export const createChart = (countriesData: CountryData[]) => {
    const canvas = document.getElementById('myChart');
    if (canvas instanceof HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            new Chart(ctx, createConfig(countriesDataToChartData(countriesData)));
        }
    }
}

const countriesDataToChartData = (countriesData: CountryData[]) => {
    return {
        labels: getLabels(countriesData[0]),
        datasets: countriesData.map(country => {
            const color = getRandomColor();
            return {
                label: country.country,
                backgroundColor: color,
                borderColor: color,
                data: country.data.map(day => day.confirmed),
                fill: false,
                hidden: country.country === 'Germany' ? false : true,
            }
        })
    };
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const getLabels = (country: CountryData) => country.data.map(day => `${day.date.getDate()}.${day.date.getMonth()+1}.`)

const createConfig = (data: Chart.ChartData): Chart.ChartConfiguration => ({
    type: 'line',
    data,
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
    }
});
