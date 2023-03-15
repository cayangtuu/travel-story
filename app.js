if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const exhbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes')
const { localInforms } = require('./middleware/locals')
const handlebarsHelpers = require('./helpers/handlebars-helper')
const PORT = process.env.PORT || 8080

const app = express()
app.engine('hbs', exhbs({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false
}))
app.use(flash())
app.use(localInforms)
app.use(routes)

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`))