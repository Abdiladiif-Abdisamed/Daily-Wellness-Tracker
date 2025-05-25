

const trackingTable = document.getElementById('trackingTable');

// Function to load existing entries from localStorage
function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('wellnessEntries')) || [];
    const trackingTable = document.getElementById('trackingTable');
    trackingTable.innerHTML = '';  // Clear the table before re-rendering

    entries.forEach((entry, index) => {  // Add index to identify the entry
        const tr = document.createElement('tr');
        tr.innerHTML = `
     <td><input type="checkbox"/></td>
      <td>${entry.date}</td>
      <td>${entry.sleep}</td>
      <td>${entry.water}</td>
      <td>${entry.exercise}</td>
      <td>${entry.mood}</td>
      <td>${entry.diet}</td>
      <td><button onclick="deleteEntry(${index}, this)">Delete</button></td> <!-- Pass the index and button itself -->
    `;
        trackingTable.appendChild(tr);
    });
}

// Function to delete a single entry by index and remove the row from DOM
function deleteEntry(index, button) {
    const entries = JSON.parse(localStorage.getItem('wellnessEntries')) || [];
    entries.splice(index, 1);  // Remove the entry from the array using its index
    localStorage.setItem('wellnessEntries', JSON.stringify(entries));  // Save the updated array back to localStorage

    // Remove the row from the table DOM
    button.closest('tr').remove();  // Removes the closest <tr> to the button (the row)

    loadEntries();  // Re-render the table after deletion
}

window.onload = loadEntries;