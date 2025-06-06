const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static("public"));

let habits = [];

app.get("/habits", (req, res) => {
    res.json(habits);
});

app.post("/habits", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: "Please set a Name and Description" });
    }

    const newHabit = {
        id: Date.now(),
        name,
        description,
        completedDays: 0,
        dateCreated: new Date(),
    };

    habits.push(newHabit);
    res.status(201).json(newHabit);
});

app.put("/habits/:id", (req, res) => {
    const habitId = parseInt(req.params.id);
    const habit = habits.find(h => h.id === habitId);

    if (!habit) {
        return res.status(404).json({ error: "Habit not found" });
    }

    habit.completedDays += 1;
    res.json(habit);
});

app.delete("/habits/:id", (req, res) => {
    const habitId = parseInt(req.params.id);
    const habitIndex = habits.findIndex(h => h.id === habitId);

    if (habitIndex === -1) {
        return res.status(404).json({ error: "Habit not found" });
    }

    habits.splice(habitIndex, 1);
    res.status(204).send(); 
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});