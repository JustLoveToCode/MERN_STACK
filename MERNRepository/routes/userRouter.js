import {Router} from 'express';
import {getApplicationStats, getCurrentUser, updateUser } from '../client/controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions, checkForTestUser} from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddleware.js';

// Invoke the Router here:
const router = Router();


router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats',[authorizePermissions('admin'),getApplicationStats]);
// We can either upload multiple or single file, point what is the name in the FormData
router.patch('/update-user', checkForTestUser, upload.single('avatar'), validateUpdateUserInput, updateUser);


export default router;