import { fetchCsvs } from './services/github.service';
import { csvToJson } from './services/util';

import { createChart } from './component/chart';

fetchCsvs()
    .then(({ confirmedCsv, recoveredCsv, deathsCsv }) => csvToJson(confirmedCsv, recoveredCsv, deathsCsv))
    .then(countriesData => {
        console.log(countriesData.find(c => c.country === 'Germany'));
        createChart(countriesData);
    });
