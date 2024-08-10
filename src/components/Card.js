import React from 'react';

const Card = ({ id, item, index, groupBy }) => {
    return (
        <div className="card">
                <div className='card_header'>
                    <p className='title'>{item.id}</p>

                    {groupBy !== 'userId' && 
                        <div className='avatar'>
                            <img className='avatar_image' src='https://avatar.iran.liara.run/public' alt='' />
                            <span className='avatar_status'></span>
                        </div>
                    }

                </div>

                <div className='card_body'>
                    <p className='card_dec'>{item.title}</p>
                    <div className='feature_wrapper'>
                        <button className='feature_btn'></button>
                        <div className='feature_request'>
                            <span className='feature_status'></span>
                            {item.tag.length && <p className='title pl15'>{item.tag}</p>}
                        </div>
                    </div>
                </div>

            </div>
    );
};

export default Card;
