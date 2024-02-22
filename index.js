const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const noteList = document.getElementById("noteList");

document.addEventListener("DOMContentLoaded", function () {
  loadNotes();
});

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  noteList.innerHTML = "";
  notes.forEach(function (note) {
    addNoteToList(note);
  });
}

function addNoteToList(note) {
  const li = document.createElement("li");
  li.textContent = note;
  noteList.appendChild(li);
}

function saveNoteToLocalStorage(note) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function removeNoteFromLocalStorage(noteText) {
  const notes = JSON.parse(localStorage.getItem("notes"));

  const filteredNotes = notes.filter(function (note) {
    return note !== noteText;
  });

  localStorage.setItem("notes", JSON.stringify(filteredNotes));
}

noteForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const noteText = noteInput.value.trim();

  if (noteText !== "") {
    addNoteToList(noteText);
    saveNoteToLocalStorage(noteText);
    noteInput.value = "";
  }
});

noteList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const noteText = event.target.textContent;
    event.target.remove();
    removeNoteFromLocalStorage(noteText);
  }
});
