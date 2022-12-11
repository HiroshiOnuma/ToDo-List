'use strict';

{
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const container = document.getElementById('container');
    const ul = document.querySelector('ul');
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos) {
        todos.forEach(todo => {
            add(todo);
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        add();
    });

    function add(todo) {
        let todoText = input.value;

        if (todo) {
            todoText = todo.text;
        }

        if (todoText) {
            container.classList.add('show');
            const li = document.createElement('li');
            li.innerText = todoText;

            if (todo && todo.completed) {
                li.classList.add('textdecoration-linethrough');
            }
            li.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                li.remove();
                saveDate();
            });
            li.addEventListener('click', () => {
                li.classList.toggle('textdecoration-linethrough');
                saveDate();
            });
            ul.appendChild(li);
            input.value = '';
            saveDate();
        }
    }

    function saveDate() {
        const lists = document.querySelectorAll('li');
        let todos = [];

        lists.forEach(list => {
            let todo = {
                text: list.innerText,
                completed: list.classList.contains('textdecoration-linethrough'),
            };
            todos.push(todo);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}