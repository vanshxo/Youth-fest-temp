document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading");
    const content = document.getElementById("content");
    const title = document.getElementById("youthfest-title");
    const preRegisterButton = document.getElementById('pre-register-btn');
    const typingContent = document.getElementById('typing-content');

    // Simulate loading animation and show content
    setTimeout(() => {
        loadingScreen.style.display = "none"; // Hide the loading screen
        content.style.display = "flex"; // Show the main content

        // Animate title letters (drop-in effect)
        const text = "Youthfest 2025";
        title.innerHTML = ""; // Clear initial text
        [...text].forEach((char, i) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char; // Handle spaces
            span.style.animation = `dropIn 0.5s ease ${i * 0.05}s forwards`;
            title.appendChild(span);
        });
    }, 2000); // 2 seconds loading duration

    // Countdown timer logic for January 11, 2025
    const countdownDate = new Date("2025-01-11T00:00:00").getTime();

    function updateTimer() {
        const now = Date.now();
        const distance = countdownDate - now;

        if (distance <= 0) {
            document.querySelector(".timer").innerHTML = "Event Started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = `${days}D`;
        document.getElementById("hours").textContent = `${hours}H`;
        document.getElementById("minutes").textContent = `${minutes}M`;
        document.getElementById("seconds").textContent = `${seconds}S`;
    }

    updateTimer(); // Initialize the countdown
    setInterval(updateTimer, 1000); // Update every second

    // Start typing animation after content is shown
    const text = typingContent.textContent; // Get the content from the <div> tag
    typingContent.textContent = ''; // Clear the text initially
    const words = text.split(' '); // Split the content into words
    let wordIndex = 0;

    // Ensure the typing container is visible
    typingContent.style.opacity = 1;

    // Function to type the next word
    function typeNextWord() {
        if (wordIndex < words.length) {
            let word = words[wordIndex];
            let span = document.createElement('span');
            span.textContent = word + ' '; // Append space after each word
            span.style.opacity = 0; // Hide word initially
            typingContent.appendChild(span);

            // Apply typing animation to each word
            span.style.animation = `typing 0.1s steps(${word.length}) ${wordIndex * 0.1}s forwards, blink-caret 0.75s step-end infinite`;

            wordIndex++; // Move to the next word
            setTimeout(typeNextWord, 100); // Call the function to type the next word with lightning-fast speed
        } else {
            // Once all words are typed, show the pre-register button
            setTimeout(() => {
                preRegisterButton.style.opacity = 1; // Fade-in the pre-register button
                preRegisterButton.style.transition = 'opacity 1s ease-in-out';
            }, 500); // Fade-in delay after typing finishes
        }
    }

    // Start typing the first word after a slight delay
    setTimeout(typeNextWord, 1000); // Start typing after a shorter delay
});
