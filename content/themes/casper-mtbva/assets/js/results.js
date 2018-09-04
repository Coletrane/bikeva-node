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
          thead.append(
            $("th").text("position"),
            $("th").text("name"),
            $("th").text("time")
          )

          var tbody = $("tbody")
          res.classes.forEach(function(clazz) {

            tbody.append(
              $("td").text(i + 1)

            )
          })
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
