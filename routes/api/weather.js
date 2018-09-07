const router = require("express").Router()
const db = require("../../server").db
const axios = require("axios")
const moment = require("moment")

router.get("/", (req, res) => {
  console.info("Querying databse for weather data")
  db.query("SELECT * FROM weather;", async (err, results, fields) => {
    if (err || !results || results.length === 0) {
      console.error(err)
      res.status(500).send(err)
    }

    const weather = await getOrUpdateWeather(results, res)
    res.send(weather)
  })
})

const getOrUpdateWeather = async (results, res) => {
  let weather = {}
  for (const result of results) {
    if (
      moment()
        .utc()
        .diff(moment(result.last_updated).utc(), "minutes") > 15
    ) {
      const openWeatherRes = await axios.get(openWeatherUrl(result.city))
      if (openWeatherRes.data) {
        weather[result.city] = weatherObj(openWeatherRes.data)
        db.query(
          `UPDATE weather
           SET icon_id='${weather[result.city].icon_id}' ,
               temperature='${weather[result.city].temperature}',
               last_updated='${moment()
                 .utc()
                 .format("YYYY-MM-DD HH:mm:ss")}' 
           WHERE city='${result.city}';`,
          (err, results, fields) => {
            if (err) {
              console.error(err)
              res.status(500).send("Error updating weather data")
            }
          }
        )
      } else {
        console.error(openWeatherRes)
        res.status(500).send("Error getting weather data")
      }
    } else {
      weather[result.city] = JSON.parse(JSON.stringify(result))
      delete weather[result.city].last_updated
      delete weather[result.city].city
    }
    weather[result.city].icon = weatherIcons.find(icon => {
      return icon.ow === weather[result.city].icon_id
    }).icon
    delete weather[result.city].icon_id
  }
  return weather
}

const openWeatherUrl = city => {
  return `https://api.openweathermap.org/data/2.5/weather?id=${
    weatherIds[city]
  }&units=imperial&APPID=6404190a90882d11c13390dd272d2d94`
}

const weatherObj = openWeatherData => {
  return {
    icon_id: openWeatherData.weather[0].icon,
    temperature: openWeatherData.main.temp
  }
}

const weatherIds = {
  roanoke: "4782241",
  harrisonburg: "4763231",
  richmond: "4781756"
}

const weatherIcons = [
  {
    ow: "01d",
    icon: "sunny"
  },
  {
    ow: "01n",
    icon: "nt_clear"
  },
  {
    ow: "02d",
    icon: "partlycloudy"
  },
  {
    ow: "02n",
    icon: "nt_partlycloudy"
  },
  {
    ow: "03d",
    icon: "cloudy"
  },
  {
    ow: "03n",
    icon: "nt_cloudy"
  },
  {
    ow: "04d",
    icon: "mostlycloudy"
  },
  {
    ow: "04n",
    icon: "nt_mostlycloudy"
  },
  {
    ow: "09d",
    icon: "chancerain"
  },
  {
    ow: "09n",
    icon: "nt_chancerain"
  },
  {
    ow: "10d",
    icon: "rain"
  },
  {
    ow: "10n",
    icon: "nt_rain"
  },
  {
    ow: "11d",
    icon: "tstorms"
  },
  {
    ow: "11n",
    icon: "nt_tstorms"
  },
  {
    ow: "13d",
    icon: "snow"
  },
  {
    ow: "13n",
    icon: "nt_snow"
  },
  {
    ow: "50d",
    icon: "hazy"
  },
  {
    ow: "50n",
    icon: "nt_hazy"
  }
]

module.exports = router
