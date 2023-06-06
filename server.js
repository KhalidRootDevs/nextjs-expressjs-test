const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose
   .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cyfho4w.mongodb.net/xoomsport?retryWrites=true&w=majority`
   )

   .then(() => console.log('Xoomsport Database connected'))
   .catch(err => {
      console.log(err, 'Failed to connect database');
   });

app.prepare()
   .then(() => {
      server.use(express.json());
      server.use(cors());

      const showRoutes = require('./server/routes/useRouter.js');

      server.use('/api', showRoutes(server));

      server.get('*', (req, res) => {
         return handle(req, res);
      });

      server.listen(PORT, err => {
         if (err) throw err;
         console.log(`> Ready on ${PORT}`);
      });
   })
   .catch(ex => {
      console.error(ex.stack);
      process.exit(1);
   });
