import { fetchCsvs } from './services/github.service';
import { csvToJson, CountryData } from './services/util';

import { createChart } from './component/chart';


const confirmedDataMapper = (data: CountryData[]) => data.map(day => day.confirmed)
const recoveredDataMapper = (data: CountryData[]) => data.map(day => day.recovered)
const deathsDataMapper = (data: CountryData[]) => data.map(day => day.deaths)

const confirmedRelativeDataMapper = (data: CountryData[]) => confirmedDataMapper(data).map(toRelativeData);
const recoveredRelativeDataMapper = (data: CountryData[]) => recoveredDataMapper(data).map(toRelativeData);
const deathsRelativeDataMapper = (data: CountryData[]) => deathsDataMapper(data).map(toRelativeData);

const toRelativeData = (currentCases: number, index: number, cases: number[]) => {
    if (index === 0 || cases[index - 1] === 0) return 0;
    return Math.round(currentCases / cases[index - 1] * 1000)/1000;
};

fetchCsvs()
    .then(({ confirmedCsv, recoveredCsv, deathsCsv }) => csvToJson(confirmedCsv, recoveredCsv, deathsCsv))
    .then(countriesData => {
        const top20ConfirmedCountries = countriesData
            .sort((country1, country2) => country1.data[country1.data.length - 1].confirmed - country2.data[country2.data.length - 1].confirmed)
            .slice(-20)

        createChart('Confirmed Cases', top20ConfirmedCountries, confirmedDataMapper, document.getElementById('absolute-confirmed'));
        createChart('Recovered Cases', top20ConfirmedCountries, recoveredDataMapper, document.getElementById('absolute-recovered'));
        createChart('Absolute Cases', top20ConfirmedCountries, deathsDataMapper, document.getElementById('absolute-deaths'));

        createChart('Confirmed Relative Changed', top20ConfirmedCountries, confirmedRelativeDataMapper, document.getElementById('change-rate-confirmed'));
        createChart('Recovered Relative Changed', top20ConfirmedCountries, recoveredRelativeDataMapper, document.getElementById('change-rate-recovered'));
        createChart('Deaths Relative Changed', top20ConfirmedCountries, deathsRelativeDataMapper, document.getElementById('change-rate-deaths'));
    });
