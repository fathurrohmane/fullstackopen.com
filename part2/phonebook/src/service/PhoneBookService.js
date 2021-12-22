import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getPhoneBooks = () => axios.get(baseUrl).then((result) => result.data)

const submit = (/** @type {any} */ phoneBook) => axios.post(baseUrl, phoneBook).then((result) => result.data)

const remove = (/** @type {any} */ phoneBook) => axios.delete(`${baseUrl}/${phoneBook.id}`).then((result) => result.data)

const update = (/** @type {any} */ phoneBook) => axios.put(`${baseUrl}/${phoneBook.id}`, phoneBook).then((result) => result.data)

export default {getPhoneBooks, submit, remove, update}