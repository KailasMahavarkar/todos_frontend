import CustomContext from "@/context/CustomContext";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleHollow } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import axios from "axios";

const TodoList = () => {
	const {
		todoArray,
		setTaskSelected,
		taskSelected,
		uuid,
		todo,
		setTodoArray,
	} = useContext(CustomContext);

	const setTaskDone = async (newstatus: boolean) => {
		if (taskSelected === "-1") return;

		const result = await axios.patch(`/tasks/${uuid}`, {
			taskId: taskSelected,
			message: todo.message,
			completed: newstatus,
		});

		if (result.status === 200) {
			const temp = todoArray.map((todo) => {
				if (todo.taskId === taskSelected) {
					return {
						...todo,
						completed: newstatus,
					};
				} else {
					return todo;
				}
			});
			setTodoArray(temp);
		}
	};

	return (
		<>
			{todoArray.map((task) => {
				return (
					<div
						key={task.taskId}
						className="flex flex-col md:flex-row gap-2 cursor-pointer "
					>
						<div
							className="flex-1 flex items-center "
							onClick={() => {
								setTaskSelected(task.taskId);
							}}
						>
							<div
								className={`flex items-center border-[2px] flex-1 text-lg capitalize p-2  rounded-md px-5 my-2 ${
									task.taskId === taskSelected
										? "border-[4px] border-purple-400 font-bold "
										: ""
								}  `}
							>
								<FontAwesomeIcon
									className={`mx-3 max-w-[10px] max-h-[10px] ${
										task.taskId === taskSelected
											? "text-purple-400"
											: ""
									}`}
									icon={
										taskSelected === task.taskId
											? faCircle
											: faCircleHollow
									}
								/>
								<span
									className={`flex-1 ${
										task.completed ? "line-through" : ""
									} ${
										task.taskId === taskSelected
											? "text-purple-400"
											: ""
									}`}
								>
									{task.message}
								</span>
							</div>
						</div>
						<div className="flex items-center">
							{/* check if selected task is already completed */}
							{/* if yes -> user can undo done task */}
							{/* if no -> user can mark task as done */}
							{taskSelected === task.taskId && (
								<>
									{task.completed ? (
										<>
											<button
												className="btn  btn-outline btn-warning w-full"
												onClick={() =>
													setTaskDone(false)
												}
											>
												undo done
											</button>
										</>
									) : (
										<>
											<button
												className="btn btn-outline btn-success w-full"
												onClick={() =>
													setTaskDone(true)
												}
											>
												mark done
											</button>
										</>
									)}
								</>
							)}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default TodoList;
