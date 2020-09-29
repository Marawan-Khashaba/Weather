const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey = "d1cb408643374b4118c0dd0627decfc9";
  const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + query + "&appid=" + apiKey + "&units=metric"

  https.get(url,function(response){
  response.on("data",function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDescription= weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<p> The Weather Currently " + weatherDescription + "</p>");
    res.write("<h1>The Temperature in "+ query +" is "+temp + " degree Celcius.</h1>");
    res.write("<image src=" + imageUrl + ">")
    res.send();

  });

  });

});



app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
