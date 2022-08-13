window.addEventListener('load', () => { // This creates an event listener for the whole page
	// i.e. When the page is loaded all these things happen upon instance
	// It loads the content of the page
	todos = JSON.parse(localStorage.getItem('todos')) || []; 
// Line 4: The page will load the todos items in storage or it will return an array literal that
// can't be overridden
	const nameInput = document.querySelector('#name');
	// Line 7: Adds a constant for the input tax in html with an id of name
	const newTodoForm = document.querySelector('#new-todo-form'); 
	// Line 9: Adds a constant for the form in html with an id of new-todo-form

	const username = localStorage.getItem('username') || ''; 
	// Line 12: This line will get the stored username item from locaStorage or will return blank 
	// if one doesn't exist

	nameInput.value = username;
	// Line 16: This will set the value of nameInput to the username const variable
	// If there is a username it is stored as username. Otherwise it is blank

	nameInput.addEventListener('change', (e) => {
	// Line 21: Creates an eventListener to watch if the nameInput value was changed
	// 'change' only works for input,select,textarea html tags
	// e is the shorthand reference for event 
		localStorage.setItem('username', e.target.value);
		// If the username is changed, this listener changes the previous value to the target value
	})

	newTodoForm.addEventListener('submit', e => { 
	// Line 28: Gets the content newTodoForm (remember the HTML Form) and adds an event listener
	// Uses the submit event (only works with form to create changes)
		e.preventDefault();
		// The preventDefault prevents the page from refreshing after every submission

		const todo = {
			// Line 35: todo becomes the name of the array literal whether it is empty or not
			// The following adds information to localStorage
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);
		// Line 44: This will add contents from todo constant and will "push" the content to the array literal

		localStorage.setItem('todos', JSON.stringify(todos));
		// The setItem will create (keyName,keyValue) for our data. By default the keyname will alwaus read todos

		e.target.reset();
		// Line 45: Resets the form after submission

		DisplayTodos() // Calls the function that displays todos (see line 58)
	})

	DisplayTodos()
}) // The end of the window load thingy

function DisplayTodos () {
	// Line 58: This is a new function that will only run when called
	const todoList = document.querySelector('#todo-list');
	// Line 60: From the html document it will get the blank div with an id of todo-list
	todoList.innerHTML = "";
	// Line 62: This will set the todoList innerHTML to "blank"

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}