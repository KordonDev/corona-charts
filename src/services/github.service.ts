
const GLOBAL_CONFIRMED_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
const GLOBAL_DEATHS_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
const GLOBAL_RECOVERED_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';

const fetchCsv = (url: string) => fetch(url).then(res => res.text())

export const fetchCsvs = () => {
    return Promise.all([ GLOBAL_CONFIRMED_URL, GLOBAL_DEATHS_URL, GLOBAL_RECOVERED_URL ].map(url => fetchCsv(url)))
        .then(([ confirmedCsv, deathsCsv, recoveredCsv ]) => ({ confirmedCsv, deathsCsv, recoveredCsv }));
}
