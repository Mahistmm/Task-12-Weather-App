const express = require("express");
const app  = express();
const bodyparser = require("body-parser");
const https = require("https");
// const { response } = require("express");

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"))


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.post("/data",(req,res)=>{
    const city = req.body.city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e0e83b0c17ddaf027f15d443e0c5e69a`
    https.get(url,(response)=>{
        response.on("data",(data)=>{
         const weather = JSON.parse(data)
         res.render("weather",{
            name: weather.name,
            temp:weather.main.temp,
            temp_min:weather.main.temp_min,
            temp_max:weather.main.temp_max,
            humidity:weather.main.humidity

         })
        })
    })
})

app.listen( process.env.PORT || 4000,()=>{
    console.log("Server is up and running");
})