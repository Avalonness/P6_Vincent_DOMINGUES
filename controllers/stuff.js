//Import des éléments nécessaires
const Thing = require('../models/thing');
const fs = require('fs');

// Créer une sauce
exports.createThing = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    const thing = new Thing({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

//Trouver les ou la sauce
  exports.getAll = (req, res, next) => {
    Thing.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.getOne = (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

//Modification d'une sauce
exports.modifyThing = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      if (req.file) {
        Thing.findOne({ _id: req.params.id })
          .then((sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Thing.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => { res.status(200).json({ message: 'Sauce mise à jour!' }); })
                .catch((error) => { res.status(400).json({ error }); });
            })
          })
          .catch((error) => { res.status(500).json({ error }); });
    
      } else {
        Thing.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce mise à jour!' }))
          .catch((error) => res.status(400).json({ error }));
      }
    };
    

  //effacer une sauce
  exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };