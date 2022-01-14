require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

app.use(
	require('express-session')({
		secret: '3523jfkdsoaj43954;alkjfkld;sjalkfad;dlkfj',
		resave: true,
		saveUninitialized: false
	})
);

const { ExpressOIDC } = require('@okta/oidc-middleware');
const oidc = new ExpressOIDC({
  appBaseUrl: 'http://localhost:3000',
  issuer: 'https://dev-04570669.okta.com/oauth2/default',
  client_id: '0oa3kdnbzokARvFax5d7',
  client_secret: '4a4t5uDnaschinhROZYgJtaQPjkfqBE3m8_BWlO0',
  redirect_uri: 'http://localhost:3000/authorization-code/callback',
  scope: 'openid profile'
});

app.use(oidc.router);

app.use('/register', require('./routes/register'));

app.use('/', require('./routes/index'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on port ${port}`));