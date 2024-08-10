import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, setGroupBy, sortTasks } from '../actions/kanbanActions';
import Column from './Column';

const Board = () => {
    const dispatch = useDispatch();
    const panelRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const {tasks, loading, error, groupBy} = useSelector((state) => state.kanban);

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    const groupTasks = (criteria) => {
        const grouped = tasks.reduce((acc, task) => {
            const key = task[criteria];
            
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(task);
            return acc;
        }, {});

        return grouped;
    };

    const groupedTasks = groupTasks(groupBy);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleClickOutside = (event) => {
        if (panelRef.current && !panelRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Render a loading indicator while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>;  // Render an error message if an error occurred
    }

    return (
        <div>
            <div className="grouping-options">
                <button className='feature_btn display_icon' onClick={toggleVisibility}>
                    Display <span className='drop_arrow'></span>
                </button>

                {isVisible && (
                    <div className="toggle-content" ref={panelRef}>
                        <div className='list'>
                            <label>Group By</label>
                            <select value={groupBy} onChange={(e) => dispatch(setGroupBy(e.target.value)) }>
                                <option value="status">Status</option>
                                <option value="userId">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>

                        <div className='list'>
                            <label>Order By</label>
                            <select value={groupBy} onChange={(e) => dispatch(sortTasks('priority', e.target.value)) }>
                                <option value="asc">Asc</option>
                                <option value="desc">Desc</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="board">
                {Object.entries(groupedTasks || []).map(([group, tasks]) => (
                    <Column key={group} group={group} tasks={tasks} groupBy={groupBy} />
                ))}
            </div>
        </div>
    );
};

export default Board;
