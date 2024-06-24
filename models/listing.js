const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
   description: String, 
    image:{
        type:String,
        default:
            "https://www.istockphoto.com/photo/india-gate-new-delhi-gm481632685-37560922?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fsunrise&utm_medium=affiliate&utm_source=unsplash&utm_term=sunrise%3A%3A%3A",
        set:(v)=> v===" "
        ? "https://www.istockphoto.com/photo/india-gate-new-delhi-gm481632685-37560922?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fsunrise&utm_medium=affiliate&utm_source=unsplash&utm_term=sunrise%3A%3A%3A"
        :v, 

    }, 
    price:Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
