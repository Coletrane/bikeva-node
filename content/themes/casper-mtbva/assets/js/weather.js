$(function($) {
  function getWeather() {
    $.ajax(
      window.location.protocol + "//" + window.location.host + "/api/weather"
    ).then(function(res) {
      window.mtbvaWeather = res
      displayWeather()
    })
  }

  function displayWeather() {
    Object.keys(window.mtbvaWeather).forEach(function(key) {
      console.log($("#" + key))
      console.log($("#" + key + " .temp-icon"))
      $("#" + key + " .temperature").text(window.mtbvaWeather[key].temperature)
      $("#" + key + " .temp-icon").append(
        $("<img>").attr(
          "src",
          "/content/images/weather-icons/" + mtbvaWeather[key].icon + ".svg"
        )
      )
    })
  }

  if (!window.mtbvaWeather) {
    window.mtbvaWeather = {
      roanoke: {},
      harrisonburg: {},
      richmond: {}
    }
    getWeather()
  }
})
