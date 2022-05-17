import React, { useState, useEffect } from "react";
import data from "./data.json";
//components
import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

function App() {
	const [toDoList, setToDoList] = useState([]);

	const handleToggle = (id) => {
		let mapped = toDoList.map((task) => {
			return task.id === Number(id)
				? { ...task, done: !task.complete }
				: { ...task };
		});
		setToDoList(mapped);
	};

	const handleFilter = () => {
		let filtered = toDoList.filter((task) => {
			return !task.complete;
		});
		setToDoList(filtered);
	};

	const addTask = (userInput) => {
		let copy = [...toDoList];
		copy = [
			...copy,
			{ id: toDoList.length + 1, task: userInput, done: false },
		];
		setToDoList(copy);
	};

	let fetchRes = () => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/NoahM",
			{
				method: "PUT",
				body: JSON.stringify(toDoList),
				headers: {
					"Content-Type": "application/json",
				},
			}
				.then((resp) => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					console.log(resp.text()); // will try return the exact result as string
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then((data) => {
					//here is were your code should start after the fetch finishes
					console.log(data); //this will print on the console the exact object received from the server
				})
				.catch((error) => {
					//error handling
					console.log(error);
				})
		);
	};
	const fetchTodo = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/NoahM")
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					return response.json();
				} else {
					alert(
						`Something went wrong, this is the error ${response.status}`
					);
				}
			})
			.then((data) => {
				console.log(data);
				setToDoList(data);
			})
			.catch((error) => console.log("This is an error: ", error));
	};

	useEffect(() => {
		fetchRes();
	}, [toDoList]);

	useEffect(() => {
		fetchTodo();
	}, []);

	return (
		<div className="App">
			<Header />
			<ToDoList
				toDoList={toDoList}
				handleToggle={handleToggle}
				handleFilter={handleFilter}
			/>
			<ToDoForm addTask={addTask} />
		</div>
	);
}

export default App;
