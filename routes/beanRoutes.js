const router= require('express').Router();
const { createBean, getBeans } = require('../controllers/bean');


router.post('/create-bean', createBean);
router.get('/get-beans', getBeans);