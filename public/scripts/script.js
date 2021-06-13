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