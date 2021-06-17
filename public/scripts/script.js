function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

        for (let i = 0; i < country.length; i++) {
            country[i] = numberWithCommas(country[i]);

        }

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

    let data = {};
    data.cases = numberWithCommas(country.cases)
    data.recovered = numberWithCommas(country.recovered)
    data.active = numberWithCommas(country.active)
    data.tests = numberWithCommas(country.tests)
    data.deaths = numberWithCommas(country.deaths)
    data.flag = country.countryInfo.flag
    const card = `<div class="country-card" id="${country.country}">
                    <div class="title gradient_text">
                        ${country.country}
                    </div>
                    <div class="total_cases gradient_text">
                        <div class="flag" style="background-image: url(${data.flag});"></div>
                        <div class="total_cases_num">
                            <p>Total Cases</p>
                            <div class="number">
                                <div class="covid"></div>
                                <p>${data.cases}</p>
                            </div>
                        </div>
                    </div>
                    <div class="other_stats">
                        <div class="other_stats_num gradient_text">
                            <div class="recovery"></div>
                            <div class="number">
                                <p>Total Recoveries</p>
                                <p>${data.recovered}</p>
                            </div>
                        </div>
                        <div class="other_stats_num gradient_text">
                            <div class="active"></div>
                            <div class="number">
                                <p>Active Cases</p>
                                <p>${data.active}</p>
                            </div>
                        </div>
                        <div class="other_stats_num gradient_text">
                            <div class=" test"></div>
                            <div class="number">
                                <p>Total Tests</p>
                                <p>${data.tests}</p>
                            </div>
                        </div>
                        <div class="other_stats_num gradient_text">
                            <div class="deaths"></div>
                            <div class="number">
                                <p>Total Deaths</p>
                                <p>${data.deaths}</p>
                            </div>
                        </div>
                    </div>
                </div>`
    cards[0].innerHTML += card;
}

function enableCountry(country) {
    const card = document.getElementById(country.country);
    card.style.display = "flex";

}

function disableCountry(country) {
    const card = document.getElementById(country.country);
    card.style.display = "none";

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

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(async function() {
        await fetch('https://disease.sh/v3/covid-19/all')
            .then(function(response) {
                if (response.status === 200) {
                    const animiations = document.getElementsByClassName("lds-ripple");
                    for (let i = 0; i < animiations.length; i++) {
                        animiations[i].style.display = "none";
                        console.log(animiations);
                    }


                    response.json().then(function(result) {

                        document.getElementById('total_cases').innerText = numberWithCommas(result.cases);
                        document.getElementById('total_recoveries').innerText = numberWithCommas(result.recovered);
                        document.getElementById('new_cases').innerText = numberWithCommas(result.todayCases);
                        document.getElementById('acitve_cases').innerText = numberWithCommas(result.active);
                    });
                } else {
                    console.err('Looks like there was a problem. Status Code: ' +
                        response.status);
                }
            })
    }, 800);

    setTimeout(async function() {
        await fetch('https://disease.sh/v3/covid-19/countries')
            .then(
                function(response) {

                    if (response.status === 200) {
                        const cards = document.getElementsByClassName('cards')[0];
                        cards.innerHTML = "";
                        response.json().then(function(countries) {
                            countries.forEach(country => {

                                addcountry(country);
                                countries_data.push(country)

                            });
                        });
                    } else {
                        console.err('Looks like there was a problem. Status Code: ' +
                            response.status);
                    }
                }
            ).then(() => {
                displayCountries();
            })
            .catch(function(err) {
                console.err('Fetch Error :-S', err);
            });
    }, 1500);



})


document.getElementById("filterer").addEventListener("input", () => {
    const cards = document.getElementsByClassName('cards');
    countries_data.forEach((country) => {
        if (country.country.toLowerCase().includes(document.getElementById("filterer").value.toLowerCase())) {
            enableCountry(country)
        } else {
            disableCountry(country)
        }
    })
})