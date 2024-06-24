const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride= require("method-override");
const ejsMate = require("ejs-mate");

const Mongo_url = 'mongodb://127.0.0.1:27017/wanderlust';
main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(Mongo_url);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("I am host");
});

//Index Route
app.get("/listings",async(req,res)=>{
   const allListings =await Listing.find({})
    res.render("listings/index.ejs",{allListings});
});

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
// Show Route 
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    console.log(listing)
    res.render("listings/show.ejs",{listing})
});
 //CreateRoute
app.post("/listings",async(req,res)=>{

// let listing = req.body;
const newListing= new Listing(req.body.listing);
await newListing.save();
res.redirect("listings");
// console.log(listing);

});

// Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id",async(req,res)=>{
let {id}= req.params;
await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect("/listings");

});

//Delete Route
app.delete("/listings/:id",async(req,res)=>{
    let {id}= req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listing");
})

// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listening({
//         title:"My New Villa",
//         description:"By the Beach",
//         price:12000,
//         location:"Calangute, Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("Sample was Saved");
//     res.send("Successful Testing");
// })
app.listen(8080,()=>{
    console.log("Server is listening to port 8080");

});