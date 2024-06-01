document.getElementById("voiceSearchBtn").addEventListener("click", function () {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function (event) {
        const query = event.results[0][0].transcript;
        document.getElementById("searchBar").value = query;
        // Trigger search based on the voice input
    };
});