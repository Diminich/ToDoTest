import {api} from "../api/api";

let initialState = {
    tasks: []
}

const GET_TASKS = 'GET_TASKS';
const PUT_TASKS = 'PUT_TASKS';
const DELETE_TASKS = 'DELETE_TASKS';
const SET_TASKS = 'SET_TASKS';

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.getTasks
            }

        case PUT_TASKS:
            return {
                ...state,
                tasks: state.tasks.map(t => {
                    if (t.id !== action.id) return t
                    return {...t, title: action.newTitleTask}
                })
            }

        case DELETE_TASKS: {
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id !== action.id)
            }
        }

        case SET_TASKS: {
            return {
                ...state,
                tasks: [...action.tasks]
            }
        }
    }
    return state;
}

export const getTask = (getTasks) => ({type: GET_TASKS, getTasks});
export const putTask = (id, newTitleTask) => ({type: PUT_TASKS, id, newTitleTask});
export const deleteTask = (id) => ({type: DELETE_TASKS, id});
export const setTasks = (tasks) => ({type: SET_TASKS, tasks})

export const requestAddTask = (titleTask) => {
    return async (dispatch) => {
        const {data: newTask} = await api.addNewTask(titleTask);
        const {data: taskList} = await api.getTasks();
        dispatch(getTask(taskList));
    }
}

export const requestGetTask = () => {
    return async (dispatch) => {
            const data = await api.getTasks();
            dispatch(getTask(data.data));

    }

}

export const requestPutTask = (id, newTitleTask) => {
    return async (dispatch) => {
        const {data} = await api.updateTitleTask(id, newTitleTask);
        dispatch(putTask(data));
    }
}

export const requestDeleteTask = (id) => {
    return async (dispatch) => {
        const {data} = await api.deleteTask(id);
        if (data.resultCode === 0) {
            dispatch(deleteTask(id));
        }
    }
}

export default taskReducer;