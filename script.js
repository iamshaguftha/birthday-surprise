/* ==========================
      COUNTDOWN TIMER
========================== */

const birthday = new Date().getTime() + 10000;


const countdown = setInterval(() => {

    const now = new Date().getTime();

    const distance = birthday - now;

    if(distance <= 0){

      clearInterval(countdown);

      document.getElementById("countdown-screen").style.display="none";

      startLoading();

      return;

    }

    const days = Math.floor(distance / (1000*60*60*24));

    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds = Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").textContent=days;

    document.getElementById("hours").textContent=hours;

    document.getElementById("minutes").textContent=minutes;

    document.getElementById("seconds").textContent=seconds;

},1000);


/* ==========================
      LOADING ANIMATION
========================== */

function startLoading(){

    document.getElementById("loading-screen").style.display="flex";

    const progressBar=document.getElementById("progress-bar");

    const progressText=document.getElementById("progress-text");

    const loadingMessage=document.getElementById("loading-message");

    const status=document.getElementById("status-text");

    const messages=[

        "Collecting beautiful memories...",

        "Wrapping everything with love...",

        "Adding a little birthday magic...",

        "Almost ready..."

    ];

    let progress=0;
    let messageIndex=0;

    const loading=setInterval(()=>{

        progress++;

        progressBar.style.width=progress+"%";

        progressText.innerHTML=progress+"%";

        if(progress%25===0 && messageIndex<messages.length-1){

            messageIndex++;

            loadingMessage.innerHTML=messages[messageIndex];

        }

        if(progress>=100){

            clearInterval(loading);

            status.innerHTML="Welcome ❤️";

            setTimeout(()=>{

                document.getElementById("loading-screen").style.display="none";

                const lockScreen = document.getElementById("lock-screen");

                lockScreen.style.display = "block";

                setTimeout(() => {

                  lockScreen.style.opacity = "1";
                
                }, 50);

            },1200);

        }

    },35);

}


const correctPin = "0725";
let enteredPin = "";

const dots = document.querySelectorAll(".pin-dots span");
const keys = document.querySelectorAll(".key");
const card = document.querySelector(".card");

keys.forEach(key => {

    key.addEventListener("click", () => {

        const value = key.textContent;

        // Delete button
        if (value === "⌫") {
            if (enteredPin.length > 0) {
                enteredPin = enteredPin.slice(0, -1);
                updateDots();
            }
            return;
        }

        // Ignore tick for now
        if (value === "✓") return;

        // Max 4 digits
        if (enteredPin.length < 4) {
            enteredPin += value;
            updateDots();
        }

        // Check PIN automatically
        if (enteredPin.length === 4) {

            if (enteredPin === correctPin) {

                document.querySelector(".heart").textContent = "🔓";

                setTimeout(() => {
                    document.getElementById("lock-screen").style.display = "none";
                    document.getElementById("puzzle-intro").style.display = "flex";
                    // Next scene will come here
                }, 600);

            } else {

                card.classList.add("shake");

                setTimeout(() => {
                    card.classList.remove("shake");
                    enteredPin = "";
                    updateDots();
                    alert("Hmm... that's not our secret. ❤️");
                }, 500);

            }

        }

    });

});

function updateDots() {

    dots.forEach((dot, index) => {

        if (index < enteredPin.length) {
            dot.style.background = "#D4AF37";
        } else {
            dot.style.background = "#E4E4E4";
        }

    });

}

let puzzleSolved = false;

const pieces = document.getElementById("pieces");

const positions = [];

for (let i = 0; i < 9; i++) {
    positions.push(i);
}

// Shuffle
positions.sort(() => Math.random() - 0.5);

positions.forEach(pos => {

    const piece = document.createElement("div");

    piece.setAttribute("draggable", "false");

    piece.className = "piece";
   
    piece.dataset.correct = pos;

    piece.style.backgroundImage = "url('images/puzzle.jpeg')";
    piece.style.backgroundSize = "300px 300px";

    piece.style.backgroundPosition =
        `${-(pos % 3) * 100}px ${-Math.floor(pos / 3) * 100}px`;

    pieces.appendChild(piece);


});

let selectedPiece = null;

document.querySelectorAll(".piece").forEach(piece => {

    piece.addEventListener("click", () => {


        // First tap
        if(selectedPiece === null){

            selectedPiece = piece;
            piece.classList.add("selected");
            return;

        }

        // Same piece tapped again
        if(selectedPiece === piece){

            piece.classList.remove("selected");
            selectedPiece = null;
            return;

        }

        // Swap pieces
        const tempPosition = piece.style.backgroundPosition;
        const tempCorrect = piece.dataset.correct;

        piece.style.backgroundPosition = selectedPiece.style.backgroundPosition;
        piece.dataset.correct = selectedPiece.dataset.correct;

        selectedPiece.style.backgroundPosition = tempPosition;
        selectedPiece.dataset.correct = tempCorrect;


        // Remove highlight
        selectedPiece.classList.remove("selected");
        selectedPiece = null;

        // Check puzzle
        checkPuzzle();

    });

});

