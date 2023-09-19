import NoteManager from "./NoteManager.js";


const notes = JSON.parse(localStorage.getItem("notes"))
const noteManager = new NoteManager(notes);
noteManager.populateReaderView();
noteManager.getLastSaved();
noteManager.autoSave();
