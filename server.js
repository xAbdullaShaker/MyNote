require('dotenv').config({ quiet: true })
const express        = require('express')
const app            = express()
const methodOverride = require('method-override')
const morgan         = require('morgan')
const mongoose       = require('mongoose')
const session        = require('express-session')
const MongoStore     = require('connect-mongo')

const authController = require('./controllers/auth.controller')
const isSignedIn     = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')

const noteRoutes     = require('./routes/notes')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name} 🙃.`)
})

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}))
app.use(passUserToView)

// ROOT
app.get('/', (req, res) => {
  res.render('index.ejs', { title: 'my App' })
})


app.use('/notes', noteRoutes)

app.use('/auth', authController)

app.get('/vip-lounge', isSignedIn, (req, res) => {
  res.send(`Welcome ✨`)
})

const port = process.env.PORT || 3007
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}`)
})