function checkPuzzle(){

    const allPieces = document.querySelectorAll(".piece");

    let solved = true;

    allPieces.forEach((piece,index)=>{

        const correctX = -(index % 3) * 100;
        const correctY = -Math.floor(index / 3) * 100;

        if(piece.style.backgroundPosition !== `${correctX}px ${correctY}px`){
            solved = false;
        }

    });

    if(solved && !puzzleSolved){

        puzzleSolved = true;

        // Disable all clicks/touches
        document.getElementById("pieces").classList.add("puzzle-locked");

        // Shine animation
        document.getElementById("puzzle-board").classList.add("completed");

        // Wait 1 second after the shine
        setTimeout(() => {

            // Hide the puzzle pieces
            document.getElementById("pieces").style.display = "none";

            // Show the complete image
            document.getElementById("final-image").style.display = "block";

        }, 1000);

        // Show birthday message
        setTimeout(() => {

            document.getElementById("birthday-text").style.display = "block";

            typeText("typing-title","Happy Birthday",120,()=>{

                setTimeout(()=>{

                    typeText("typing-name","MY JAAN ❤️",120,()=>{

                        document.getElementById("sparkles").style.display = "block";

                        setTimeout(() => {

                          document.getElementById("puzzle-screen").style.display = "none";

                          document.getElementById("envelope-screen").style.display = "flex";

                        },3000); 


                  });

               },400);

            });

        },1800);


    }


}

function typeText(elementId, text, speed, callback){

    const element = document.getElementById(elementId);

    element.innerHTML = "";

    let i = 0;

    const typing = setInterval(() => {

        element.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(typing);

            if(callback){
                callback();
            }

        }

    }, speed);

}

const envelope = document.getElementById("envelope");

envelope.addEventListener("click",()=>{

    envelope.classList.add("envelope-open");

    // Letter slowly comes out

    setTimeout(()=>{

        document
        .getElementById("letter-peek")
        .classList.add("show");

    },700);

    // Pause

    setTimeout(()=>{

        document.getElementById("envelope-screen").style.display = "none";

        document.getElementById("letter-screen").style.display="flex";

        document.getElementById("letter-screen").scrollIntoView({


            behavior:"smooth"

        });

        setTimeout(()=>{

            document.querySelector(".paper").style.opacity="1";

            document.querySelector(".paper").style.transform="translateY(0)";

            typeLetter(letterText,"letter-content",12);

        },600);

    },1900);

});

const letterText = `Happy Birthday, idiot. 🎉💖

Congratulations! 🥳
You're officially one year closer to becoming an uncle. 👴😂

Another year older... but somehow still the same person who never misses a chance to tease me, call me "Alien" and "Giddu," and yet still manages to make me smile.

I wasn't planning on writing a long letter because... well, you already know me. But today is special, and I couldn't let it pass without telling you a few things.

Today isn't just another day.
It's the day my favourite person came into this world, and for that, I'll always be grateful.


May Allah bless you with happiness, good health, success, peace, and everything your heart sincerely wishes for. May all your hard work be rewarded, and may every step you take bring you closer to your dreams.

Ameen. 🤍

I pray all your dreams come true...
except the ones where you win our arguments. 😏😂

You're lucky you met me...
otherwise who would've tolerated you for this long? 😌😂

Still...

You're my favourite headache. ❤️😂

I was going to write something really emotional...
but if I do, your ego will become impossible to handle. 😒😂

And yes...
consider this letter your birthday gift,
so don't ask for anything expensive. 🤭😂

You tease me 365 days a year,
so today I'll pretend to be nice.

Just today. 😌❤️

Thank you for always being there.
And for becoming my safe place.

I hope this year gives you countless reasons to smile, beautiful memories to cherish, endless blessings, and more happiness than you could ever imagine.

No matter how much we tease and fight with each other...

Just know that you'll always have a very special place in my heart.

Happy Birthday once again, Baby. ❤️🎂🎈✨

With lots of love,
best wishes,
and sooo muchhhhhhhh loveeeee... ❤️😘

Forever Yours,

Shakku ❤️`;

function typeLetter(text, elementId, speed){

    const element = document.getElementById(elementId);

    const button = document.getElementById("continue-btn");

    button.style.display = "none";

    element.innerHTML = "";

    const characters = [...text];

    let i = 0;

    function typing(){

        if(i < characters.length){

            element.innerHTML += characters[i];

            i++;

            setTimeout(typing, speed);

        }else{

            button.style.display = "block";

        }

    }

    typing();

}


/* ==========================
      START PUZZLE
========================== */

document
.getElementById("start-puzzle-btn")
.addEventListener("click",()=>{

    document.getElementById("puzzle-intro").style.display="none";

    document.getElementById("puzzle-screen").style.display="flex";

});


/* ==========================
      ENDING PAGE
========================== */

document
.getElementById("continue-btn")
.addEventListener("click",()=>{

    document.getElementById("letter-screen").style.display="none";

    document.getElementById("ending-screen").style.display="flex";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
