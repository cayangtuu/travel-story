if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exhbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const PORT = process.env.PORT || 8080

const app = express()
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`))