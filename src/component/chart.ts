import Chart from 'chart.js';
import { CountryData, Country } from '../services/util';

export const createChart = (chartLabel: string, countriesData: Country[], dataType: Exclude<keyof CountryData, 'date'>, element: HTMLElement | null) => {
    if (element instanceof HTMLCanvasElement) {
        const ctx = element.getContext('2d');
        if (ctx) {
            new Chart(ctx, createConfig(chartLabel, countriesDataToChartData(countriesData, dataType)));
        }
    }
}

const countriesDataToChartData = (countriesData: Country[], dataType: Exclude<keyof CountryData, 'date'>) => {
    return {
        labels: getLabels(countriesData[0]),
        datasets: countriesData.map(country => ({
                label: country.country,
                backgroundColor: country.color,
                borderColor: country.color,
                data: country.data.map(day => day[dataType]),
                fill: false,
                hidden: country.country === 'Germany' ? false : true,
        }))
    };
}


const getLabels = (country: Country) => country.data.map(day => `${day.date.getDate()}.${day.date.getMonth()+1}.`)

const createConfig = (chartLabel: string, data: Chart.ChartData): Chart.ChartConfiguration => ({
    type: 'line',
    data,
    options: {
        responsive: true,
        title: {
            display: true,
            text: chartLabel,
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
