import express from 'express';
import { register, login, verifyEmailController  } from '../controllers/authController';

const router = express.Router();

//registrar administrador

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verifyEmailController);

//mostrar usuarios 
//eliminar usuarios

export default router;
