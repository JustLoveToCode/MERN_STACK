import {Router} from 'express';
// Invoke the Router here
const router = Router();
import {login,logout, register} from '../client/controllers/authController.js';
import {validateRegisterInput, validateLoginInput} from '../middleware/validationMiddleware.js';

// This is the post Route
router.post('/register', validateRegisterInput, register);
// This is the post Route
router.post('/login', validateLoginInput, login);
// This is the get Route
router.get('/logout', logout);


export default router;
