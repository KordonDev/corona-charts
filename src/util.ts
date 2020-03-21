
interface CountryData {
	country: string;
	data: {
		date: Date;
		confirmed: number;
		deaths: number;
		recovered: number;
	}[]
}

// http://techslides.com/convert-csv-to-json-in-javascript
export function csvToJson(csv: string) {
	const result: CountryData[] = [];
	const lines = csv.split("\n");

	// Province/State, Country/Region, Last Update, Confirmed, Deaths, Recovered, Latitude, Longitude
	for(let i=1; i<lines.length; i++){
		const currentLine=lines[i].split(",");
		const countryData: CountryData = {
			country: currentLine[0] ? `${currentLine[1]} - ${currentLine[0]}` : currentLine[1],
			data: [{
				date: new Date(currentLine[2]),
				confirmed: parseInt(currentLine[3]),
				deaths: parseInt(currentLine[4]),
				recovered: parseInt(currentLine[5]),
			}]
		};

		result.push(countryData);
	}
	return result;
}

export function covertAllCsvs(csvs: string[]) {
	return csvs
		.map(csv => csvToJson(csv))
		.map(countriesData => {
			countriesData.reduce((allCountries, country) => {
				const sameCountry = allCountries.find(countryData => countryData.country === country.country)
				if (!sameCountry) {
					allCountries.push(country);
					return allCountries;
				}
				// country always has only a single data, because it it read from the csv
				const sameDate = sameCountry.data.find(day => day.date === country.data[0].date);
				if (!sameDate) {
					sameCountry.data.push(...country.data);
					return allCountries;
				}
				return allCountries;
			}, [] as CountryData[]);
		})
}

export const sampleData = {
	country: 'Germany',
	data: [
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
