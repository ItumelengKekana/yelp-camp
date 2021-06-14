const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '60b623f544f1de20fc6c593d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: [
                {
                    url: 'https://res.cloudinary.com/dkscwnhd9/image/upload/v1623144808/YelpCamp/rxgwqgwpjwty6zaud065.jpg',
                    filename: 'YelpCamp/rxgwqgwpjwty6zaud065'
                  },
                  {
                    url: 'https://res.cloudinary.com/dkscwnhd9/image/upload/v1623144808/YelpCamp/qlyzinsohcedwnrli1qs.jpg',
                    filename: 'YelpCamp/qlyzinsohcedwnrli1qs'
                  }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod consectetur quos commodi cum debitis cupiditate iusto at ipsa soluta voluptatum? Eaque inventore vero nostrum temporibus architecto quod, non voluptatem beatae.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})