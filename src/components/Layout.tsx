import { useContext, useState } from "react";
import { useEffectAsync } from "@/utils/helper";
import CustomContext from "@/context/CustomContext";
import TodoList from "./TodoList";
import axios from "@/services/axios.service";
import TodoHead from "./TodoHead";

const Layout = () => {
	const { uuid, setUUID, setTodoArray } = useContext(CustomContext);

	useEffectAsync(async () => {
		// check if random uuid is in local storage
		// if not, generate a random uuid and store it in local storage
		if (localStorage.getItem("random_uuid") !== null) {
			setUUID(localStorage.getItem("random_uuid")!);

			try {
				const result = await axios.get(`/tasks/${uuid}`);
				const todos = result.data.data.todos;
				setTodoArray(todos);
			} catch (error: any) {
				console.log(error.message);
			}
		}
	}, [uuid]);

	return (
		<div className="flex flex-col justify-center items-center relative h-[100vh] bg-gray-100 ">
			<div className="flex flex-col gap-2 container shadow-xl p-5 max-w-5xl min-h-[600px] bg-white  rounded-md  px-10 ">
				<h1 className="font-bold text-3xl text-center mb-2 ">
					<span className="text-purple-400  px-2 rounded-md ">
						Todo
					</span>
					App
				</h1>
				<div className="flex flex-row justify-between items-center ">
					<TodoHead />
				</div>
				<div className="flex flex-col flex-1">
					<TodoList />
				</div>
				{uuid && (
					<div className="text-center font-bold ">
						<span className="text-gray-400 ">
							recover todos by unique id:{" "}
						</span>
						{uuid}
					</div>
				)}
			</div>
		</div>
	);
};

export default Layout;
