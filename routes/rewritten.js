const router = require("express").Router()

const postDirs = ["videos", "events", "external", "reviews", "shop", "trails"]

const postRoutes = [
  "/videos/blue-ridge-trailheads-foggy-spec",
  "/videos/blue-ridge-trailheads-gauntlet-rim-dent",
  "/videos/blue-ridge-trailheads-massanutten-hoo-ha-enduro",
  "/videos/creatureduro-promo-2018",
  "/videos/downhill-southeast-angelo-wash",
  "/videos/middle-mountain-momma-2018-video",
  "/videos/wasena-pump-track-dedication",
  "/events/100k-4th-of-july-2018",
  "/events/creature-from-carvins-cove-2018",
  "/events/massanutten-hoo-ha-2018",
  "/events/night-riders-ball-alleycat-2018",
  "/events/roanoke-silver-ride-center",
  "/external/singletracks-best-mtb-towns",
  "/reviews/garmin-varia-rtl510",
  "/reviews/ibis-ripmo",
  "/shop/dragons-back-tshirt",
  "/trails/dragons-back"
]

postRoutes.forEach(route => {
  let url
  postDirs.forEach(dir => {
    if (route.startsWith(`/${dir}`)) {
      url = route.replace(`/${dir}`, "")
    }
  })

  router.get(route, (req, res) => {
    res.redirect(url)
  })
})

const urlParamsRoutes = [
  "/results/battle-at-blackhorse-2018",
  "/results/middle-mountain-momma-2018",
  "/xxc-va-race-series/2018"
]

urlParamsRoutes.forEach(route => {
  router.get(route, (req, res) => {
    const routeSplitArr = route.split("/")
    console.log(routeSplitArr)
    // the slash (/) at the beginning splits an empty string
    if (routeSplitArr.length === 3) {
      let url
      if (route.startsWith("/results")) {
        url = `/results?race=${routeSplitArr[2]}`
      } else if (route.startsWith("/xxc-va-race-series")) {
        url = `/xxc-va-race-series-${routeSplitArr[2]}`
      }
      res.redirect(url)
    }
  })
})

module.exports = router
