import express from 'express';
import { check } from 'express-validator';
import * as userController from '../controllers/user-controller.js';
import * as postController from '../controllers/post-controller.js';

const router = express.Router();

router.post('/register', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout); // роуты аунтификации

router.get('/refresh');
 
router.get('/checkAuth', userController.checkAuth);
 
router.get('/getPosts', postController.getPosts);
router.get('/getPost', postController.getPostById);
router.post('/createPost', postController.createPost);

export default router;
