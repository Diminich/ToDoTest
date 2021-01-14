import taskReducer, {deleteTask, getTask, putTask, setTasks} from "./task-reducer";

let state

beforeEach(() => {
    state = {
        tasks: [
            {id: '0', addedDate: '07:42', order: 1, title: 'buy a pen'},
            {id: '1', addedDate: '08:52', order: 2, title: 'buy a pencil'},
            {id: '2', addedDate: '09:22', order: 3, title: 'buy an apple'},
            {id: '3', addedDate: '10:12', order: 4, title: 'buy lemon'}
        ]
    }
})

test ('get task of state', () => {
    let action = getTask({title: '', id: ''});

    let newState = taskReducer(state, action);

    expect(newState.tasks).toStrictEqual({title: '', id: ''})
})

test ( 'put task of state', () => {
    let  action = putTask({id: ''}, {titleTask: ''})

    let newState = taskReducer(state, action);

    expect(newState.tasks).toStrictEqual([
        {id: '0', addedDate: '07:42', order: 1, title: 'buy a pen'},
        {id: '1', addedDate: '08:52', order: 2, title: 'buy a pencil'},
        {id: '2', addedDate: '09:22', order: 3, title: 'buy an apple'},
        {id: '3', addedDate: '10:12', order: 4, title: 'buy lemon'}])
})

test ('delete task of state', () => {
    let action = deleteTask({id: ''})

    let newState = taskReducer(state, action);

    expect(newState.tasks).toStrictEqual([
        {id: '0', addedDate: '07:42', order: 1, title: 'buy a pen'},
        {id: '1', addedDate: '08:52', order: 2, title: 'buy a pencil'},
        {id: '2', addedDate: '09:22', order: 3, title: 'buy an apple'},
        {id: '3', addedDate: '10:12', order: 4, title: 'buy lemon'}])
})

test ('set task of state', () => {
    let action = setTasks([{id: '0', addedDate: '07:42', order: 1, title: 'buy a pen'},
        {id: '1', addedDate: '08:52', order: 2, title: 'buy a pencil'},
        {id: '2', addedDate: '09:22', order: 3, title: 'buy an apple'},
        {id: '3', addedDate: '10:12', order: 4, title: 'buy lemon'}])

    let newState = taskReducer(state, action);

    expect(newState.tasks).toStrictEqual([
        {id: '0', addedDate: '07:42', order: 1, title: 'buy a pen'},
        {id: '1', addedDate: '08:52', order: 2, title: 'buy a pencil'},
        {id: '2', addedDate: '09:22', order: 3, title: 'buy an apple'},
        {id: '3', addedDate: '10:12', order: 4, title: 'buy lemon'}])
})