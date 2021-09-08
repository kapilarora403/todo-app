import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { filters } from "../utils/appUtils";

import '../styles/sidebar.scss'

export default function Sidebar({ filterApplied, setFilterApplied }) {
    return (
        <div className="sidebar">
            <p className={`filter ${filterApplied === filters.all ? 'active' : ''}`} onClick={() => setFilterApplied(filters.all)}><FontAwesomeIcon icon={faCaretRight} />ALL TASKS</p>
            <p className={`filter ${filterApplied === filters.completed ? 'active' : ''}`} onClick={() => setFilterApplied(filters.completed)}><FontAwesomeIcon icon={faCaretRight} />COMPLETED</p>
            <p className={`filter ${filterApplied === filters.pending ? 'active' : ''}`} onClick={() => setFilterApplied(filters.pending)}><FontAwesomeIcon icon={faCaretRight} />PENDING</p>
        </div>
    )
}

Sidebar.propTypes = {
    filterApplied: PropTypes.string.isRequired,
    setFilterApplied: PropTypes.func.isRequired,
}