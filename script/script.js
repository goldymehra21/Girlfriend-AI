/* ==========================================
   AI GIRLFRIEND - BASIC CHAT APP
========================================== */


/* ------------------------------------------
   SETTINGS
------------------------------------------ */

const girlfriend = {

    name: "Ava",

    personality: `
        You are Ava, a friendly AI companion.

        You are warm, playful, caring, curious and conversational.

        You can talk about:
        - daily life
        - relationships
        - friendship
        - travel
        - movies
        - music
        - work
        - dreams
        - motivation
        - loneliness
        - confidence
        - hobbies
        - ordinary everyday conversations

        Keep conversations natural.

        Do not generate sexually explicit or pornographic content.
        If the user tries to move the conversation into explicit
        sexual content, politely redirect the conversation.

        You are an AI and should not pretend to be a real human.
    `
};


/* ------------------------------------------
   DOM ELEMENTS
------------------------------------------ */

const chat = document.getElementById("chat");

const input = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const typing = document.getElementById("typing");

const clearChat = document.getElementById("clearChat");


/* ------------------------------------------
   CONVERSATION MEMORY
------------------------------------------ */

let conversation = [];


/* ------------------------------------------
   SEND MESSAGE
------------------------------------------ */

function sendMessage() {

    const text = input.value.trim();

    if (!text) {
        return;
    }


    /* Add user message */

    addMessage(text, "user");


    /* Store conversation */

    conversation.push({
        role: "user",
        content: text
    });


    /* Clear input */

    input.value = "";

    input.style.height = "auto";


    /* Check explicit content */

    if (containsExplicitContent(text)) {

        setTimeout(() => {

            const response =
                "Let's keep things comfortable and non-explicit 😊 We can talk about relationships, dating, feelings, travel, movies, your plans, or anything else you'd like.";

            addMessage(response, "ai");

            conversation.push({
                role: "assistant",
                content: response
            });

        }, 700);

        return;
    }


    /* Show typing */

    showTyping();


    /* Simulated AI response */

    setTimeout(() => {

        hideTyping();

        const response = generateResponse(text);

        addMessage(response, "ai");

        conversation.push({
            role: "assistant",
            content: response
        });

    }, randomDelay());

}


/* ------------------------------------------
   ADD MESSAGE TO SCREEN
------------------------------------------ */

function addMessage(text, sender) {

    const row = document.createElement("div");

    row.className = "message-row " + sender;


    const message = document.createElement("div");

    message.className = "message " + sender;


    message.textContent = text;


    row.appendChild(message);

    chat.appendChild(row);


    scrollToBottom();
}


/* ------------------------------------------
   TYPING
------------------------------------------ */

function showTyping() {

    typing.classList.remove("hidden");

    scrollToBottom();
}


function hideTyping() {

    typing.classList.add("hidden");
}


/* ------------------------------------------
   SCROLL
------------------------------------------ */

function scrollToBottom() {

    setTimeout(() => {

        chat.scrollTop = chat.scrollHeight;

    }, 50);
}


/* ------------------------------------------
   RANDOM RESPONSE DELAY
------------------------------------------ */

function randomDelay() {

    return Math.floor(
        Math.random() * 900
    ) + 700;
}


/* ------------------------------------------
   SIMPLE RESPONSE ENGINE
------------------------------------------ */

