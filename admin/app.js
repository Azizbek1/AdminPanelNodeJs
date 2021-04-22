const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const fileupload = require('express-fileupload');
const flash = require('express-flash')
const session = require('express-session')



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');
const issuebookRouter = require('./routes/issuebook');
const returnbookRouter = require('./routes/returnbook');
const settingsRouter = require('./routes/settings');
const loginRouter = require('./routes/login');



const app = express();









// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* express-flash */
app.use(session({
  name: "my_session",
  secret: "secret",
  resave: false,
  saveUninitialized: true
}))
app.use(flash());


/* EXPRESS_FILEUPLOAD */
app.use(fileupload({      // directory belgilsh kerak
  createParentPath: true
}))




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


/* Admin == Customization  */
app.use(express.static(path.join(__dirname, 'public')));

app.use("/admin", express.static(path.join(__dirname, 'public')))
app.use("/admin/:any", express.static(path.join(__dirname, 'public')))

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));



app.use('/', loginRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', adminRouter);
app.use('/', categoryRouter);
app.use('/', bookRouter);
app.use('/', userRouter);
app.use('/', issuebookRouter);
app.use('/', returnbookRouter);
app.use('/', settingsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
