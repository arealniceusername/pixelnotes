document.addEventListener('DOMContentLoaded', () => {
    // API URL - change this if your backend runs on a different port
    const API_URL = 'http://localhost:3000/api/notes';
    
    // DOM elements
    const notesContainer = document.getElementById('notes-container');
    const noteContent = document.getElementById('note-content');
    const addNoteBtn = document.getElementById('add-note');
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Default selected color
    let selectedColor = '#FFD700'; // Gold
  
    // Add click event to color options
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selected class from all options
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        // Add selected class to clicked option
        option.classList.add('selected');
        // Set selected color
        selectedColor = option.getAttribute('data-color');
      });
    });
    
    // Select default color
    colorOptions[0].classList.add('selected');
  
    // Load notes when page loads
    fetchNotes();
  
    // Add note event listener
    addNoteBtn.addEventListener('click', addNote);
  
    // Fetch all notes from API
    async function fetchNotes() {
      try {
        const response = await fetch(API_URL);
        const notes = await response.json();
        
        // Clear notes container
        notesContainer.innerHTML = '';
        
        // Add each note to the DOM
        notes.forEach(note => {
          const noteElement = createNoteElement(note);
          notesContainer.appendChild(noteElement);
        });
      } catch (error) {
        console.error('Error fetching notes:', error);
        alert('Failed to load notes. Please try again later.');
      }
    }
  
    // Add a new note
    async function addNote() {
      const content = noteContent.value.trim();
      
      if (!content) {
        alert('Please write something in your note!');
        return;
      }
      
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content,
            color: selectedColor
          })
        });
        
        if (response.ok) {
          // Clear textarea
          noteContent.value = '';
          // Refresh notes
          fetchNotes();
        } else {
          alert('Failed to add note. Please try again.');
        }
      } catch (error) {
        console.error('Error adding note:', error);
        alert('Failed to add note. Please try again later.');
      }
    }
  
    // Delete a note
    async function deleteNote(id) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          // Refresh notes
          fetchNotes();
        } else {
          alert('Failed to delete note. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again later.');
      }
    }
  
    // Create a note DOM element
    function createNoteElement(note) {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note';
      noteDiv.style.backgroundColor = note.color;
      
      // Format date
      const date = new Date(note.createdAt);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      
      noteDiv.innerHTML = `
        <div class="note-content">${note.content}</div>
        <div class="note-date">${formattedDate}</div>
        <button class="delete-note">×</button>
      `;
      
      // Add delete event listener
      const deleteBtn = noteDiv.querySelector('.delete-note');
      deleteBtn.addEventListener('click', () => deleteNote(note._id));
      
      return noteDiv;
    }
  });