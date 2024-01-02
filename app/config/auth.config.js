require('dotenv').config();

if (process.env.NODE_ENV === 'prod') {
    require('dotenv').config({ path: '.env.prod' });
    console.warn("Note :- you are on production server handle carefully ....!!")
} else if(process.env.NODE_ENV === 'dev') {
    require('dotenv').config({ path: '.env.dev' });
    console.warn("Note :- you are on development....!!")
}