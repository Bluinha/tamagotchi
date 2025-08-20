function typeWriter(element, text, speed = 80) {
    element.innerHTML = ""; // limpa antes
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

class Pet {
    constructor(name, birthDate, hungerStatus = 0, sprite) {
        this.name = name;
        this.birthDate = birthDate;
        this.hungerStatus = hungerStatus;
        this.maxAge = 7;
        this.maxHunger = 100;
        this.sprite = sprite;
    }

    getAge() {
        let years = new Date() - new Date(this.birthDate);
        return Math.floor(years / (1000 * 60 * 60 * 24));
    }

    isAlive() {
        //it dies of age or hungry
        if (this.getAge() >= this.maxAge) return false;
        if (this.hungerStatus <= 0) return false;

        return true;
    }
}

// == INITIAL STATE == //
const hatch = document.getElementById("hatch-btn");
const sprite = document.getElementById("sprite");
let isHatched = JSON.parse(localStorage.getItem("hatchedState")) || false;

//== HACHING EVENTS ==//
hatch.addEventListener("click", () => {
    //shows the pet
    sprite.src = "imgs/caracol.gif";

    //creates the object pet
    let today = new Date();
    let pet = new Pet("kumo", today, 0, sprite);

    //saves the pet in the storage
    localStorage.setItem("pet", JSON.stringify(pet));

    //changes the state
    isHatched = true;
    localStorage.setItem("hatchedState", JSON.stringify(isHatched));

    hatch.style.display = "none";
});

//== LOADING EVENTS ==//
function loadPet() {
    if (localStorage.getItem("pet")) {
        //recreates the pet
        savedPet = localStorage.getItem("pet");
        const data = JSON.parse(savedPet);
        let pet = new Pet(data.name, data.birthDate, data.hungerStatus, data.sprite);

        if (!pet.isAlive()) {
            alert("oh não, o kumo morreu!");
            localStorage.removeItem("pet");
            localStorage.removeItem("hatchedState");
            return;
        }
        //recreates the pet visually
        sprite.src = pet.sprite;
        hatch.style.display = "none";
    }
}

window.onload = loadPet;