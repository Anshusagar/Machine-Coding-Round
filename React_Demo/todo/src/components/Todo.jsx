import React from 'react'

const Todo = ({ title, onDelete }) => {
    return (
        <div onClick={onDelete}>{title}</div>
    )
}

export default Todo