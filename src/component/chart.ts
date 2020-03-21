import Chart from 'chart.js';
import { CountryData, Country } from '../services/util';

export type DataMapper = (data: CountryData[]) => number[];

export const createChart = (chartLabel: string, countriesData: Country[], dataMapper: DataMapper, element: HTMLElement | null) => {
    if (element instanceof HTMLCanvasElement) {
        const ctx = element.getContext('2d');
        if (ctx) {
            new Chart(ctx, createConfig(chartLabel, countriesDataToChartData(countriesData, dataMapper)));
        }
    }
}

const countriesDataToChartData = (countriesData: Country[], dataMapper: DataMapper) => {
    return {
        labels: getLabels(countriesData[0]),
        datasets: countriesData.map(country => ({
                label: country.country,
                backgroundColor: country.color,
                borderColor: country.color,
                data: dataMapper(country.data),
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
