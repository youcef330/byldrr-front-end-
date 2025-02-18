import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeLocation } from '../../slices/signupSlice';

const TagList = () => {
    const locations = useSelector((state) => state.signup.locations);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeLocation(id));
    };

    return (
        <div className="flex flex-wrap gap-2 w-full overflow-auto mt-2">
            {locations.map((location) => {
                const locationParts = location.name.split(',');
                const displayName = locationParts.slice(0, -1).join(',');

                return (
                    <div
                        key={location.id}
                        className="bg-glitter text-midnight-blue px-4 py-2 rounded-md my-2 cursor-pointer"
                        onClick={() => handleRemove(location.id)}
                    >
                        {displayName} <span className="ml-2">x</span>
                    </div>
                );
            })}
        </div>
    );
};

export default TagList;