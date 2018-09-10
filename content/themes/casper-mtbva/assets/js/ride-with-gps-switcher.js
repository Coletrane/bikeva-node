function initRideWithGpsSwitcher(id, routes) {
  if (!window.rideWithGps) {
    window.rideWithGps = {}
  }
  window.rideWithGps[id] = routes[0]
  $("#" + id + " button")
    .each(function(i, button) {
      $(button).click(function() {
        var buttonRoute = $(button).attr("data-route")
        if (window.rideWithGps[id] === buttonRoute) {
          return
        }

        $("#" + id + " iframe").css("visibility", "hidden")

        var attachedIframe
        $("#" + id + " iframe").toArray().forEach(function(iframe) {
          if ($(iframe).attr("data-route") === buttonRoute) {
            attachedIframe = iframe
            return
          }
        })
        if (attachedIframe) {
          // iframe is already in the DOM
          $(attachedIframe)
            .css("display", "block")
            .css("visibility", "visible")
        } else {
          // load new iframe into the DOM
          var routeToLoad
          routes.forEach(function(route) {
            if (route.name === buttonRoute) {
              routeToLoad = route
              return
            }
          })
          $("#" + id).append(
            $("<iframe>")
              .attr("src", routeToLoad.url)
              .attr("data-route", routeToLoad.name)
          )
        }

        // update global object
        window.rideWithGps[id] = buttonRoute

        // hide all the other iframes
        $("#" + id + " iframe").each(function(i, iframe) {
          if ($(iframe).attr("data-route") !== buttonRoute) {
            $(iframe).css("display", "none")
          }
        })
      })
    })
}