// Function to add a new note to the localStorage
function addNoteToLocalStorage() {
    // Current Time
    let currentTime = new Date().toLocaleString();
    // New Data
    existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const newNote = {
        id: existingNotes.length + 1,
        time: currentTime,
        text: document.getElementById("new_text").value,
    }
    // Existing Notes
    existingNotes.push(newNote);

    // Set item
    localStorage.setItem("notes", JSON.stringify(existingNotes));

    console.log(localStorage.getItem("notes"));
    populateSection();
}

// Function to create and append div elements with textareas, save buttons, and delete buttons
function populateSection() {
    let section = document.getElementById("view");
    section.innerHTML = '';

    notes = JSON.parse(localStorage.getItem("notes"))
    
    notes.forEach((item, index) => {

        div = document.createElement("div");
        div.classList.add("d-flex", "items-center", "py-2","m-auto", "gap-2", "rounded-md")

        textarea = document.createElement("textarea");
        textarea.id = `note_${index}`;
        textarea.value = item.text;
        textarea.classList.add("rounded-md","form-control", "m-1");

        // Save button
        saveButton = document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.id = `save_${index}`;
        saveButton.classList.add("my-auto", "btn", "btn-primary");
        
        // Delete button
        deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.id = `delete_${index}`;
        deleteButton.classList.add("my-auto", "btn", "btn-danger");


        // For the Save Button
        saveButton.addEventListener("click", () => {
            new_text = document.getElementById(`note_${index}`).value;

            notes[index].text = new_text;
            // Update the localStorage value
            localStorage.setItem("notes", JSON.stringify(notes));
            console.log(localStorage.getItem("notes"));
        });

        // For the Delete Button
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

        // Append the textarea, save button, and delete button to the div
        div.appendChild(textarea);
        div.appendChild(saveButton);
        div.appendChild(deleteButton);

        // Append the div to the section
        section.appendChild(div);
    });
}

function saveNotes() {
    notes = JSON.parse(localStorage.getItem("notes"))
    time = new Date().toLocaleTimeString();
    updated_span = document.getElementById("time");
    // Save
    notes.forEach((item, index) => {
        new_text = document.getElementById(`note_${index}`).value;
        notes[index].text = new_text;

        // Update the localStorage value
        localStorage.setItem("notes", JSON.stringify(notes));
        console.log(localStorage.getItem("notes"));
    });
    // Update the time
    updated_span.innerText = time;
}


populateSection()
setInterval(saveNotes, 2000);