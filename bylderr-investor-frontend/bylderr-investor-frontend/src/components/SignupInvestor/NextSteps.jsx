import React from 'react';
import { useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../../slices/signupSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faBuildingColumns, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const NextSteps = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <div className="flex justify-between mb-10">
                <h3 className="text-2xl font-semibold">1. Your Information</h3>
                <FontAwesomeIcon
                    icon={faIdBadge}
                    className="text-white rounded-full bg-midnight-blue px-2.5 py-2 text-2xl"
                />
            </div>
            <div className="flex justify-between mb-10">
                <h3 className="text-2xl font-semibold">2. Connect your Bank account</h3>
                <FontAwesomeIcon
                    icon={faBuildingColumns}
                    className="text-white rounded-full bg-midnight-blue px-2 py-2 text-2xl"
                />
            </div>
            <div className="flex justify-between mb-10">
                <h3 className="text-2xl font-semibold">3. Investment Preferences</h3>
                <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-white rounded-full bg-midnight-blue px-3 py-2 text-2xl"
                />
            </div>

            <button
                type="button"
                onClick={() => dispatch(nextStep())}
                className="w-full bg-midnight-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                Continue
            </button>
            <button
                type="button"
                onClick={() => dispatch(prevStep())}
                className="w-full bg-gray-300 text-black py-2 px-4 rounded-lg mt-2 hover:bg-gray-400"
            >
                Back
            </button>
        </div>
    );
};

export default NextSteps;