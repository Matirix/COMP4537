import NoteManager from "./NoteManager.js";


const notes = JSON.parse(localStorage.getItem("notes"))
const noteManager = new NoteManager(notes);
noteManager.populateReaderView();
noteManager.getLastSaved();
setInterval(() => {
    let section = document.getElementById("reader_view");
    section.innerHTML = '';
    noteManager.populateReaderView();
    noteManager.getLastSaved();
    noteManager.saveNotestwo();
}, 2000);
