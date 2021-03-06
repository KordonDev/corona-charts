import { fetchCsvs } from './services/github.service';
import { csvToJson, CountryData } from './services/util';

import { createChart } from './component/chart';


const confirmedDataMapper = (data: CountryData[]) => data.map(day => day.confirmed)
const deathsDataMapper = (data: CountryData[]) => data.map(day => day.deaths)

const confirmedRelativeDataMapper = (data: CountryData[]) => confirmedDataMapper(data).map(toRelativeData);
const deathsRelativeDataMapper = (data: CountryData[]) => deathsDataMapper(data).map(toRelativeData);

const activeDataMapper = (data: CountryData[]) => data.map((day: CountryData) => day.confirmed - day.recovered);

const newCasesDataMapper = (data: CountryData[]) => confirmedDataMapper(data).map(toNewCases);

const toNewCases = (currentCases: number, index: number, cases: number[]) => {
    if (index === 0 || cases[index - 1] === 0) return 0;
    return currentCases - cases[index - 1];
}
const toRelativeData = (currentCases: number, index: number, cases: number[]) => {
    if (index === 0 || cases[index - 1] === 0) return 1;
    return Math.round(currentCases / cases[index - 1] * 1000)/1000;
};
const lastInteresstingDate = new Date();
lastInteresstingDate.setMonth(lastInteresstingDate.getMonth() - 2);

fetchCsvs()
    .then(({ confirmedCsv, deathsCsv, recoveredCsv }) => csvToJson(confirmedCsv, deathsCsv, recoveredCsv))
    .then(countriesData => {
        const top20ConfirmedCountries = countriesData
            .map(country => ({
                ...country,
                data: country.data.filter(day => day.date > lastInteresstingDate)
            }))
            .sort((country1, country2) => country1.data[country1.data.length - 1].confirmed - country2.data[country2.data.length - 1].confirmed)
            .slice(-20)

        createChart('Confirmed Cases', top20ConfirmedCountries, confirmedDataMapper, document.getElementById('absolute-confirmed-desktop'));
        createChart('Confirmed Cases', top20ConfirmedCountries, confirmedDataMapper, document.getElementById('absolute-confirmed-mobile'));
        createChart('Deaths Cases', top20ConfirmedCountries, deathsDataMapper, document.getElementById('absolute-deaths-desktop'));
        createChart('Deaths Cases', top20ConfirmedCountries, deathsDataMapper, document.getElementById('absolute-deaths-mobile'));

        createChart('Confirmed Relative Changed', top20ConfirmedCountries, confirmedRelativeDataMapper, document.getElementById('change-rate-confirmed-desktop'));
        createChart('Confirmed Relative Changed', top20ConfirmedCountries, confirmedRelativeDataMapper, document.getElementById('change-rate-confirmed-mobile'));
        createChart('Deaths Relative Changed', top20ConfirmedCountries, deathsRelativeDataMapper, document.getElementById('change-rate-deaths-desktop'));
        createChart('Deaths Relative Changed', top20ConfirmedCountries, deathsRelativeDataMapper, document.getElementById('change-rate-deaths-mobile'));

        createChart('Active Cases', top20ConfirmedCountries, activeDataMapper, document.getElementById('active-cases-desktop'));
        createChart('Active Cases', top20ConfirmedCountries, activeDataMapper, document.getElementById('active-cases-mobile'));

        createChart('New Daily Cases', top20ConfirmedCountries, newCasesDataMapper, document.getElementById('new-daily-cases-desktop'));
        createChart('New Daily Cases', top20ConfirmedCountries, newCasesDataMapper, document.getElementById('new-daily-cases-mobile'));
    });
