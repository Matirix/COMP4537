function populateReaderView() {
    section = document.getElementById("reader_view");
    data = JSON.parse(localStorage.getItem("notes"))
    console.log(data)

    data.forEach((item) => {
        div = document.createElement("div");
        div.classList.add("d-flex", "items-center", "py-2","m-auto", "gap-2", "rounded-md", "w-25")

        paragraph = document.createElement("p");
        paragraph.textContent = item.text;
        paragraph.classList.add("rounded-md","form-control", "m-1", "text-center", "bg-light");

        // Append the textarea, save button, and delete button to the div
        div.appendChild(paragraph);


        // Append the div to the section
        section.appendChild(div);
    });
}

populateReaderView();