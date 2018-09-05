$(function($) {
  function getResults() {
    if (!window.mtbvaResults) {
      window.mtbvaResults = {
        "middle-mountain-momma-2018": true
      }
    }

    if (!window.mtbvaResults[$("#race-select").val()]) {
      var url = window.location.href.replace("/results", "")
      $.ajax(url + "api/results/" + $("#race-select").val())
        .then(function(res) {
          var results = $('<div class="results-inner">')
          res.classes.forEach(function(clazz) {
            results.append(
              $('<h3 class="results-class-name">').text(clazz.name)
            )
            var table = $("<table>")
            var thead = $("<thead>")
            thead.append(
              $("<th>").text("position"),
              $("<th>").text("name"),
              $("<th>").text("time")
            )
            table.append(thead)
            var tbody = $("<tbody>")
            clazz.riders.forEach(function(rider, i, arr) {
              tbody.append(
                $("<td>").text(i + 1),
                $("<td>").text(rider.name),
                $("<td>").text(rider.time)
              )
            })
            table.append(tbody)
            results.append(table)
          })
          $("#mtbva-results").append(results)
        })
        .catch(function(err) {
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