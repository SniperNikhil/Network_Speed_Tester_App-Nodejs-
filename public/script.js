const socket = io();
let intervalId;
let intervalId1;
var back = document.getElementById("back");

back.addEventListener('click',() =>{
    window.location.reload()
    // var end = document.getElementById("end");
    // end.style.display = "none";
    // var start = document.getElementById("start");
    // start.style.display = ""
    // back.style.display = "none"
})

document.getElementById('startButton').addEventListener('click', function () {
    var start = document.getElementById("start");
    start.style.display = "none"

    
    back.style.display = "block"

    var end = document.getElementById("end");
    end.style.display = "grid";
    // Create the video element
    var videoElement = document.createElement('video');
    videoElement.setAttribute('autoplay', true);
    // videoElement.setAttribute('loop', true);
    videoElement.setAttribute('muted', true);
    videoElement.setAttribute('plays-inline', true);

    var sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', 'fireanime.mp4');
    sourceElement.setAttribute('type', 'video/mp4');

    videoElement.appendChild(sourceElement);

    videoElement.playbackRate = 0.8;

    // Find the parent element where the video should be inserted
    var parentElement = document.querySelector('.main');

    // Uncomment the video element by replacing the commented code

    parentElement.appendChild(videoElement);

    videoElement.addEventListener('ended', function () {
        // Remove the video element from the parent element
        parentElement.removeChild(videoElement);
    });

    socket.emit("network")

    //Download Speed
    var currentNumber = 0; // Start from 41
    var maxNumber = 200; // Maximum number
    var minNumber = 30; // Minimum number

    // Function to update the label with the next random increment or decrement
    function updateNumber() {
        var numLabel = document.getElementById('numLabel');
        // Generate a random number between -5 and 5
        var randomIncrement = Math.floor(Math.random() * 11) - 5;
        currentNumber += randomIncrement; // Increment/Decrement the current number
        // Ensure the number stays within the range
        currentNumber = Math.min(Math.max(currentNumber, minNumber), maxNumber);

        numLabel.textContent = currentNumber;
    }

    // Call the updateNumber function every 1000 milliseconds (1 second)
    intervalId = setInterval(updateNumber, 100);


    //Upload Speed
    var currentNumber1 = 0; // Start from 41
    var maxNumber1 = 30; // Maximum number
    var minNumber1 = 0; // Minimum number

    // Function to update the label with the next random increment or decrement
    function updateNumber1() {
        var numLabel1 = document.getElementById('numLabel1');
        // Generate a random number between -5 and 5
        var randomIncrement = Math.floor(Math.random() * 11) - 5;
        currentNumber1 += randomIncrement; // Increment/Decrement the current number
        // Ensure the number stays within the range
        currentNumber1 = Math.min(Math.max(currentNumber1, minNumber1), maxNumber1);

        numLabel1.textContent = currentNumber1;
    }

    // Call the updateNumber function every 1000 milliseconds (1 second)
    intervalId1 = setInterval(updateNumber1, 100);
});

socket.on("speed", (downloadSpeed, uploadSpeed) => {
    var numLabel = document.getElementById('numLabel');
    var numLabel1 = document.getElementById('numLabel1');
    var element = document.querySelector('.downloadspeed');
    var element1 = document.querySelector('.uploadspeed');
    // Remove the animation property
    element.style.animation = 'none';
    element1.style.animation = 'none';

    clearInterval(intervalId);
    clearInterval(intervalId1);

    numLabel.textContent = downloadSpeed;
    numLabel1.textContent = uploadSpeed;
})