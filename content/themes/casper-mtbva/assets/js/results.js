$(function ($) {
  function getResults() {
    if (!window.mtbvaResults) {
      window.mtbvaResults = {}
    }
    if (!window.mtbvaResults[$("#race-select").val()]) {
      var url = window.location.href.replace("/results", "")
      $.ajax(url + "api/results/" + $("#race-select").val())
        .then(function (res) {
          var table = $("table")
          var thead = $("thead")
          var tbody = $("tbody")

          $("#race-table").append(table)
        })
        .catch(function (err) {
          // TODO: sentry
          console.log(err)
        })
    } else {
      return window.mtbvaResults[$("#race-select").val()]
    }
  }

  if (window.location.href.indexOf("results") !== -1) {
    getResults()
  }
})
