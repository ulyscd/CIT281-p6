function fetchHabits() {
    fetch('/habits')
        .then(response => response.json())
        .then(habits => {
            const habitList = document.getElementById('habitList');
            habitList.innerHTML = ''; 
            habits.forEach(habit => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <strong>${habit.name}</strong><br>
                        <span>${habit.description}</span> <!-- Display the description -->
                    </div>
                    <div>
                        <span>Completed: ${habit.completedDays} days</span>
                        <button onclick="deleteHabit(${habit.id})">Delete</button>
                        <button onclick="checkHabit(${habit.id})">Check Off</button>
                    </div>
                `;
                habitList.appendChild(li);
            });
        })
        .catch(error => alert('Error fetching habits.'));
}

function addHabit() {
    const name = document.getElementById('habitName').value;
    const description = document.getElementById('habitDescription').value;

    fetch('/habits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }), 
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('habitName').value = '';
        document.getElementById('habitDescription').value = '';
        fetchHabits();
    })
    .catch(error => alert('Error adding habit.'));
}

function checkHabit(id) {
    fetch(`/habits/${id}`, { method: 'PUT' })
        .then(response => response.json())
        .then(() => fetchHabits())
        .catch(error => alert('Error checking off habit.'));
}

function deleteHabit(id) {
    fetch(`/habits/${id}`, { method: 'DELETE' })
        .then(() => fetchHabits())
        .catch(error => alert('Error deleting habit.'));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchHabits();
});
