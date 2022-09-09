const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


// Taken from OSU file 13/01/19/server.js.15
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});


// Original 'listen' pulled with starter code
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });
