const express = require ('express');
const mongoose = require ('mongoose');
require ("dotenv").config();
const userRoutes = require ("./routes/user");
const teamRoutes = require ("./routes/team");
const stadiumRoutes = require ("./routes/stadium");
const app = express ();
const cors = require ('cors');
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes, teamRoutes, stadiumRoutes);


app.get ('/', (req, res) => {
    res.send('Bienvenido a la api')
});

mongoose
.connect(process.env.URL_MONGODB)
.then(()=> console.log('Conectado a mongo db compass'))
.catch((error) => console.error(error));

app.listen(port, () => console.log ('servidor escuchando', port));