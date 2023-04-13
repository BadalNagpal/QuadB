require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const cors = require('cors')
//
const ejs = require('ejs')
//

const dataRoutes = require('./routes/data')
const Data = require('./models/dataModel')

const app = express();

//middleware
app.use(express.json())
app.use(cors())



//
app.set('view engine', 'ejs')
app.use(express.static("public"));
//

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/', dataRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

  
//fetch data from url
app.get('/data', (req, res) => {
  const url = 'https://api.wazirx.com/api/v2/tickers';
  
  fetch(url)
    .then(response => response.json())
    //fetch only top 10 json data from url and store to mongo db
    .then(jsonData => {
      const dataArray = Object.keys(jsonData).map(key => jsonData[key]);
      const top10 = dataArray.slice(0, 10);
      top10.forEach(item => {
        Data.create({
          name: item.name,
          last: item.last,
          buy: item.buy,
          sell: item.sell,
          volume: item.volume,
          base_unit: item.base_unit
          })
          .then(() => console.log('Item inserted into MongoDB Atlas'))
          .catch(error => console.error(error));
        });
      })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
})
