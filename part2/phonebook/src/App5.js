import React, { useEffect, useState } from 'react'
import phoneBookService from './service/PhoneBookService'

const App5 = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')

    const [message, setMessage] = useState(null)

    const addPerson = (/** @type {{ preventDefault: () => void; }} */ event) => {
        event.preventDefault()

        const foundName = persons.find(person => person.name === newName)
        if (foundName) {
            if (window.confirm(`${newName} is already added to phone book, replace the old number with a new one?`)) {
                phoneBookService.update({ ...foundName, number: newPhone })
                    .then((result) => {
                        setPersons(persons.map(currentPerson => currentPerson.id === foundName.id ? result : currentPerson))
                        setMessage({ isError: false, content: `Updated ${result.name}` })
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
            }
        } else {
            phoneBookService.submit({ name: newName, number: newPhone })
                .then((result) => {
                    setPersons(persons.concat(result))
                    setMessage({ isError: false, content: `Added ${result.name}` })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                }).catch((err) => {

                    setMessage({ isError: true, content: 'error' })
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                });
        }

        setNewName('')
        setNewPhone('')
    }

    const removePerson = (/** @type {{ name: any; id: any; }} */ person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            phoneBookService.remove(person)
                .then((result) => {
                    setPersons(persons.filter(item => person.id !== item.id))
                }).catch((err) => {
                    console.log(err);
                    if (err.response.status === 404) {
                        setMessage({ isError: true, content: `Information of ${person.name} has already been removed from the server` })
                    } else {
                        setMessage({ isError: true, content: 'error' })
                    }
                    
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                });
        }
    }


    useEffect(() => {
        phoneBookService.getPhoneBooks()
            .then((response) => {
                setPersons(response)
            }).catch(err => {
                setMessage({ isError: true, content: 'error' })
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
    }, [])

    return (
        <div>
            <h2>Phone book</h2>
            <Message message={message} />
            <Filter filter={filter} setFilter={setFilter} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} removePerson={removePerson} />
        </div>
    )
}

const Filter = ({ filter, setFilter }) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={(event) => setFilter(event.target.value)} />
        </div>
    )
}

const PersonForm = ({ addPerson, newName, setNewName, newPhone, setNewPhone }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div>
                phone: <input value={newPhone} onChange={(event) => setNewPhone(event.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons, filter, removePerson }) => {
    return (
        persons.filter(((/** @type {{ name: string | any[]; }} */ person) => person.name.includes(filter))).map((/** @type {{ name: React.Key; number: any; }} */ person) => <> <p key={person.name}>{`${person.name} ${person.number}`}</p> <button onClick={() => removePerson(person)}>remove</button></>)
    )
}

const Message = ({/** @type {Any} */ message }) => {

    const style = {
        borderStyle: 'solid',
        color: message?.isError ? 'red' : 'green',
        fontSize: 20,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        message && <p style={style}>{message.content}</p>
    )
}


export default App5