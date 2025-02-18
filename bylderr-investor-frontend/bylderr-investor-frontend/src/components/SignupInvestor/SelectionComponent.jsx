import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelection } from '../../slices/signupSlice';

const SelectionComponent = () => {
    const dispatch = useDispatch();
    const { commercial, residential, timeHorizon } = useSelector((state) => state.signup);

    const options = {
        commercial: ['Industrial', 'Medical', 'Hospitality', 'Office', 'Retail'],
        residential: ['Single-Family', 'Multi-Family', 'Construction', 'Land'],
        timeHorizon: ['Short-Term Investors', 'Long-Term Investors'],
    };

    const handleClick = (category, value) => {
        dispatch(toggleSelection({ category, value }));
    };

    const renderOptions = (category, selectedValues) =>
        options[category].map((option) => (
            <button
                key={option}
                type="button"
                onClick={() => handleClick(category, option)}
                className={`px-4 py-2 rounded-md text-gray-700 ${selectedValues.includes(option)
                        ? 'bg-gray-300 font-semibold'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
            >
                {option}
            </button>
        ));

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <h3 className="font-semibold text-gray-700 mb-2 md:mb-0">Commercial:</h3>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    {renderOptions('commercial', commercial)}
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <h3 className="font-semibold text-gray-700 mb-2 md:mb-0">Residential:</h3>
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    {renderOptions('residential', residential)}
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
                <h3 className="font-semibold text-gray-700 mb-2 md:mb-0">Time Horizon:</h3>
                <div className="flex flex-col space-y-2 md:space-x-2 md:flex-row md:space-y-0">
                    {options.timeHorizon.map((option) => (
                        <div key={option} className="flex flex-col items-start">
                            <button
                                type="button"
                                onClick={() => handleClick('timeHorizon', option)}
                                className={`px-4 py-2 rounded-md text-gray-700 ${timeHorizon.includes(option) ? 'bg-gray-300 font-semibold' : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {option}
                            </button>
                            <p className="text-sm text-gray-500">
                                {option === 'Short-Term Investors'
                                    ? '(Months to a Few Years)'
                                    : '(5-20+ Years)'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectionComponent;