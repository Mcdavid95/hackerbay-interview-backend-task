import express from 'express';
import validateInput from './utils/validateInput';
import controller from './controller';

const router = express.Router();

// Login Route

router.post('/user/login', validateInput.logInInput, controller.login);

export default router;
