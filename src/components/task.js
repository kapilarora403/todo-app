import React from 'react';
import PropTypes from 'prop-types';
import {getTimeStringFromDate, MONTHS_MAP} from "../utils/appUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

import '../styles/task.scss'


export default function Task({ task, completeTaskToggler, deleteTaskHandler, date }) {
    return (
        <div className="task">
            <div className={`radio ${task.completed ? 'completed-radio' : ''}`} onClick={() => completeTaskToggler(task.id)}>
                {task.completed && '✓'}
            </div>
            <div className="task-details">
                <p className={`task-title ${task.completed ? 'striked' : ''}`}>{task.note}</p>
                <p className={`task-date ${task.completed ? 'striked' : ''}`}>{`${MONTHS_MAP[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} | ${getTimeStringFromDate(date)}`}</p>
            </div>
            <button className="delete-button" onClick={() => deleteTaskHandler(task.id)}><FontAwesomeIcon icon={faTrashAlt} size="lg" /></button>
        </div>
    )
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    completeTaskToggler: PropTypes.func.isRequired,
    deleteTaskHandler: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
}