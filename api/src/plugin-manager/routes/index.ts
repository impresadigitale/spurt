import * as express from 'express';
import {AuthRoute} from './AuthRouter';
import {HomeRoute} from './HomeRouter';
import {cashOnDeliveryRoute} from './CashondeliveryRouter';
import {PaypalRoute, PaypalNoAuthRoute} from './PaypalRouter';
import {RazorpayRoute, RazorpayNoAuthRoute} from './RazorpayRouter';
import {GmailRoute, GmailNoAuthRoute} from './GmailRouter';
import {FacebookRoute, FacebookNoAuthRoute} from './FacebookRouter';
import {StripeRoute, StripeNoAuthRoute} from './StripeRouter';

// API keys and Passport configuration
import * as passportConfig from '../config/passport';
import * as globalMiddleware from '../middlewares/environment';

interface IROUTER {
    path: string;
    middleware: any[];
    handler: express.Router;
}

export const ROUTER: IROUTER[] = [
    {
        handler: AuthRoute,
        middleware: [globalMiddleware.index],
        path: '/',
    },
    {
        handler: HomeRoute,
        middleware: [globalMiddleware.index , passportConfig.isAuthenticated],
        path: '/home',
    },
    {
        handler: cashOnDeliveryRoute,
        middleware: [globalMiddleware.index , passportConfig.isAuthenticated],
        path: '/CashOnDelivery',
    },
    {
        handler: PaypalRoute,
        middleware: [globalMiddleware.index , passportConfig.isAuthenticated],
        path: '/paypal',
    },
    {
        handler: PaypalNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/paypal-payment',
    },
    {
        handler: GmailRoute,
        middleware: [globalMiddleware.index , passportConfig.isAuthenticated],
        path: '/gmail',
    },
    {
        handler: GmailNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/gmail-login',
    },
    {
        handler: FacebookRoute,
        middleware: [globalMiddleware.index , passportConfig.isAuthenticated],
        path: '/facebook',
    },
    {
        handler: FacebookNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/facebook-login',
    },
    {
        handler: RazorpayRoute,
        middleware: [globalMiddleware.index , passportConfig.isAuthenticated],
        path: '/razorpay',
    },
    {
        handler: RazorpayNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/razorpay-payment',
    },
    {
        handler: StripeRoute,
        middleware: [globalMiddleware.index , passportConfig.isAuthenticated],
        path: '/stripe',
    },
    {
        handler: StripeNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/stripe-payment',
    },
];
