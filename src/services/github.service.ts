
interface GitHubFileDescription {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    _links: {
        self: string;
        git: string;
        html: string;
    }
}

const csvOrder = [ 'confirmed', 'deaths' ];
const getCsvOrderIndex = (url: string) => csvOrder.findIndex(name => url.toLowerCase().includes(name));
const fetchCsv = (url: string) => fetch(url).then(res => res.text())

// Folder
export const fetchCsvs = () => fetch('https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_time_series')
    .then(response => response.json())
    .then((files: GitHubFileDescription[]) => files
        .filter(file => file.name.endsWith('.csv'))
        .filter(file => file.name.startsWith('time_series_covid19') && csvOrder.some(csvName => file.name.includes(csvName)))
        .map(file => file.download_url)
        .sort((url1, url2) => getCsvOrderIndex(url1) - getCsvOrderIndex(url2))
    )
    .then(urls => Promise.all(urls.map(url => fetchCsv(url))))
    .then(([ confirmedCsv, deathsCsv ]) => ({ confirmedCsv, deathsCsv }));


