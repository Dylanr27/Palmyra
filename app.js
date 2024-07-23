import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import connectDB from './src/config/database.js';
import { insertData } from './scripts/seedDb.js';
import passport from 'passport';
import authRoutes from './src/routes/auth-routes.js';
import eventController from './src/controllers/event-controller.js';
import eventRoutes from './src/routes/event-routes.js';
import menuItemController from './src/controllers/menu-item-controller.js';
import menuItemRoutes from './src/routes/menu-item-routes.js';
import Photo from './src/models/Photo.js';
import photoRoutes from './src/routes/photo-routes.js';
import feedbackRouter from './src/routes/feedback.js';
import setupGoogleAuth from './src/config/googleAuth.js';

config();

connectDB().then(insertData);

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Note: In production, set secure to true
}));

app.use(passport.initialize());
app.use(passport.session());

setupGoogleAuth(app);

function isUserAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

app.use('/auth', authRoutes);
app.use('/events', isUserAuthenticated, eventRoutes);
app.use('/menu-items', isUserAuthenticated, menuItemRoutes);
app.use('/photos', isUserAuthenticated, photoRoutes);
app.use('/submit-feedback', feedbackRouter);

app.get('/', async (req, res) => {
    try {
        const events = await eventController.listEvents();
        const menuItems = await menuItemController.listMenuItems();
        const businessPhotos = await Photo.find({ group: 'Business' });
        const customerPhotos = await Photo.find({ group: 'Customer' });

        const userIsAuthorized = req.isAuthenticated();

        console.log('User is authorized:', userIsAuthorized);

        res.render('index', {
            events: events,
            menuItems: menuItems,
            businessPhotos: businessPhotos,
            customerPhotos: customerPhotos,
            userIsAuthorized: userIsAuthorized
        });
    } catch (error) {
        console.error('Fetch Failed:', error);
        res.status(500).send('Server error');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));