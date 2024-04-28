"use strict";
let url = "http://127.0.0.1:3000/api/cv";
let cvArticle = document.getElementById("cvArticle");
getData(); // Hämta datan när sidan laddas
async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
        cvArticle.style.display = "block"; // Visa cvArticle om det finns data
        cvArticle.style.border = "2px solid black";
        cvArticle.style.padding = "1em";
        displayCvData(data.results); // Visa datan när den har hämtats
    } else {
        cvArticle.style.display = "none"; // Dölj cvArticle om det inte finns någon data
        cvArticle.style.border = "none";
        cvArticle.style.padding = "none";
    }
}
async function createCv(companyname, jobtitle, location) {
    let cv = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location
    };
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
function displayCvData(cvData) {
    cvArticle.innerHTML = ""; // Rensa tidigare data
    cvData.forEach((cv)=>{
        let cvElement = document.createElement("div");
        cvElement.classList.add("cv");
        let companyNameElement = document.createElement("h2");
        companyNameElement.textContent = cv.companyname;
        let jobTitleElement = document.createElement("p");
        jobTitleElement.textContent = "Jobbtitel: " + cv.jobtitle;
        let locationElement = document.createElement("p");
        locationElement.textContent = "Plats: " + cv.location;
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Ta bort";
        deleteButton.addEventListener("click", async ()=>{
            await deleteCv(cv.id); // Anropa funktionen för att ta bort CV-informationen
            getData(); // Uppdatera datan på skärmen efter borttagning
        });
        cvElement.appendChild(companyNameElement);
        cvElement.appendChild(jobTitleElement);
        cvElement.appendChild(locationElement);
        cvElement.appendChild(deleteButton); // Lägg till knappen för att ta bort
        cvArticle.appendChild(cvElement);
    });
}
async function deleteCv(cvId) {
    try {
        const response = await fetch(`${url}/${cvId}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Kunde inte ta bort CV fr\xe5n servern.");
        // Ta bort CV från skärmen
        const cvElement = document.getElementById(`cv_${cvId}`);
        if (cvElement) cvElement.remove();
        else console.warn(`CV med id ${cvId} hittades inte p\xe5 sk\xe4rmen.`);
        return true; // Returnera true om borttagningen lyckades
    } catch (error) {
        console.error("Ett fel uppstod vid borttagning av CV:", error);
        return false; // Returnera false om borttagningen misslyckades
    }
}
document.getElementById("cvForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Förhindra standardformulärinsändning
    let companyname = document.getElementById("companynameInput").value;
    let jobtitle = document.getElementById("jobtitleInput").value;
    let location = document.getElementById("locationInput").value;
    // Kontrollera om något obligatoriskt fält är tomt
    if (!companyname || !jobtitle || !location) {
        alert("V\xe4nligen fyll i alla f\xe4lt."); // Visa felmeddelande
        return; // Avbryt funktionen om ett fält är tomt
    }
    createCv(companyname, jobtitle, location);
    // Rensa inputfälten efter att CV-informationen har skickats
    document.getElementById("companynameInput").value = "";
    document.getElementById("jobtitleInput").value = "";
    document.getElementById("locationInput").value = "";
});

//# sourceMappingURL=index.aa69868b.js.map
