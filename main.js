function lz(i) {
    return `${i}`.padStart(2, "0");
}

const elDate = document.querySelector("#Date")
const elTime = document.querySelector("#Time")

function showTextTime() {
    const now = new Date();
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

    const textDate = `${lz(now.getDate())} . ${lz((now.getMonth()+1))} . ${now.getFullYear()} (${days[now.getDay()]})`;
    const textTime = `${lz(now.getHours())} : ${lz(now.getMinutes())} : ${lz(now.getSeconds())}`;

    elDate.innerHTML = textDate;
    elTime.innerHTML = textTime;

    window.requestAnimationFrame(showTextTime);
}
window.requestAnimationFrame(showTextTime);


const localStorageNotesKey = 'notes';
let notes = [];

document.querySelector('#noteAdd').addEventListener('click', onNewNote)

function onNewNote() {
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    const color = document.querySelector('#color').value;
    const pin = document.querySelector('#pinned').checked;
    const note = {
        id: Math.random()*10000,
        title: title,
        content: content,
        colour: color,
        pinned: pin,
        createDate: new Date(),
    }

    notes.push(note);
    renderNote(note);
    // console.log(note);

    localStorage.setItem(localStorageNotesKey, JSON.stringify(notes));
}

const asidenotes = document.querySelector('aside');
asidenotes.innerHTML = 'Przypięte:';
const mainnotes = document.querySelector('main');
mainnotes.innerHTML = 'Nieprzypięte:';
CreateNote();

function SaveInLocalStorage(){
    localStorage.setItem(localStorageNotesKey, JSON.stringify(notes));
}

function LoadFromLocalStorage(){
    const notesFromStorage = JSON.parse(localStorage.getItem(localStorageNotesKey));
    converted = notesFromStorage.map( note => {
        note.createDate = new Date(note.createDate);
        return note;
    });
    return converted;
}

function removeNote(id) {
        notes = notes.filter(note => note.id !== id);

        // notes.splice(id,1)
        SaveInLocalStorage();
        // LoadFromLocalStorage();
        const aside = document.querySelector('aside');
        const main = document.querySelector('main');
        document.getElementById(id).remove();
        // aside.innerHTML=("Przypięte")
        // main.innerHTML=("Nierzypięte")
        // CreateNote()
}

function CreateNote() {
    const converted = LoadFromLocalStorage();
    console.log(converted);

    for (const note of converted) {
        renderNote(note);
    }
}

function renderNote(note) {
    const htmlSection = document.createElement('section');
    const htmlTitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlData = document.createElement('time');
    const htmlButton = document.createElement('button');

    htmlSection.id = note.id;
    htmlSection.style.backgroundColor = note.colour;

    htmlTitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlData.innerHTML = note.createDate.toLocaleString();
    htmlButton.classList.add('remove');
    htmlButton.onclick = () => removeNote(note.id);
    htmlButton.innerHTML = 'Remove';

    htmlSection.appendChild(htmlTitle);
    htmlSection.appendChild(htmlContent);
    htmlSection.appendChild(htmlData);
    htmlSection.appendChild(htmlButton);

    if(note.pinned) {
        asidenotes.appendChild(htmlSection);
    } else {
        mainnotes.appendChild(htmlSection);
    }
}