function getData() {
    fetch('https://disease.sh/v3/covid-19/countries')
        .then(
            function(response) {
                if (response.status === 200) {
                    response.json().then(function(countries) {
                        countries.forEach(country => {
                            countries_data.push(country)
                        });
                    });
                } else {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                }
            }
        ).then(() => {
            displayCountries();
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

function displayCountries() {
    const cards = document.getElementsByClassName('cards');
    countries_data.forEach(country => {
        const card = `<div class="country-card">
                    <div class="title gradient_text">
                        ${country.country}
                    </div>
                    <div class="total_cases gradient_text">
                        <div class="flag"></div>
                        <div class="total_cases_num">
                            <p>Total Cases</p>
                            <div class="number">
                                <div class="covid"></div>
                                <p>${country.cases}</p>
                            </div>
                        </div>
                    </div>
                    <div class="other_stats">
                        <div class="other_stats_num gradient_text">
                            <div class="recovery"></div>
                            <div class="number">
                                <p>Total Recoveries</p>
                                <p>${country.recovered}</p>
                            </div>
                        </div>
                        <div class="other_stats_num gradient_text">
                            <div class="active"></div>
                            <div class="number">
                                <p>Active Cases</p>
                                <p>${country.active}</p>
                            </div>
                        </div>
                        <div class="other_stats_num gradient_text">
                            <div class=" mask"></div>
                            <div class="number">
                                <p>New Cases</p>
                                <p>${country.todayCases}</p>
                            </div>
                        </div>
                        <div class="other_stats_num gradient_text">
                            <div class="deaths"></div>
                            <div class="number">
                                <p>Total Deaths</p>
                                <p>${country.deaths}</p>
                            </div>
                        </div>
                    </div>
                </div>`
        cards[0].insertAdjacentHTML('beforebegin', card);
    })
}

function addcountry(country) {
    const cards = document.getElementsByClassName('cards');
    const card = `<div class="country-card">
                    <div class="title gradient_text">
                        ${country.country}
                    </div>
                    <div class="total_cases gradient_text">
                        <div class="flag" style="background-image: url(/images/flags/png250px/${country.countryInfo.iso2.toLowerCase()}.png);"></div>
                        <div class="total_cases_num">
                            <p>Total Cases</p>
                            <div class="number">
                                <div class="covid"></div>
                                <p>${country.cases}</p>
                            </div>
                        </div>
                    </div>
                    <div class="other_stats">
                        <div class="other_stats_num gradient_text">
                            <div class="recovery"></div>
                            <div class="number">
                                <p>Total Recoveries</p>
                                <p>${country.recovered}</p>
                            </div>
                        </div>
                        <div class="other_stats_num gradient_text">
                            <div class="active"></div>
                            <div class="number">
                                <p>Active Cases</p>
                                <p>${country.active}</p>
                            </div>
                        </div>
                        <div class="other_stats_num gradient_text">
                            <div class=" mask"></div>
                            <div class="number">
                                <p>New Cases</p>
                                <p>${country.todayCases}</p>
                            </div>
                        </div>
                        <div class="other_stats_num gradient_text">
                            <div class="deaths"></div>
                            <div class="number">
                                <p>Total Deaths</p>
                                <p>${country.deaths}</p>
                            </div>
                        </div>
                    </div>
                </div>`
    cards[0].innerHTML += card;
}





const source = document.getElementsByClassName('sourced_from');
source[0].style.cursor = 'pointer';
source[0].onclick = () => {
    window.location.replace("https://disease.sh/");

}

const github = document.getElementsByClassName('github');
github[0].style.cursor = 'pointer';
github[0].onclick = () => {
    window.location.replace("https://github.com/acmahaja/covid-tracker");
}


let countries_data = [];

document.addEventListener("DOMContentLoaded", async() => {

    await fetch('https://disease.sh/v3/covid-19/all')
        .then(function(response) {
            if (response.status === 200) {
                response.json().then(function(result) {
                    console.log(result);
                    document.getElementById('total_cases').innerText = result.cases;
                    document.getElementById('total_recoveries').innerText = result.recovered;
                    document.getElementById('new_cases').innerText = result.todayCases;
                    document.getElementById('acitve_cases').innerText = result.active;
                });
            } else {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
            }
        })


    await fetch('https://disease.sh/v3/covid-19/countries')
        .then(
            function(response) {
                console.log(response);

                if (response.status === 200) {
                    response.json().then(function(countries) {
                        countries.forEach(country => {
                            addcountry(country);
                        });
                    });
                } else {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                }
            }
        ).then(() => {
            displayCountries();
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

})