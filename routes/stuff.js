const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const Thing = require('../models/thing');
const stuffCtrl = require('../controllers/stuff');

//Créer une sauce
router.post('/', auth, multer, stuffCtrl.createThing);
//Récupérer les sauces/la sauce
router.get('/', auth, stuffCtrl.getAll);
router.get('/:id', auth, stuffCtrl.getOne);
//modifier une sauce
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
//Supprimer une sauce
router.delete('/:id', auth, stuffCtrl.deleteThing);
//Aimer / Ne pas aimer une sauce
router.post('/:id/like', auth, stuffCtrl.likeThing);

module.exports = router;