import CustomContext, {
	defaultCustomContext,
	todoType,
} from "@/context/CustomContext";
import "@/styles/index.scss";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
	const [uuid, setUUID] = useState<string>(defaultCustomContext.uuid);
	const [todo, setTodo] = useState<todoType>(defaultCustomContext.todo);
	const [todoArray, setTodoArray] = useState<todoType[]>(
		defaultCustomContext.todoArray
	);
	const [taskSelected, setTaskSelected] = useState("-1");
	const [addTask, setAddTask] = useState(false);

	useEffect(() => {
		console.log("API:", process.env.NEXT_PUBLIC_API);
	}, []);

	return (
		<CustomContext.Provider
			value={{
				uuid,
				setUUID,
				todo,
				setTodo,
				todoArray,
				setTodoArray,

				taskSelected,
				setTaskSelected,

				addTask,
				setAddTask,
			}}
		>
			<Component {...pageProps} />;
		</CustomContext.Provider>
	);
}
