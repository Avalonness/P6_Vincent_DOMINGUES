const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const stuffRoutes = require('./routes/stuff');
const path = require('path');

//Connexion à mongoDB
mongoose.connect('mongodb+srv://Avalonne:mrk16wxh@cluster0.92xfs.mongodb.net/piiquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

//Importer les routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', stuffRoutes);

//Gérer les images
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;