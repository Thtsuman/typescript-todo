import React, { useState, useEffect } from "react"

interface ITodo {
	id: number
	content: string
	isCompleted: boolean
}

type FormElement = React.FormEvent<HTMLFormElement>

const App = (): JSX.Element => {
	const [value, setValue] = useState<string>("")
	const [todos, setTodos] = useState<ITodo[]>([])
	const [peoples, setPeoples] = useState([])

	useEffect(() => {
		getResp()
	}, [])

	const getResp = async () => {
		const response = await fetch("https://api.pokemontcg.io/v1/cards")
			.then((resp) => resp.json())
			.then((resp) => resp.results)

		setPeoples(response)
	}

	// getResp()

	const handleAddTodo = (e: FormElement): void => {
		e.preventDefault()
		const newTodo: ITodo = {
			content: value,
			id: todos.length,
			isCompleted: false,
		}
		setTodos((todos) => [...todos, newTodo])
		setValue("")
	}

	const handleCheckTodo = (item: ITodo): void => {
		setTodos(todos.map((todo: ITodo) => (todo.id === item.id ? { ...todo, isCompleted: !todo.isCompleted } : todo)))
	}

	return (
		<div>
			<h1>Todo App</h1>
			<form onSubmit={handleAddTodo}>
				<input type="text" required value={value} onChange={(e) => setValue(e.target.value)} />
				<button type="submit">Add Todo</button>
			</form>
			<br />
			<br />
			{todos?.map((item, i) => (
				<div key={i}>
					{item.content}
					<input type="checkbox" checked={item.isCompleted} onChange={() => handleCheckTodo(item)} />
				</div>
			))}
		</div>
	)
}

export default App
