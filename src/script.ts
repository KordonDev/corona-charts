import { fetchCsvs } from './services/github.service';
import { csvToJson } from './services/util';

import { createChart } from './component/chart';

fetchCsvs()
    .then(({ confirmedCsv, recoveredCsv, deathsCsv }) => csvToJson(confirmedCsv, recoveredCsv, deathsCsv))
    .then(countriesData => {
        const top20ConfirmedCountries = countriesData
            .sort((country1, country2) => country1.data[country1.data.length - 1].confirmed - country2.data[country2.data.length - 1].confirmed)
            .slice(-20)

        createChart('Confirmed Cases', top20ConfirmedCountries, 'confirmed', document.getElementById('absolute-confirmed'));
        createChart('Recovered Cases', top20ConfirmedCountries, 'recovered', document.getElementById('absolute-recovered'));
        createChart('Absolute Cases', top20ConfirmedCountries, 'deaths', document.getElementById('absolute-deaths'));
    });
