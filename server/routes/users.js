const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getUserById
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.get('/:id', getUserById);

module.exports = router;
