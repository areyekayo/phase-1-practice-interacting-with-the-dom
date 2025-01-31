const counterElement = document.getElementById("counter")
const minus = document.getElementById("minus")
const heart = document.getElementById("heart")
const plus = document.getElementById("plus")
const pause = document.getElementById("pause")
const likes = document.querySelector(".likes")
const likedNumbers = {};
const comments = document.getElementById("list")

document.addEventListener("DOMContentLoaded", function () {
    //set interval and isPaused to track pausing/resuming the counter
    let interval;
    let isPaused = false;
    let form = document.querySelector("form")


    function startCounter() {
        interval = setInterval(incrementCounter, 1000);
    }
    //start the interval
    startCounter();

    //add event listener on the comment form
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const commentValue = document.getElementById("comment-input").value;
        let p = document.createElement("p");
        p.textContent = commentValue;
        comments.append(p);
    
    })

    pause.addEventListener("click", function () {
        let pauseText = pause.textContent;
        let buttons = document.querySelectorAll("button");

        if (pauseText === " pause "){
            //clear the interval if the pause button has "pause"
            clearInterval(interval);
            //change the pause button to "resume"
            pause.textContent = " resume ";
            isPaused = true;

            //loop through all buttons except pause button and disable them
            buttons.forEach((button) => {
                if (button !== pause){
                    button.disabled = true;
                }
            });
        } else if (pauseText === " resume " && isPaused){
            //start counter again if resume is clicked
            startCounter();
            //reset the pause button text to "pause"
            pause.textContent = " pause ";
            isPaused = false;
            //loop through all buttons except pause and enable them
            buttons.forEach((button) => {
                if (button !== pause){
                    button.disabled = false;
                }
            })
        };
    });

});

//decrement the counter when minus button is clicked
minus.addEventListener("click", decrementCounter);

//increment the counter when plus button is clicked
plus.addEventListener("click", incrementCounter);

heart.addEventListener("click", () => {
    //get the countNumber displayed when heart is clicked
    let countNumber = counterElement.textContent;

    //check to see if the counter number has not been liked yet
    if (!likedNumbers[countNumber]){
        //add the count number to likedNumbers object with value of 1 like
        likedNumbers[countNumber] = 1
        //create li element, set its ID to the count number, add text content, and append to likes node list
        let like = document.createElement("li")
        like.id = countNumber;
        like.textContent = `${countNumber} has been liked ${likedNumbers[countNumber]} time`;
        likes.append(like);
    } 
    else if (likedNumbers[countNumber]) {
        //if the number has already been liked, get the liked number's li element, increment the number of likes in likedNumbers object, and update the text content
        let like = document.getElementById(countNumber)
        likedNumbers[countNumber]++;
        like.textContent = `${countNumber} has been liked ${likedNumbers[countNumber]} times`
    } 
});


function incrementCounter() {
    //turn counter element to a number
    let counter = Number(counterElement.textContent);
    //increment the counter by 1
    counter++;
    //update the text content of the element to the new number
    counterElement.textContent = counter;
}

function decrementCounter() {
    //turn counter element to a number
    let counter = Number(counterElement.textContent);
    //decrement the counter by 1
    counter--;
    //update the text content of the element to the new number
    counterElement.textContent = counter;
}