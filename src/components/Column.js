import React from 'react';
import Card from './Card';

const Column = ({ group, tasks, groupBy }) => {
    const foundUser = tasks.find(user => user.priority == group || user.userId === group);
 
    return (
        <div className='column'>
            <div className='column_header'>
                {(groupBy === 'status' || groupBy === 'priority') && 
                    <div className={`icon_status icon_${group}`}></div>
                }

                {groupBy === 'userId' && 
                    <div className='avatar'>
                        <img className='avatar_image' src='https://avatar.iran.liara.run/public' alt='' />
                        <span className='avatar_status'></span>
                    </div>
                }
                
                {foundUser ? 
                    foundUser.userId === group ? 
                        <p className='column_title'>{foundUser.name}  <span className='count'>{tasks.length}</span></p> 
                        : 
                        <p className='column_title'>{foundUser.ptitle}  <span className='count'>{tasks.length}</span></p>
                :
                    <p className='column_title'>{group}  <span className='count'>{tasks.length}</span></p>
                }

                <div className='column_wrapper'>
                    <button className='btn_add'></button>
                    <button className='btn_dots'></button>
                </div>
            </div>
            
            {tasks.map((item, index) => (
                <Card key={item.id} item={item} index={index} groupBy={groupBy} />
            ))}
        </div>
    );
};

export default Column;
