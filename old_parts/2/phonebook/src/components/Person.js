import React from 'react'

const Person = ({ person, deleteAction }) => {
    return (
        <>
            <p>{person.name} {person.number} <button onClick={deleteAction}>delete</button></p>
        </>
    )
}

export default Person