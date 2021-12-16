import React, { useState } from 'react'

const App5 = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        const foundName = persons.find(person => person.name === newName)
        if (foundName) {
            window.alert(`${newName} is already added to phonebook`);
            return
        }

        setPersons(persons.concat({ name: newName, number: newPhone }))
        setNewName('')
        setNewPhone('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} />
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

const Persons = ({ persons, filter }) => {
    return (
        persons.filter((person => person.name.includes(filter))).map((person) => <p key={person.name}>{`${person.name} ${person.number}`}</p>)
    )
}

export default App5