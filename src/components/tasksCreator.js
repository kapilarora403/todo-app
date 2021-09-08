import React from 'react';
import PropTypes from 'prop-types';

import '../styles/tasksCreator.scss'

export default function TasksCreator({ note, createTasksHandler, setNote, keyDownHandler}) {
    return (
        <div className="create-tasks-section">
            <p className="create-task-header">Create New Task</p>
            {/* A debounce function can be used here to fire state setting events periodically instead of on each key stroke, but I am not implementing it for now for the sake of simplicity and time boxing*/}
            <textarea value={note} onChange={(e) => setNote(e.target.value)} onKeyDown={keyDownHandler} className="new-task-textarea" placeholder="Enter note here..." />
            <button className="add-task-button" onClick={createTasksHandler}>Add New Task</button>
        </div>
    )
}

TasksCreator.propTypes = {
    note: PropTypes.string.isRequired,
    createTasksHandler: PropTypes.func.isRequired,
    setNote: PropTypes.func.isRequired,
    keyDownHandler: PropTypes.func.isRequired,
}