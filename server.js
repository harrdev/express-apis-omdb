require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
// added in axios import
const axios = require('axios')
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes also known as Controllers
app.get('/', function(req, res) {
  res.render('index.ejs')
  //res.send('Hello, backend!');
})
// WE MOVED THIS TO OUR CONTROLLERS FOLDER
// // this is our results route aka controller
// app.get('/results', function(req, res) {
//   // we used this console log, to check out our request object
//   // console.log('this is req.query', req.query)
//   let movieTitle = req.query.movieTitle
//   console.log('this should be the movie title', movieTitle)
//   // now we can use the movieTitle, to build the request url, and make the call with axios
//   axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${process.env.OMDB_API_KEY}`)
//     .then(apiRes => {
//       console.log('this is apiRes', apiRes.data)
//       let title = apiRes.data.Title
//       let year = apiRes.data.Year
//       let plot = apiRes.data.Plot
//       let imdbID = apiRes.data.imdbID
//       let poster = apiRes.data.Poster
//       // res.render results to results.ejs with our selected data sent as an object
//       res.render('results', {title: title, year: year, plot: plot, imdbID: imdbID, poster: poster})
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })
// CONTROLLERS MIDDLEWARE
app.use('/movies', require('./controllers/omdbRoutes'))
// process.env is a file that hides things so it's not public
app.listen(process.env.PORT || 3000, () => { 
  console.log(`Listening to the sweet sounds of ${process.env.PORT} Time to make some requests.`)
})


// // The app.listen function returns a server handle
// var server = app.listen(process.env.PORT || 3000);

// // We can export this server to other servers like this
// module.exports = server;


