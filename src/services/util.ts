
export interface Country {
	country: string;
	color: string;
	data: CountryData[]
}

export interface CountryData {
	date: Date;
	confirmed: number;
	deaths: number;
}

// http://techslides.com/convert-csv-to-json-in-javascript
export function csvToJson(confirmedCSV: string, deathsCSV: string) {
	const result: Country[] = [];
	const confirmedLines = confirmedCSV.split('\n');
	const deathsLines = deathsCSV.split('\n');
	const headlines = confirmedLines[0].split(',')

	// Province/State	Country/Region	Lat	Long	1/22/20	1/23/20	1/24/20	1/25/20
	for(let i = 1; i < confirmedLines.length; i++){
		const confirmedCurrentLine = confirmedLines[i].split(',');
		const deathsCurrentLine = deathsLines[i].split(',');
		if (confirmedCurrentLine.length < 5) {
			continue;
		}
		const countryData: Country = {
			country: confirmedCurrentLine[1],
			color: getRandomColor(),
			data: []
		};

		for (let column = 4; column < confirmedCurrentLine.length; column++) {
			countryData.data.push({
				date: new Date(headlines[column]),
				confirmed: parseInt(confirmedCurrentLine[column] || '0'),
				deaths: parseInt(deathsCurrentLine[column] || '0')
			});
		}

		result.push(countryData);
	}
	return result.reduce((storedCountries: Country[], currentCountry) => {
		const existingStoredCountry = storedCountries.find((storedCountry => storedCountry.country === currentCountry.country));
		if (existingStoredCountry) {
			return storedCountries.map(country => {
				if (country.country === currentCountry.country) {
					return {
						...country,
						data: country.data.map(day => ({
							...day,
							confirmed: day.confirmed + (currentCountry.data.find(currentCountryDay => currentCountryDay.date === day.date)?.confirmed || 0),
							deaths: day.deaths + (currentCountry.data.find(currentCountryDay => currentCountryDay.date === day.date)?.deaths || 0),
						}))
					}
				}
				return country;
			})
		}
		return [ ...storedCountries, currentCountry ];
	}, []);
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
