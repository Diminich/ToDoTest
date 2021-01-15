import {api} from "../api/api";

let initialState = {
    tasks: [],
    messageError: '',
    isLogin: false
}

const GET_TASKS = 'GET_TASKS';
const PUT_TASKS = 'PUT_TASKS';
const DELETE_TASKS = 'DELETE_TASKS';
const SET_TASKS = 'SET_TASKS';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_LOGIN = 'SET_LOGIN';

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

        case SET_ERROR_MESSAGE: {
            return {
                ...state,
                messageError: action.errorMessage
            }
        }

        case SET_LOGIN: {
            return {
                ...state,
                isLogin: true
            }
        }
    }
    return state;
}

export const getTask = (getTasks) => ({type: GET_TASKS, getTasks});
export const putTask = (id, newTitleTask) => ({type: PUT_TASKS, id, newTitleTask});
export const deleteTask = (id) => ({type: DELETE_TASKS, id});
export const setTasks = (tasks) => ({type: SET_TASKS, tasks})
export const setErrorMessage = (errorMessage) => ({type: SET_ERROR_MESSAGE, errorMessage})
export const setLogin = () => ({type: SET_LOGIN})

export const requestAddTask = (titleTask) => {
    return async (dispatch) => {
        try {
            await api.addNewTask(titleTask);
            const {data: taskList} = await api.getTasks();
            dispatch(getTask(taskList));
        } catch (error) {
            dispatch(setErrorMessage(error.message));
        }

    }
}

export const requestGetTask = () => {
    return async (dispatch) => {
        try {
            const data = await api.getTasks();
            dispatch(getTask(data.data));
        } catch (error) {
            dispatch(setErrorMessage(error.message));
        }


    }

}

export const requestPutTask = (id, newTitleTask) => {
    return async (dispatch) => {
        try {
            await api.updateTitleTask(id, newTitleTask);
            dispatch(requestGetTask())
        } catch (error) {
            dispatch(setErrorMessage(error.message));
        }

    }
}

export const requestDeleteTask = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await api.deleteTask(id);
            if (data.resultCode === 0) {
                dispatch(deleteTask(id));
            }
        } catch (error) {
            dispatch(setErrorMessage(error.message));
        }
    }
}

export const requestLogin = () => {
    return async (dispatch) => {
            const {data} = await api.login('free@samuraijs.com', 'free');
            if (data.resultCode === 0) {
                dispatch(setLogin());
            }
    }
}

export default taskReducer;