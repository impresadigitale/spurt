import passport from 'passport';
import passportLocal from 'passport-local';
import _ from 'lodash';

import {getManager} from 'typeorm';
import { User } from '../../api/models/User';
import { Request, Response, NextFunction } from 'express';
import { classToPlain } from 'class-transformer';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done: any) => {
  done(undefined, user.userId);
});

passport.deserializeUser(async (id, done) => {
  const userRepository = getManager().getRepository(User);
  try {
    const user = await userRepository.findOne(id);
    if (!user) {
      return done(new Error('user not found'));
    }
    done(undefined, user);
  } catch (e) {
    done(e);
  }
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  const userRepository = getManager().getRepository(User);
  const user = await userRepository.findOne({
      where: {
          username: email,
          deleteFlag: 0,
          userGroupId: 1,
      }, relations: ['usergroup'],
  });
  if (!user) {
    return done(undefined, false, { message: [`Email ${email} not found.`] });
  }
  if (await User.comparePassword(user, password)) {
    if (user.usergroup.isActive === 0) {
      return done(new Error('Inactive Role'));
    }
    return done(undefined, classToPlain(user));
  } else {
    return done(undefined, false, { message: ['Invalid email or password.'] });
  }
}));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request | any, res: Response, next: NextFunction) => {
  const provider = req.path.split('/').slice(-1)[0];
  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
