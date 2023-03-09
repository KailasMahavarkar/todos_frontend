import { createContext } from "react";

export type todoType = {
    message: string;
    completed: boolean;
    _id: string;
    taskId: string;
}

export const defaultCustomContext = {
    uuid: "",
    setUUID: () => { },

    todo: {
        _id: "",
        message: "",
        completed: false,
        taskId: "",
    },
    setTodo: () => { },

    todoArray: [],
    setTodoArray: () => { },

    taskSelected: '-1',
    setTaskSelected: () => { },

    addTask: false,
    setAddTask: () => { },
}



export type customContextType = {
    uuid: string;
    setUUID: (uuid: string) => void;

    todo: todoType;
    setTodo: (todo: todoType) => void;

    todoArray: todoType[];
    setTodoArray: (todoArray: todoType[]) => void;

    taskSelected: string;
    setTaskSelected: (taskSelected: string) => void;

    addTask: boolean;
    setAddTask: (addTask: boolean) => void;
}


const CustomContext = createContext<customContextType>(defaultCustomContext);

export default CustomContext;
