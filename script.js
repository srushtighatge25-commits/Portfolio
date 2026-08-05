/*====================================================
        MOBILE NAVIGATION
====================================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu after clicking a link */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/*====================================================
        TYPING EFFECT
====================================================*/

const words = [

    "Software Developer",

    "AI & ML Student",

    "Machine Learning Enthusiast",

    "Problem Solver"

];


let wordIndex = 0;

let charIndex = 0;

let isDeleting = false;


const typing = document.querySelector(".typing");


function typeEffect() {

    if (!typing) return;


    const currentWord = words[wordIndex];


    if (!isDeleting) {

        typing.textContent =
            currentWord.substring(0, charIndex++);


        if (charIndex > currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1200);

            return;

        }

    }

    else {

        typing.textContent =
            currentWord.substring(0, charIndex--);


        if (charIndex < 0) {

            isDeleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;

            charIndex = 0;

        }

    }


    setTimeout(

        typeEffect,

        isDeleting ? 45 : 90

    );

}


typeEffect();