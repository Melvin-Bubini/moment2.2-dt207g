"use strict";

let url = "http://127.0.0.1:3000/api/cv";

createCv("Nordic Green Design", "leverantör", "Spånga");
getData();


async function getData() {
    const response = await fetch(url);

    const data = await response.json();

    console.table(data);
}

async function createCv(companyname, jobtitle, location) {
    let cv = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(cv)
    });

    const data = await response.json();
    console.log(data);
}

document.getElementById('cvForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindra standardformulärinsändning
})