import express from 'express';
import validateInput from './utils/validateInput';
import jwtVerify from './utils/jwtVerify';
import controller from './controller';

const router = express.Router();

// Login Route

router.post('/user/login', validateInput.logInInput, controller.login);
router.post('/user/book', jwtVerify.hasToken, validateInput.addBookInput, validateInput.bookNameExists, controller.addBook);
router.post('/user/image', jwtVerify.hasToken, validateInput.thumbNailInput, controller.createThumbnail);

export default router;
