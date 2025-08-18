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

function loading() {
    let msg = document.getElementById("msg");
    let pic = document.getElementById("pic");
    let date = new Date();
    let hour = date.getHours();
    msg.innerHTML = `Agora são ${hour} horas`;

    if (hour >= 0 && hour < 12) {
        //bom dia
        typeWriter(kumo, "kumo diz bom dia!");
        pic.src = "imgs/caracol.gif";
        document.body.style.background = "#0391fd";
    } else if (hour >= 12 && hour < 18) {
        //boa tarde
        typeWriter(kumo, "kumo diz boa tarde!");
        pic.src = "imgs/caracol.gif";
        document.body.style.background = "#f5bb3f";
    } else {
        //boa noite
        typeWriter(kumo, "kumo está dormindo");
        pic.src = "imgs/caracolSleep.gif";
        document.body.style.background = "#040f99";
    }
}

window.onload = loading();
