const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const text_speak = new SpeechSynthesisUtterance(sentence);

    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}  
  

function wishMe() {
    var day = new Date();
    var hr = day.getHours();

    if(hr >= 0 && hr < 12) {
        speak("Good Morning");
    }

    else if(hr == 12) {
        speak("Good noon ");
    }

    else if(hr > 12 && hr <= 16) {
        speak("Good Afternoon ");
    }

    else {
        speak("Good Evening");
    }
}

function getWeather(city) {
    const apiKey = '2dbc88bda6faefa5fb5a0b986af22e57'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.cod === "404") {
            const finalText = "Sorry, I could not find weather information for that city.";
            speak(finalText);
        } else {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const finalText = `The weather in ${city} is currently ${weatherDescription} with a temperature of ${temperature} degrees Celsius.`;
            speak(finalText);
        }
    })
    .catch(error => {
        console.error('Error fetching weather:', error);
    });
}

function getJoke() {
    const apiUrl = 'https://official-joke-api.appspot.com/random_joke';

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const setup = data.setup;
        const punchline = data.punchline;
        const finalText = `Here's a joke: ${setup}... ${punchline}`;
        speak(finalText);
    })
    .catch(error => {
        console.error('Error fetching joke:', error);
    });
}

function getRandomQuote() {
    const apiUrl = 'https://api.quotable.io/random';

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const quote = data.content;
        const author = data.author;
        const finalText =`Here's the quote: ,"${quote}" `; //- ${author}
        speak(finalText);
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
    });
}

function getRandomImage() {
    const apiUrl = 'https://api.unsplash.com/photos/random';
    const accessKey = '-utmIIuT63pRvo4TNpV3Ai2qAhK3wwtw20AM9cEK19c'; // Replace with your Unsplash access key

    fetch(apiUrl, {
        headers: {
            'Authorization': `Client-ID ${accessKey}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const imageUrl = data.urls.regular;
        const finalText = "Here is the random image";
        speak(finalText);
        window.open(imageUrl, '_blank'); // Open the image URL in a new tab
    })
    .catch(error => {
        console.error('Error fetching random image:', error);
    });
}

function getWikipediaSummary(topic) {
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const summary = data.extract;
        const finalText = `According to Wikipedia, ${summary}`;
        speak(finalText);
    })
    .catch(error => {
        console.error('Error fetching Wikipedia summary:', error);
    });
}

function getRandomTriviaQuestion() {
    const apiUrl = 'https://opentdb.com/api.php?amount=1';

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const question = data.results[0].question;
        const correctAnswer = data.results[0].correct_answer;
        const finalText = `Here's a random trivia question: ${question}. The correct answer is ${correctAnswer}`;
        speak(finalText);
    })
    .catch(error => {
        console.error('Error fetching random trivia question:', error);
    });
}

function getRandomRecipe() {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const recipe = data.meals[0];
        const recipeName = recipe.strMeal;
        const youtube_link = recipe.strYoutube;
        const finalText = `Here's a random recipe: ${recipeName}. The YouTube link for the recipe is opening.`;

        speak(finalText);

        // Wait for 5 seconds (5000 milliseconds)
        setTimeout(() => {
            // Open YouTube link in a new window after delay
            window.open(youtube_link, '_blank');
        }, 10000);
    })
    .catch(error => {
        console.error('Error fetching random recipe:', error);
    });
}


window.addEventListener('load', ()=>{
    speak("Activating Aspen");
    speak("Going online");
    wishMe();
})

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    speakThis(transcript.toLowerCase());
}

btn.addEventListener('click', ()=>{
    recognition.start();
})

function speakThis(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I did not understand what you said please try again";

    if(message.includes('hey') || message.includes('hello') || message.includes('hi')) {
        const finalText = "Hello, how Can I help you today?";
        speech.text = finalText;
    }

    else if(message.includes('climate')) {
        const city = message.split("climate")[1].replace(".", "").trim();
        getWeather(city);
        speech.text= "";
    }

    else if(message.includes('joke')) {
        getJoke();
        speech.text = "";
    }

    else if(message.includes('random image')) {
        getRandomImage();
        speech.text = "";
    }

    else if(message.includes('quote')) {
        getRandomQuote();
        speech.text = "";
    }

    else if(message.includes('summary')) {
        const topic = message.split("summary")[1].replace(".","").replace("of","").trim();
        getWikipediaSummary(topic);
        speech.text = "";
    }

    else if(message.includes('question')) {
        getRandomTriviaQuestion();
        speech.text ="";
    }

    else if(message.includes('recipe')) {
        getRandomRecipe();
        speech.text ="";
    }

    else if(message.includes('how are you')) {
        const finalText = "I am fine, tell me how can i help you?";
        speech.text = finalText;
    }

    else if(message.includes('name')) {
        const finalText = "My name is Aspen";
        speech.text = finalText;
    }

    else if(message.includes('open youtube')) {
        window.open("https://www.youtube.com/", "_blank");
        const finalText = "Opening youtube";
        speech.text = finalText;
    }

    else if(message.includes('find on youtube')) {
        window.open(`https://www.youtube.com/search?q=${message.replace("find on youtube ", "").replace("about ","").replace("?","").replace(".","").replace("regarding ","")}`, "_blank");
        const finalText = "This is what i found on youtube regarding "+message.replace("find on youtube ", "").replace("about ","").replace("?","").replace(".","").replace("regarding ","") ;
        speech.text = finalText;
    }

    else if(message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "Opening Google";
        speech.text = finalText;
    }

    else if(message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Opening instagram";
        speech.text = finalText;
    }
    
    else if(message.includes('time right now')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speech.text = finalText;
    }
    
    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric", year: "numeric"})
        const finalText = date;
        speech.text = finalText;
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace("what is", "+").replace("who is","").replace("?","").replace("what are ","")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message.replace("what is","").replace("who is","").replace("?","").replace("what are ","");
        speech.text = finalText;
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia","").replace(",","").replace(".","").replace("search on","").replace("regarding ","").replace("about ","")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message.replace("wikipedia","").replace(",","").replace(".","").replace("search on","").replace("regarding ","").replace("about ","");
        speech.text = finalText;
    }

    else if(message.includes('where is') || message.includes('on map')) {
        window.open(`https://www.google.co.in/maps/search/${message.replace("where is", "").replace("?","").replace("on map","").replace(".","")}`, "_blank");
        const finalText = "This is what i found on google maps regarding" + message.replace("where is","").replace("on map","");
        speech.text = finalText;
    }

    else if(message.includes('open calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speech.text = finalText;
    }

    else if(message.includes('bye') || message.includes('exit')) {
        const finalText = "Goodbye, see you soon";
        speech.text = finalText;
    }


    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
}