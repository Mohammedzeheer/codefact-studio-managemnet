const express = require('express');
const router = express.Router();
const { getStudios, getStudio, createStudio, updateStudio, deleteStudio } = require('../controller/studioController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public routes
router.get('/getStudios', getStudios);
router.get('/getStudio/:id', getStudio);

// Protected routes
router.post('/createStudio', verifyToken, createStudio);
router.put('/updateStudio/:id', verifyToken, updateStudio);
router.delete('/deleteStudio/:id', verifyToken, deleteStudio);

module.exports = router;