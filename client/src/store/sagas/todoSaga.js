import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoSuccess,
  addTodoFailure,
  toggleTodoSuccess,
  toggleTodoFailure,
  deleteTodoSuccess,
  deleteTodoFailure,
} from '../slices/todoSlice';

const API_URL = 'http://localhost:5000/api';

// API calls
const fetchTodosApi = () => fetch(`${API_URL}/todos`).then(res => res.json());
const addTodoApi = (text) => 
  fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  }).then(res => res.json());
const toggleTodoApi = (id, completed) =>
  fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  }).then(res => res.json());
const deleteTodoApi = (id) =>
  fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  }).then(res => res.json());

// Saga workers
function* fetchTodosSaga() {
  try {
    const todos = yield call(fetchTodosApi);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

function* addTodoSaga(action) {
  try {
    yield call(addTodoApi, action.payload);
    yield put(addTodoSuccess());
    yield call(fetchTodosSaga); // Refresh the list
  } catch (error) {
    yield put(addTodoFailure(error.message));
  }
}

function* toggleTodoSaga(action) {
  try {
    const { id, completed } = action.payload;
    yield call(toggleTodoApi, id, completed);
    yield put(toggleTodoSuccess());
    yield call(fetchTodosSaga); // Refresh the list
  } catch (error) {
    yield put(toggleTodoFailure(error.message));
  }
}

function* deleteTodoSaga(action) {
  try {
    yield call(deleteTodoApi, action.payload);
    yield put(deleteTodoSuccess());
    yield call(fetchTodosSaga); // Refresh the list
  } catch (error) {
    yield put(deleteTodoFailure(error.message));
  }
}

// Watcher saga
export function* todoSaga() {
  yield takeLatest('todos/fetchTodosRequest', fetchTodosSaga);
  yield takeLatest('todos/addTodoRequest', addTodoSaga);
  yield takeLatest('todos/toggleTodoRequest', toggleTodoSaga);
  yield takeLatest('todos/deleteTodoRequest', deleteTodoSaga);
} 