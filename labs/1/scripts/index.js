function addNoteToLocalStorage() {
    // Current Time
    let currentTime = new Date().toLocaleString();
    // New Data
    existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    newNote = {
        id: existingNotes.length + 1,
        time: currentTime,
        text: document.getElementById("new_text").value,
    }
    // Existing Notes
    existingNotes.push(newNote);

    // Set item
    localStorage.setItem("notes", JSON.stringify(existingNotes));

    console.log(localStorage.getItem("notes"));
    location.reload();
}


function saveEditedNote(index, newNote ) {
    

}


// Function to create and append div elements with textareas, save buttons, and delete buttons
function populateSection() {
    section = document.getElementById("view");
    data = JSON.parse(localStorage.getItem("notes"))

    data.forEach((item, index) => {

        div = document.createElement("div");
        div.classList.add("d-flex", "items-center", "py-2","m-auto", "gap-2", "rounded-md")

        textarea = document.createElement("textarea");
        textarea.id = `note_${index}`;
        textarea.value = item.text;
        textarea.classList.add("rounded-md","form-control", "m-1");

        // Save button
        saveButton = document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.classList.add("my-auto", "btn", "btn-primary");
        
        // Delete button
        deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("my-auto", "btn", "btn-danger");


        // For the Save Button
        saveButton.addEventListener("click", () => {
            new_text = document.getElementById(`note_${index}`).value;

            data[index].text = new_text;
            // Update the localStorage value
            localStorage.setItem("notes", JSON.stringify(data));
            console.log(localStorage.getItem("notes"));
            location.reload();
        });




        // For the Delete Button
        deleteButton.addEventListener("click", () => {
            // Remove the specific div from the DOM
            // Remove the corresponding item from the data array
            data.splice(index, 1);
            // Update the localStorage value
            localStorage.setItem("notes", JSON.stringify(data));
            console.log(localStorage.getItem("notes"));
            location.reload();
        });

        // Append the textarea, save button, and delete button to the div
        div.appendChild(textarea);
        div.appendChild(saveButton);
        div.appendChild(deleteButton);

        // Append the div to the section
        section.appendChild(div);
    });
}


// Call the function to populate the section with data
// setTimeout(() => {
    populateSection();
// }, 1000);
