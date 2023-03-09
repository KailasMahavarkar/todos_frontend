import {
	faCheck,
	faTimes,
	faPlus,
	faSearch,
	faEraser,
	faTrash,
	faMagnifyingGlass,
	faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import IconButton from "./IconButton";
import CustomContext from "@/context/CustomContext";
import axios from "@/services/axios.service";

const TodoHead = () => {
	const {
		addTask,
		setTodo,
		todo,
		setUUID,
		todoArray,
		setTodoArray,
		setAddTask,
		setTaskSelected,
		taskSelected,
		uuid,
	} = useContext(CustomContext);

	const [search, setSearch] = useState<string>("");
	const [searchFlag, setSearchFlag] = useState<boolean>(false);

	const handleCreate = async () => {
		try {
			const result = await axios.post(`/tasks`, {
				uuid: uuid,
				message: todo.message,
				completed: todo.completed,
			});

			if (result.status === 200) {
				setTodoArray([
					...todoArray,
					{
						_id: "",
						message: todo.message,
						completed: todo.completed,
						taskId: result.data.data.taskId,
					},
				]);

				const temp = result.data.data.uuid;
				if (temp) {
					setUUID(temp);
					localStorage.setItem("random_uuid", temp);
				}
			}
		} catch (error: any) {
			console.log(error.message);
		}

		setAddTask(false);
	};

	const handleDelete = async () => {
		if (taskSelected === "-1") return;

		const result = await axios.delete(`/tasks/${uuid}/${taskSelected}`);

		if (result.status === 200) {
			setTodoArray(
				todoArray.filter((todo) => todo.taskId !== taskSelected)
			);
		}
	};

	const handleSearch = async () => {
		if (search === "") return;

		const result = await axios.get(`/tasks/${search}`);
		if (result.status === 200) {
			setTodoArray(result.data.data.todos);
			setUUID(search);

            // set the uuid in local storage
            localStorage.setItem("random_uuid", search);
		}

		setAddTask(false);
		setSearchFlag(false);
	};

	return (
		<>
			<>
				{searchFlag && (
					<>
						<input
							className="input input-bordered w-full input-md text-lg"
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							placeholder="Search todo by unique id to recover it"
						></input>

						<button
							className="btn btn-circle ml-2 btn-success "
							onClick={handleSearch}
						>
							<FontAwesomeIcon
								className="text-white max-w-[25px] max-h-[25px]"
								icon={faMagnifyingGlass}
							/>
						</button>

						<button
							className="btn btn-circle ml-2 btn-error "
							onClick={() => {
								setAddTask(false);
								setSearchFlag(false);
							}}
						>
							<FontAwesomeIcon
								className="text-white max-w-[25px] max-h-[25px]"
								icon={faTimes}
							/>
						</button>
					</>
				)}

				{addTask && (
					<>
						<input
							className="input input-bordered w-full input-md text-lg"
							placeholder="Add new todo"
							onChange={(e) => {
								setTodo({
									...todo,
									message: e.target.value,
								});
							}}
						></input>

						<button
							className="btn btn-circle ml-2 btn-success "
							onClick={handleCreate}
						>
							<FontAwesomeIcon
								className="text-white max-w-[25px] max-h-[25px]"
								icon={faCheck}
							/>
						</button>
						<button
							className="btn btn-circle ml-2 btn-error "
							onClick={() => {
								setAddTask(false);
								setSearchFlag(false);
							}}
						>
							<FontAwesomeIcon
								className="text-white max-w-[25px] max-h-[25px]"
								icon={faTimes}
							/>
						</button>
					</>
				)}

				{!addTask && !searchFlag && (
					<>
						<div>
							<IconButton
								onClick={() => {
									setAddTask(!addTask);
									setTaskSelected("-1");
								}}
								icon={faPlus}
								buttonClassName="btn-sm md:btn-md"
							>
								Add Task
							</IconButton>
						</div>

						<div className="child:ml-2">
							{/* search todos by public id */}
							<div
								className="tooltip"
								data-tip="search todo in db"
							>
								<button
									className="btn btn-circle btn-sm md:btn-md"
									onClick={() => {
										setSearchFlag(!searchFlag);
										setAddTask(false);
									}}
								>
									<FontAwesomeIcon
										className=" p-1 w-[25px] h-[25px]"
										icon={faSearch}
									/>
								</button>
							</div>

							{/* clear selected to-do list */}
							<div
								className="tooltip"
								data-tip="clear selection"
								onClick={() => setTaskSelected("-1")}
							>
								<button className="btn btn-circle  btn-sm md:btn-md">
									<FontAwesomeIcon
										className=" p-1 w-[25px] h-[25px]"
										icon={faEraser}
									/>
								</button>
							</div>

							<div className="tooltip" data-tip="delete selected">
								<button
									className="btn btn-error btn-circle  btn-sm md:btn-md"
									onClick={handleDelete}
								>
									<FontAwesomeIcon
										className=" p-1 w-[25px] h-[25px]"
										icon={faTrash}
									/>
								</button>
							</div>
						</div>
					</>
				)}
			</>
		</>
	);
};

export default TodoHead;
