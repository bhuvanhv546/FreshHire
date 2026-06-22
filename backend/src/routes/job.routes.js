const express = require('express');
const router = express.Router();

const jobController = require('../controllers/job.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', jobController.getAllJobs);
router.get('/my-jobs',auth,jobController.getMyJobs)
router.get('/search', jobController.searchJobs);
router.post('/filter', jobController.filterJobs);
router.put('/:id',auth,jobController.updateJob)
router.delete('/:id',auth,jobController.deleteJob);
router.get('/companies/hiring', jobController.getCompaniesHiring);
router.post('/', auth, jobController.createJob)
router.get('/:id', jobController.getJobById);
router.delete('/:id', auth, (req, res, next) => {
  console.log('DELETE ROUTE HIT');
  next();
}, jobController.deleteJob);

module.exports = router;