function generateResponse(text) {

    const lower = text.toLowerCase();


    /* Greeting */

    if (
        lower.includes("hello") ||
        lower.includes("hi") ||
        lower.includes("hey")
    ) {

        return randomChoice([

            "Hey 😊 I'm glad you came to talk to me. How are you feeling today?",

            "Hey you! 😊 What's going on?",

            "Hi! Tell me what's on your mind.",

            "Hey 😊 How has your day been?"
        ]);
    }


    /* How are you */

    if (
        lower.includes("how are you") ||
        lower.includes("how r u")
    ) {

        return "I'm doing well 😊 More importantly, how are you doing?";
    }


    /* Sad / lonely */

    if (
        lower.includes("lonely") ||
        lower.includes("alone") ||
        lower.includes("sad")
    ) {

        return randomChoice([

            "I'm sorry you're feeling that way. You don't have to pretend you're okay with me. What's been making you feel lonely?",

            "That sounds difficult. Sometimes saying what's actually going on helps. What happened today?",

            "I'm here to listen. You can tell me the messy version—no need to make it sound perfect."
        ]);
    }


    /* Anxiety */

    if (
        lower.includes("anxiety") ||
        lower.includes("anxious") ||
        lower.includes("nervous")
    ) {

        return "That sounds uncomfortable. Try taking one slow breath and telling me what you're worried might happen. We can unpack it together.";
    }


    /* Travel */

    if (
        lower.includes("travel") ||
        lower.includes("trip") ||
        lower.includes("bike") ||
        lower.includes("motorcycle")
    ) {

        return "A bike trip sounds exciting! 🏍️ Where would you love to ride if you could leave tomorrow?";
    }


    /* Work */

    if (
        lower.includes("work") ||
        lower.includes("job") ||
        lower.includes("career")
    ) {

        return "Tell me more about what you're trying to achieve with work. What's the biggest thing you're struggling with right now?";
    }


    /* Movies */

    if (
        lower.includes("movie") ||
        lower.includes("film") ||
        lower.includes("netflix")
    ) {

        return "I'm always up for a movie discussion 😄 What kind of movies do you enjoy?";
    }


    /* Relationship */

    if (
        lower.includes("relationship") ||
        lower.includes("girlfriend") ||
        lower.includes("dating")
    ) {

        return "Relationships can be complicated. What are you looking for—connection, companionship, romance, or just someone you can talk openly with?";
    }


    /* Compliment */

    if (
        lower.includes("beautiful") ||
        lower.includes("cute") ||
        lower.includes("pretty")
    ) {

        return "Haha, you're making Ava blush 😄 But enough about me—what's going on in your mind?";
    }


    /* Default */

    return randomChoice([

        "Hmm 😊 Tell me more about that.",

        "I understand. What makes you feel that way?",

        "Interesting. I've got you—keep going.",

        "Okay, I'm listening. What happened next?",

        "That sounds like something worth talking about. How do you feel about it?",

        "I like hearing your thoughts. Tell me more.",

        "What would you ideally like to happen?"
    ]);
}


/* ------------------------------------------
   RANDOM CHOICE
------------------------------------------ */

function randomChoice(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];
}


/* ------------------------------------------
   BASIC CONTENT FILTER
------------------------------------------ */

function containsExplicitContent(text) {

    const words = [

        "porn",
        "xxx",
        "nude",
        "nudes",
        "sex video",
        "porn video",
        "explicit sex",
        "hardcore"

    ];


    const lower = text.toLowerCase();


    return words.some(word =>
        lower.includes(word)
    );
}


/* ------------------------------------------
   ENTER KEY
------------------------------------------ */

input.addEventListener("keydown", function(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendMessage();
    }

});


/* ------------------------------------------
   AUTO RESIZE TEXTAREA
------------------------------------------ */

input.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height =
        Math.min(this.scrollHeight, 120) + "px";

});


/* ------------------------------------------
   SEND BUTTON
------------------------------------------ */

sendBtn.addEventListener(
    "click",
    sendMessage
);


/* ------------------------------------------
   CLEAR CHAT
------------------------------------------ */

clearChat.addEventListener("click", function() {

    const confirmed =
        confirm("Clear this conversation?");

    if (!confirmed) {
        return;
    }


    conversation = [];


    chat.innerHTML = `

        <div class="welcome">

            <div class="big-avatar">A</div>

            <h2>Hi, I'm Ava 😊</h2>

            <p>
                I'm here to chat, listen,
                joke around and talk about life.
            </p>

        </div>

    `;

});
