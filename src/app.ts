import express, { Application, static as staticRoute } from 'express';
import logger from 'morgan';

const app: Application = express();

app.set('views', __dirname + '/views');
app.locals.basedir = app.get('views');
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use('/assets', staticRoute(__dirname + '/assets'));

app.get('/', (req, res) => {
    res.render('root');
});

app.use((req, res) => {
    if (!res.headersSent) {
        res.status(301).redirect('/');
    }
});

export default app;
