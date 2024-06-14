import { Router } from 'express';

import * as authControllers from '../controllers/auth.controller';
import { validateBody } from '../middleware/validation.middleware';
import { loginSchema } from '../validators';
import {
	forgotPasswordSchema,
	registerSchema,
	verifySchema,
} from '../validators/auth.validator';
import passport from 'passport';

const router = Router();

router.post('/login', validateBody(loginSchema), authControllers.login);
router.post(
	'/register',
	validateBody(registerSchema),
	authControllers.register,
);
router.post(
	'/forgot',
	validateBody(forgotPasswordSchema),
	authControllers.login,
);
router.post('/verify', validateBody(verifySchema), authControllers.verify);
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: 'http://localhost:3000/login',
	}),
	authControllers.loginWithGoogle,
);
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
		failureRedirect: 'http://localhost:3000/login',
	}),
	authControllers.loginWithFacebook,
);

export default router;
