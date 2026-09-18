const { GoogleGenAI } = require("@google/genai");
const readlineSync = require('readline-sync');

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const ConversationHistory=[];


async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: ConversationHistory
  });
  
  return response.text;
}


// Weather leke aayega

// http://api.weatherapi.com/v1/current.json?key=d3f0b77cffad4a18a12144348250509&q=London&aqi=no


async function getWeather(location) {

    const weatherInfo=[];

    for( const {city,date} of location){
        
     if(date.toLowerCase()=='today')
      { 
      const response=  await fetch(`http://api.weatherapi.com/v1/current.json?key=d3f0b77cffad4a18a12144348250509&q=${city}`);
      const data = await response.json();
      weatherInfo.push(data);
      }
      else{
      const response=  await fetch(`http://api.weatherapi.com/v1/current.json?key=d3f0b77cffad4a18a12144348250509&q=${city}&dt=${date}`);
      const data = await response.json();
      weatherInfo.push(data);
      }
    }
    
    return weatherInfo;
}

async function chatting() {
    
const question = readlineSync.question('How I can Help you--> ');

const prompt=`
You are an AI Agent, who will respond to me in JSON format only.
Analyse the user query and try to fetch city and date details from it.
Date format should be in(yyyy-month-date) if user ask for future weather.
If user ask for today weather, mark date as 'today'.
To fetch weather details, I already have some function which can fetch the weather details for me,

if you need weather information, use the below format
JSON  format should look like below:
{
 "weather_details_needed":true,
 "location":[{"city":"mumbai, "date":"today"},{"city":"delhi", "date":"2026-04-04"}];

}

As an LLM: you don't know current date: Mark Today date is 2025-11-22

Once you have the weather report details, respond me in JSON format only.
If i have provided you weather details of delhi and you have enough information about them, make the summary of weather report and return it to me like below.
JSON format should look like below:
{
 "weather_details_needed":false,
 "weather_report": "Bhai delhi der besh vlo, 20 degree tempareture, ghor er modde pitha banau khauya er jonno
}

User asekd this question: ${question}

Strictly follow JSON format, respond only in JSON format

`


ConversationHistory.push({
    role:"user",
    parts: [{text: prompt}]
})


while(true){

let response= await main();
ConversationHistory.push({role:'model', parts:[{text:response}]})
// console.log(response);
response=response.trim();
response = response.replace(/^```json\s*|```$/g, '').trim();
// console.log(response);
const data=JSON.parse(response);
// console.log(data);

if(data.weather_details_needed==false){
    console.log(data.weather_report);
    break;
}

const weatherInformation= await getWeather(data.location);
const weatherInfo=  JSON.stringify(weatherInformation); 
ConversationHistory.push({role:'user', parts:[{text:`This is ther weather report i have fetched for you, use this weather report to generate user response ${weatherInfo}`}]})

}

}

chatting();


// }

// Delhi ka mausam bata

// LLM ko Bolunga: Delhi and Mumbai ka mausam baata , return mein muje location wala array de dena

// [{city:"delhi", date:'today'} {city:"mumbai", date:'today'}];

// Location getweather  --> Actual weather laake de dega

// Actual weather aaya hai, LLM ko dunga, iska weather report card ready kar de

// User output mein show kara dunga


// first agent: Mausam ke baare mein btayega
// Blockchain chain
// Github profile leke aa sakta hai
// News API

