const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const adminController = require('../controllers/admin.controller');

router.use(auth, role('admin'));

router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

router.get('/recruiters', adminController.getAllRecruiters);
router.put('/recruiters/:id/verify', adminController.verifyRecruiter);

router.put('/jobs/:id/verify', adminController.verifyJob);
router.get('/dashboard',auth,adminController.getDashboardStats);

module.exports = router;
