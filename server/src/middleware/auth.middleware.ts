// auth.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { db } from '../loaders/database.loader';
import env from '../../env';

passport.serializeUser((user: any, done: any) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: number, done: any) => {
	try {
		const user = await db.users.findByPk(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: env.google.clientId,
			clientSecret: env.google.clientSecret,
			callbackURL: '/api/auth/google/callback',
		},
		async (accessToken, refreshToken, profile: any, done) => {
			try {
				let user = await db.users.findOne({
					where: { email: profile.emails[0].value },
				});
				if (!user) {
					user = await db.users.create({
						name: profile.displayName,
						email: profile.emails[0].value,
						isVerified: true, // Google users are verified
					});
				}
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		},
	),
);
passport.use(
	new FacebookStrategy(
		{
			clientID: env.facebook.clientId,
			clientSecret: env.facebook.clientSecret,
			callbackURL: '/api/auth/facebook/callback',
			profileFields: ['id', 'emails', 'displayName', 'photos'],
		},
		async (accessToken, refreshToken, profile: any, done) => {
			try {
				let email = profile.emails ? profile.emails[0].value : null;

				if (!email) {
					// Xử lý khi không lấy được email từ Facebook
					return done(
						new Error('Không thể lấy được email từ Facebook'),
					);
				}

				let user = await db.users.findOne({
					where: { email },
				});

				if (!user) {
					user = await db.users.create({
						name: profile.displayName,
						email,
						isVerified: true, // Facebook users are verified
					});
				}

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		},
	),
);

export default passport;
