
export interface Country {
	country: string;
	color: string;
	data: CountryData[]
}

export interface CountryData {
	date: Date;
	confirmed: number;
	deaths: number;
	recovered: number;
}

// http://techslides.com/convert-csv-to-json-in-javascript
export function csvToJson(confirmedCSV: string, recoveredCSV: string, deathsCSV: string) {
	const result: Country[] = [];
	const confirmedLines = confirmedCSV.split('\n');
	const recoveredLines = recoveredCSV.split('\n');
	const deathsLines = deathsCSV.split('\n');
	const headlines = confirmedLines[0].split(',')

	// Province/State	Country/Region	Lat	Long	1/22/20	1/23/20	1/24/20	1/25/20
	for(let i = 1; i < confirmedLines.length; i++){
		const confirmedCurrentLine = confirmedLines[i].split(',');
		const recoveredCurrentLine = recoveredLines[i].split(',');
		const deathsCurrentLine = deathsLines[i].split(',');
		const countryData: Country = {
			country: confirmedCurrentLine[0] ? `${confirmedCurrentLine[1]} - ${confirmedCurrentLine[0]}` : confirmedCurrentLine[1],
			color: getRandomColor(),
			data: []
		};

		for (let column = 4; column < confirmedCurrentLine.length; column++) {
			countryData.data.push({
				date: new Date(headlines[column]),
				confirmed: parseInt(confirmedCurrentLine[column]),
				recovered: parseInt(recoveredCurrentLine[column]),
				deaths: parseInt(deathsCurrentLine[column])
			});
		}

		result.push(countryData);
	}
	return result;
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
