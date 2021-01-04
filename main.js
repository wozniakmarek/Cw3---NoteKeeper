class Note {
    constructor (title, content, color, pinned = false) {
        this.title = title;
        this.content = content;
        this.color = color;
        this.pinned = pinned;
        this.createDate = new Date();
        this.id = Date.now();
    }
}

class Notes {
    constructor (containerSelector) {
        this.note = new Note();
        this.notes = [];
        this.db = new Db();
        this.notesUI = new NotesUI(containerSelector);
    }

    addNote(note) {
        this.notes.push(note);
        this.db.saveNotes(this.notes);
        this.notesUI.addNote(note);
        this.notesUI.clearNoteTitleAndContent(note);
    }
    removeNote(id) {
        this.notes = this.notes.filter(el => el.id !== id);

        this.db.saveNotes(this.notes);
        this.notesUI.removeNote(id);
    }
    getNote(id) {
        return this.notes.find(el => el.id === id);
    } 
    getNotes() {
        return [...this.notes];
    }
}

class NotesUI {
    constructor(containerSelector = 'main') {
        this.notes = new Notes();
        this.notesContainer = document.querySelector(containerSelector);
    }

    addNote(note) {
        const htmlNote = this.createNote(note);
        const container = this.getNotesContainer();
        container.appendChild(htmlNote);
    }
    createNote(note) {
        const htmlNote = document.createElement('section');
        const htmlTitle = document.createElement('h3');
        const htmlContent = document.createElement('p');
        const htmlTime = document.createElement('time');
        const htmlButton = document.createElement('button');

        htmlNote.classList.add('note');
        htmlTitle.innerHTML = note.title;
        htmlContent.innerHTML = note.content;
        htmlTime.innerHTML = note.createDate.toLocaleString();
        htmlButton.innerHTML = 'Remove';
        htmlButton.classList.add('removeBtn');

        
        htmlNote.appendChild(htmlTitle);
        htmlNote.appendChild(htmlContent);
        htmlNote.appendChild(htmlTime);
        htmlNote.appendChild(htmlButton);
    }
    removeNote(id) {
        const note = this.getNote(id);
        const container = this.getNotesContainer();
        container.removeChild(note);
    }
    getNote(id) {
        return document.querySelector('#' + id);
    }
    getNotesContainer() {
        return this.notesContainer;
    }
    clearNoteTitleAndContent(){
        document.querySelector('#noteTitle').value = '';
        document.querySelector('#noteContent').value = '';
    }
}

class Db {
    constructor() {
        this.lsNotesKey = 'notes';
    }

    saveNotes(notes) {
        localStorage.setItem(this.lsNotesKey, JSON.stringify(notes));
    }
    getNotes() {
        if (localStorage.getItem(this.lsNotesKey) != null) {
            return JSON.parse(localStorage.getItem(this.lsNotesKey));
        }

    }
}
