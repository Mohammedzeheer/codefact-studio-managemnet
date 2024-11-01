const express = require('express');
const { getStudios, addStudio, getStudioById, updateStudio } = require('../controllers/studioController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getStudios); // Public route to view studios with filters
router.post('/', verifyToken, addStudio); // Authenticated route to add a new studio
router.get('/:id', getStudioById); // Public route to view a specific studio
router.put('/:id', verifyToken, updateStudio); // Authenticated route to update studio details

module.exports = router;

