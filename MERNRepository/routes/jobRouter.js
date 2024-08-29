// Import the Router from Express.Js Application
import {Router} from 'express';

// Invoking the Router Application
const router = Router();

// Importing all the Different Jobs in jobController.js file
import {getAllJobs,getJob, createJob, updateJob, deleteJob, showStats } 
from '../client/controllers/jobController.js';

import { validateJobInput, validateIdParam} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';


// getAllJobs and createJob have the Same Routes:
// Using the validateJobInput Middleware in the createJob Function:
// The first middleware is the checkForTestUser
// The next middleware is the validateJobInput
// If that is correct, then we finally get to createJob
router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);


// getJob, updateJob and deleteJob have the Additional Params which is /:id here:
// Using the validateJobInput Middleware in the updateJob Function:
router.route('/:id').get(validateIdParam,getJob)
.patch(checkForTestUser, validateJobInput,validateIdParam, updateJob)
.delete(checkForTestUser, validateIdParam,deleteJob);



export default router;



