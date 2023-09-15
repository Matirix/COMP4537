class Note {
    constructor(id, text) {
        this.id = id; // You can use a timestamp as an ID
        this.time = new Date().toLocaleString();
        this.text = text;
    }
}

export default class NoteManager {

    constructor(notes) {
        this.notes = notes;
    }

    attachEventListeners() {
        // Add Event Listener to the Add Button
        document.getElementById("add").addEventListener("click", () => this.addNoteToLocalStorage());
        console.log("Event Listener Added")
    }

    addNoteToLocalStorage() {
        // New Data    
        let notes = JSON.parse(localStorage.getItem("notes"))
        const newNote = new Note(
            notes.length + 1,
            document.getElementById("new_text").value,
        )
        // Existing Notes
        notes.push(newNote);
    
        // Set item
        localStorage.setItem("notes", JSON.stringify(notes));
    
        console.log(localStorage.getItem("notes"));
        this.populateSection();
    }

    generateSaveButton(index) {
        let saveButton = document.createElement("button");
        let notes = JSON.parse(localStorage.getItem("notes"))
        saveButton.innerText = "Save";
        saveButton.id = `save_${index}`;
        saveButton.classList.add("my-auto", "btn", "btn-primary");

        saveButton.addEventListener("click", () => {
            let new_text = document.getElementById(`note_${index}`).value;

            notes[index].text = new_text;
            // Update the localStorage value
            localStorage.setItem("notes", JSON.stringify(notes));
            console.log(localStorage.getItem("notes"));
        });
        return saveButton;
    }

    generateDeleteButton(index) {
        let deleteButton = document.createElement("button");
        let notes = JSON.parse(localStorage.getItem("notes"))
        deleteButton.innerText = "Delete";
        deleteButton.id = `delete_${index}`;
        deleteButton.classList.add("my-auto", "btn", "btn-danger");


        deleteButton.addEventListener("click", () => {
            // Remove the specific div from the DOM
            let selected_div = document.getElementById(`note_${index}`);
            let selected_del = document.getElementById(`delete_${index}`);
            let selected_save = document.getElementById(`save_${index}`);

            notes.splice(index, 1);
            // Update the localStorage value
            localStorage.setItem("notes", JSON.stringify(notes));
            selected_div.remove()
            selected_del.remove()
            selected_save.remove()
            console.log(localStorage.getItem("notes"));
        });
        return deleteButton;
    }
    generateTextArea(item, index) {
        let textarea = document.createElement("textarea");
        textarea.id = `note_${index}`;
        textarea.value = item.text;
        textarea.classList.add("rounded-md","form-control", "m-1");
        return textarea;
    }

    populateSection() {
        let section = document.getElementById("view");
        section.innerHTML = '';
        // Get the Notes
        let notes = JSON.parse(localStorage.getItem("notes"))
        
        // Creates a div for each note and then append it to the section.
        notes.forEach((item, index) => {
            let div = document.createElement("div");
            div.classList.add("d-flex", "items-center", "py-2","m-auto", "gap-2", "rounded-md")

            
            const saveButton = this.generateSaveButton(index);
            const deleteButton = this.generateDeleteButton(index);
            const textarea = this.generateTextArea(item, index);
    
            // Append the textarea, save button, and delete button to the div
            div.appendChild(textarea);
            // div.appendChild(saveButton);
            div.appendChild(deleteButton);
    
            // Append the div to the section
            section.appendChild(div);
        });
    }

    saveNotes() {
        let notes = JSON.parse(localStorage.getItem("notes"))
        let time = new Date().toLocaleTimeString();
        let updated_span = document.getElementById("time");
        // Save
        notes.forEach((item, index) => {
            let new_text = document.getElementById(`note_${index}`).value;
            notes[index].text = new_text;
    
            // Update the localStorage value
            localStorage.setItem("notes", JSON.stringify(notes));
            console.log(localStorage.getItem("notes"));
        });
        // Update the time
        updated_span.innerText = time;
    }
    
    
    // Get's the last saved object
    getLastSaved() {
        let notes = JSON.parse(localStorage.getItem("notes"))
        let timeSpan = document.getElementById("time");
        time.textContent = notes[notes.length - 1].time;
    }

    autoSave() {
        setInterval(this.saveNotes, 2000);
    }

    populateReaderView() {
        const section = document.getElementById("reader_view");
        let notes = JSON.parse(localStorage.getItem("notes"))
    
        notes.forEach((item) => {
            let div = document.createElement("div");
            div.classList.add("d-flex", "items-center", "py-2","m-auto", "gap-2", "rounded-md", "w-25")
    
            let paragraph = document.createElement("p");
            paragraph.textContent = item.text;
            paragraph.classList.add("rounded-md","form-control", "m-1", "text-center", "bg-light");
    
            // Append the textarea, save button, and delete button to the div
            div.appendChild(paragraph);
    
    
            // Append the div to the section
            section.appendChild(div);
        });
    }
}