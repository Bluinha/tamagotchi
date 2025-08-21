// sprites avaliable
const spritesImgs = {
    caracol: "imgs/caracol.gif",
};

//elements
const hatch = document.getElementById("hatch-btn");
const sprite = document.getElementById("sprite");

//global states
let isHatched = JSON.parse(localStorage.getItem("hatchedState")) || false;
let pet = null;

//================ CLASS PET ================
class Pet {
    constructor(
        name,
        birthDate,
        hungerStatus = 0,
        moodStatus = 0,
        sprite,
        lastUpdate = new Date()
    ) {
        this.name = name;
        this.birthDate = birthDate;
        this.sprite = sprite;
        this.hungerStatus = hungerStatus;
        this.moodStatus = moodStatus;
        this.maxAge = 7;
        this.maxHunger = 120;
        this.Maxsadness = 100;
        this.lastUpdate = lastUpdate;
        this.statusInterval = null;
    }

    getAge() {
        let years = new Date() - new Date(this.birthDate);
        return Math.floor(years / (1000 * 60 * 60 * 24));
    }

    updateStatus() {
        const now = new Date();
        timePassed = Math.floor((now - this.lastUpdate) / (1000 * 60 * 60));

        this.hungerStatus += 10 * timePassed; //To hours
        if (this.hungerStatus > this.maxHunger)
            this.hungerStatus = this.maxHunger;

        this.moodStatus += 5 * timePassed;
        if (this.moodStatus > this.Maxsadness)
            this.moodStatus = this.Maxsadness;

        this.lastUpdate = now;
        localStorage.setItem("pet", JSON.stringify(this));
    }

    isAlive() {
        if (this.getAge() >= this.maxAge) return false;
        if (this.hungerStatus == this.maxHunger) return false;
        if (this.hungerStatus == this.Maxsadness) return false;

        return true;
    }

    statusLoop() {
        this.statusInterval = setInterval(() => {
            this.updateStatus();
            loadInterface();

            if (!this.isAlive()) {
                clearInterval(this.statusInterval);
            }
        }, 60 * 1000);
    }
}

class food {
    constructor(name, satiation, FeedLimit) {
        this.name = name;
        this.satiation = satiation;
        this.FeedLimit = FeedLimit;
    }

    feeding() {}
}
//hatching
hatch.addEventListener("click", () => {
    //shows the pet
    sprite.src = "imgs/caracol.gif";

    //creates the object pet
    let today = new Date();
    pet = new Pet("kumo", today, 0, sprite);

    //saves the pet in the storage
    localStorage.setItem("pet", JSON.stringify(pet));

    //changes the state
    isHatched = true;
    localStorage.setItem("hatchedState", JSON.stringify(isHatched));

    hatch.style.display = "none";
    loadInterface();
});

//======== LOADINGS EVENTS ==========
function loadPet() {
    if (localStorage.getItem("pet")) {
        //recreates the pet
        savedPet = localStorage.getItem("pet");
        const data = JSON.parse(savedPet);
        pet = new Pet(
            data.name,
            data.birthDate,
            data.hungerStatus,
            data.moodStatus,
            data.sprite,
            data.lastUpdate
        );

        if (!pet.isAlive()) {
            alert("oh não, o  bichinho morreu!");
            localStorage.removeItem("pet");
            localStorage.removeItem("hatchedState");
            return;
        }
        //recreates the pet visually
        sprite.src = spritesImgs.caracol;
        hatch.style.display = "none";
    }
    loadInterface();
}

function loadInterface() {
    if (isHatched) {
        const carePainel = document.getElementById("nav-bar");
        carePainel.style.display = "block";

        let age = pet.getAge();
        let hunger = pet.hungerStatus;
        const statusBar = document.getElementById("status-bar");
        statusBar.innerHTML = `idade: ${age} fome: ${hunger}`;
    }
}

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

window.onload = loadPet;
