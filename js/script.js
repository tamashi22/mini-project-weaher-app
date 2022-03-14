let weather = {
    apiKey: "6a9c7f196e46f32106391ca6a9690ef7",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displyWeather(data))
            .catch((err) => this.error());
    },
    error: function() {
        document.querySelector(".error").innerText = "Sorry,we couldn't find this country or city :(";
        document.querySelector(".city").innerText = "";
        document.querySelector(".icon").src = "";
        document.querySelector(".weather__des").innerText = "";
        document.querySelector(".temp").innerText = "";
        document.querySelector(".humidity").innerText = "";
        document.querySelector(".wind").innerText = "";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?weather')"

    },
    displyWeather: function(data) {
        document.querySelector(".error").innerText = "";
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".weather__des").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function() {

        this.fetchWeather(document.querySelector(".search__weather").value);

    }
};



document.querySelector(".search__bt").addEventListener("click", function() {
    weather.search();
});
document.querySelector(".search__weather").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})