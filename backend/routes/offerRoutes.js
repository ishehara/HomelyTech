const express  = require('express');
const router = express.Router();

//insert offer Model
const offer =  require('../models/offerModel');

//insert offer controller
const offerController = require('../controllers/offerController');

router.get('/', offerController.getAllOffers);
router.post('/', offerController.createOffer);
router.get('/:id', offerController.getOfferById);
router.put('/:id', offerController.updateOffer);
router.delete('/:id', offerController.deleteOffer);

//export
module.exports = router;