$(function($) {
  function getResults(race) {
    $.ajax(
      window.location.protocol +
        "//" +
        window.location.host +
        "/api/results/" +
        race
    ).then(function(res) {
      var results = $('<div class="results-inner">')
      res.classes.forEach(function(clazz) {
        results.append($('<h3 class="results-class-name">').text(clazz.name))
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
      window.mtbvaResults[$("#race-select").val()] = results
    })
    // .catch(function(err) {
    // TODO: sentry
    // })
  }

  function replaceResults(race) {
    if (race) {
      $("#race-select").val(race)
    }
    $("#mtbva-results div:first").remove()
    $("#mtbva-results").append(window.mtbvaResults[$("#race-select").val()])
  }

  function updateResults() {
    if (window.mtbvaResults[$("#race-select").val()]) {
      // selected by user again, load from window cache
      replaceResults()
    } else {
      // selected by user, GET and put in window cache
      getResults($("#race-select").val())
      replaceResults()
    }
  }

  // selected by user
  $("#race-select").on("change", function() {
    updateResults()
  })


  if (window.location.href.indexOf("/results") !== -1) {
    // first item in select list's table is always static
    var resultStr = $("#race-select").val().toLowerCase()
    resultStr = resultStr.split(" ").join("-")
    window.mtbvaResults = {
      resultStr: $("#mtbva-results div:first")
    }

    var queryStrArr = window.location.search.split("=")
    {
      if (queryStrArr.length === 2) {
        // url query param
        getResults(queryStrArr[1])
        replaceResults(queryStrArr[1])
      } else {
        updateResults()
      }
    }
  }
})
