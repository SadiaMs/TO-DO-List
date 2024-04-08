#!/usr/bin/env node
import inquirer from "inquirer";
let todos = [];
async function main() {
    while (true) {
        const { action } = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["Add Todo", "Complete Todo", "View Todos", "Exit"],
        });
        switch (action) {
            case "Add Todo":
                await addTodo();
                break;
            case "Complete Todo":
                await completeTodo();
                break;
            case "View Todos":
                viewTodos();
                break;
            case "Exit":
                console.log("Exiting...");
                return;
        }
    }
}
async function addTodo() {
    const { name } = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter the name of the todo:",
    });
    todos.push({ name, completed: false });
    console.log("Todo added successfully!");
}
async function completeTodo() {
    if (todos.length === 0) {
        console.log("No todos to complete!");
        return;
    }
    const { todo } = await inquirer.prompt({
        type: "list",
        name: "todo",
        message: "Select todo to mark as complete:",
        choices: todos.map(todo => ({ name: todo.name, value: todo })),
    });
    todo.completed = true;
    console.log("Todo marked as complete!");
}
function viewTodos() {
    if (todos.length === 0) {
        console.log("No todos to display.");
    }
    else {
        console.log("Todos:");
        todos.forEach(todo => {
            const status = todo.completed ? "[X]" : "[ ]";
            console.log(`${status} ${todo.name}`);
        });
    }
}
main();
