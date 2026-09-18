const { GoogleGenAI } = require("@google/genai");
const readlineSync = require('readline-sync');

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const ConversationHistory=[];


async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: ConversationHistory
  });
  
  return typeof response.text === 'function' ? response.text() : response.text;
}


// Weather Agent
async function getWeather(location) {

     if (!location || !Array.isArray(location)) return [{error: "Location list missing"}];

    const weatherInfo=[];
    for( const {city,date} of location){
     if(date.toLowerCase()=='today') { 
        try {
            const response=  await fetch(`http://api.weatherapi.com/v1/current.json?key=d3f0b77cffad4a18a12144348250509&q=${city}`);
            const data = await response.json();
            weatherInfo.push(data);
        } catch(e) { weatherInfo.push({error: "Data paini"}); }
      }
      else{
        try {
            const response=  await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d3f0b77cffad4a18a12144348250509&q=${city}&dt=${date}`);
            const data = await response.json();
            weatherInfo.push(data);
        } catch(e) { weatherInfo.push({error: "Data paini"}); }
      }
    }
    return weatherInfo;
}

// Crypto Agent
async function getCryptoPrice(coins) {

  if (!coins || !Array.isArray(coins)) return [{error: "Coin list missing"}];

    const cryptoInfo = [];
    for (const coin of coins) {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.toLowerCase()}&vs_currencies=usd`);
            const data = await response.json();
            cryptoInfo.push({ coin: coin, data: data });
        } catch (error) {
            cryptoInfo.push({ coin: coin, error: "Price paini" });
        }
    }
    return cryptoInfo;
}

// GitHub Agent
async function getGithubProfile(usernames) {

     if (!usernames || !Array.isArray(usernames)) return [{error: "Username list missing"}];

    const githubInfo = [];
    for (const user of usernames) {
        try {
            const response = await fetch(`https://api.github.com/users/${user}`, {
                headers: { 'User-Agent': 'node.js' }
            });
            const data = await response.json();
            githubInfo.push(data);
        } catch (error) {
            githubInfo.push({ username: user, error: "User paini" });
        }
    }
    return githubInfo;
}

async function chatting() {
    
const question = readlineSync.question('How I can Help you--> ');

const prompt=`
You are an AI Agent. Respond in JSON format only.
Analyse the user query and decide which tool (Weather, Crypto, GitHub) to use.

1. WEATHER:
Format: { "weather_details_needed": true, "location": [{"city": "mumbai", "date": "today"}] }

2. CRYPTO:
Convert coin name to full lowercase (btc -> bitcoin).
Format: { "crypto_details_needed": true, "crypto_coins": ["bitcoin"] }

3. GITHUB:
Format: { "github_details_needed": true, "github_usernames": ["hiteshchoudhary"] }

4. FINAL RESPONSE:
If you have the data, make "weather/crypto/github_details_needed": false.
Place your answer in "final_report".
Format:
{
 "weather_details_needed": false,
 "crypto_details_needed": false,
 "github_details_needed": false,
 "final_report": "Your funny and friendly response here..."
}

As an LLM: Assume Today is 2025-12-15.
User asked: ${question}

Strictly follow JSON format only.
`

ConversationHistory.push({
    role:"user",
    parts: [{text: prompt}]
})


while(true){

let response= await main();
response = response.trim().replace(/^```json\s*|```$/g, '').trim();
ConversationHistory.push({role:'model', parts:[{text:response}]})

let data;
try {
    data = JSON.parse(response);
} catch(e) { break; }


if(data.weather_details_needed==false && data.crypto_details_needed==false && data.github_details_needed==false){
    console.log(data.final_report);
    break;
}

// --- WEATHER SECTION ---
if (data.weather_details_needed) {
    const weatherInformation = await getWeather(data.location);
    const weatherInfo = JSON.stringify(weatherInformation);
    
    // Funny Instruction added here
    ConversationHistory.push({role:'user', parts:[{text:`Here is the weather report: ${weatherInfo}. 
    Please generate a funny, friendly 'Bhai-style' response (mix of Bengali/Hindi/English). 
    Example: "Bhai Delhi er obostha to tight, 20 degree temp, ghorer moddhe pitha banao ar chill koro."`}]})
}

// --- CRYPTO SECTION ---
 if (data.crypto_details_needed) {
    const cryptoInformation = await getCryptoPrice(data.crypto_coins);
    const cryptoInfo = JSON.stringify(cryptoInformation);

    // Funny Instruction added here
    ConversationHistory.push({role:'user', parts:[{text:`Here is the crypto price list: ${cryptoInfo}.
    Generate a response like a 'Pro Crypto Trader Bhai'. 
    If price is high, say "Chand e jacchi mama!". If low, say "Dhorjo dhoro, HODL koro!". 
    Keep it funny and informal.`}]})
}

// --- GITHUB SECTION ---
 if (data.github_details_needed) {
    const githubInformation = await getGithubProfile(data.github_usernames);
    const githubInfo = JSON.stringify(githubInformation);

    // Funny Instruction added here
    ConversationHistory.push({role:'user', parts:[{text:`Here is the GitHub profile details: ${githubInfo}.
    Generate a response like a 'Tech Lead Bhai'.
    If followers are high, say "Bhai er to onk fame!". If public repos are high, say "Coding machine ekta!".
    Make it respectful but funny.`}]})
}

}

}

chatting();










