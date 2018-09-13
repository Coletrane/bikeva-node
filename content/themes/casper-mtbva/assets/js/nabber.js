$(function($) {
  var nabbers = [
    {
      url: "https://www.visitroanokeva.com/",
      img: "/content/images/sponsors/nabber/virginias-blue-ridge.jpg"
    },
    {
      url: "https://www.deschutesbrewery.com/",
      img: "/content/images/sponsors/nabber/deschutes.jpg"
    },
    {
      url: "http://jackmasonstavern.com/",
      img: "/content/images/sponsors/nabber/jack-masons-tavern.jpg"
    },
    {
      url: "https://viralstyle.com/store/angelo-wash/Sketchcollect",
      img: "/content/images/sponsors/nabber/sketch-collect-banner.jpg"
    }
  ]

  function createNabber(i) {
    var singleSponsor = $("<div class=\"sponsor-single\">")
    var link = $("<a>").attr("href", nabbers[i].url)
    var img = $("<img>").attr("src", nabbers[i].img)
    link.append(img)
    singleSponsor.append(link)
    return singleSponsor
  }

  window.initHomeNabbers = function() {
    var nabberCount = 0
    $(".post-card")
      .toArray()
      .forEach(function(card, i, arr) {
        if (i % 3 === 0 &&
            i < (nabbers.length * 3)) {

          if (nabberCount === 2 &&
              i === 6) {
            var footerSponsors = $.clone($(".sponsors-container")[0])
            var sponsorsContainer = $("<div class=\"sponsors-middle mtbva-parallax\">")
            sponsorsContainer.append($(footerSponsors))
            $(card).after(sponsorsContainer)
          } else {
            $(card).after(createNabber(nabberCount))
            nabberCount += 1
          }
        }
      })
    window.testParallax()
  }

  window.initPostNabbers = function() {
    $($(".post-full-header")[0]).after(createNabber(0))
  }
})
