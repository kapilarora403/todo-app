import './App.scss';
import { filters } from "./utils/appUtils";
import { useState, Fragment, useEffect, useCallback } from "react";
import { v4 } from 'uuid';
import Topbar from "./components/topbar";
import Sidebar from "./components/sidebar";
import Task from "./components/task";
import TasksCreator from "./components/tasksCreator";

function App() {

    const [tasks, setTasks] = useState([]);
    const [note, setNote] = useState('');
    const [filterApplied, setFilterApplied] = useState(filters.all);
    const [tasksToShow, setTasksToShow] = useState(tasks);

    const setFilterAppliedMemoized = useCallback((filter) => {
        setFilterApplied(filter)
    }, [])

    useEffect(() => {
        const localTasks = JSON.parse(localStorage.getItem('tasks'));
        if (localTasks) {
            setTasks(localTasks)
        }
    }, [])

    useEffect(() => {
        let effectiveTasks = tasks;
        if (filterApplied === filters.pending) {
            effectiveTasks = effectiveTasks.filter((item) => !item.completed);
        } else if (filterApplied === filters.completed) {
            effectiveTasks = effectiveTasks.filter((item) => item.completed);
        }
        setTasksToShow(effectiveTasks);
    }, [filterApplied, tasks])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    /* We can use useCallback() hook to transport these methods to the child component and preserve references,
    thereby, reduce re-renders, but since the components are very light at this stage, using useCallback() hook is unnecessary */
    const createTasksHandler = () => {
        if (!!note) {
            const currentTasks = [...tasks];
            currentTasks.push({
                note,
                id: v4(),
                createdAt: new Date(),
                completed: false,
            })
            setTasks(currentTasks);
            if(filterApplied === filters.completed) {
                setFilterApplied(filters.pending)
            }
            setNote('');
        }
    }
    const deleteTaskHandler = (id) => {
        const index = tasks.findIndex((item) => item.id === id);
        const currentTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1, tasks.length)];
        setTasks(currentTasks);
    }

    const completeTaskToggler = (id) => {
        const targetTask = tasks.find((item) => item.id === id)
        targetTask.completed = !targetTask.completed;
        const index = tasks.findIndex((item) => item.id === id);
        const updatedTasks = [...tasks.slice(0, index), targetTask, ...tasks.slice(index + 1, tasks.length)];
        setTasks(updatedTasks);
    }

    const keyDownHandler = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault()
            createTasksHandler();
        }
    }
    return (
        <div className="App">
            <Topbar />
            <div className="content">
                <Sidebar filterApplied={filterApplied} setFilterApplied={setFilterAppliedMemoized} />
                <div className="tasks-view-section">
                    {tasksToShow.length ? (
                        <Fragment>
                            <span>ALL TASKS</span>
                            {tasksToShow.map((item, index) => {
                                const d = new Date(item.createdAt);
                                return <Task key={item.id} task={item} completeTaskToggler={completeTaskToggler} deleteTaskHandler={deleteTaskHandler} date={d} />
                            })}
                        </Fragment>

                    ) : (
                        <p>Oops! You don't have any tasks logged :)</p>
                    )}
                </div>
                <TasksCreator note={note} createTasksHandler={createTasksHandler} setNote={setNote} keyDownHandler={keyDownHandler} />
            </div>
        </div>
    );
}

export default App;
