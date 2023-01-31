const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    UseUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 20;
        const camp = new Campground({
            author: '63cade3b0e4c8842da803155',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia excepturi minus placeat! Blanditiis quae facilis adipisci sed animi ipsum accusantium ipsa sint deserunt, unde eos, dicta non necessitatibus. Qui, quas?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drlyw1jux/image/upload/v1674663800/YelpCamp/xhq1ufyp4zbytcmijqdr.avif',
                    filename: 'YelpCamp/xhq1ufyp4zbytcmijqdr',

                },
                {
                    url: 'https://res.cloudinary.com/drlyw1jux/image/upload/v1674663799/YelpCamp/nunm5fhpul4dbrnvfixc.avif',
                    filename: 'YelpCamp/nunm5fhpul4dbrnvfixc',

                },
                {
                    url: 'https://res.cloudinary.com/drlyw1jux/image/upload/v1674663800/YelpCamp/gzx6cwpwk6b1m1xtabxk.avif',
                    filename: 'YelpCamp/gzx6cwpwk6b1m1xtabxk',

                },
                {
                    url: 'https://res.cloudinary.com/drlyw1jux/image/upload/v1674663800/YelpCamp/yuk2akffe7fdqp1v4gq4.avif',
                    filename: 'YelpCamp/yuk2akffe7fdqp1v4gq4',

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});