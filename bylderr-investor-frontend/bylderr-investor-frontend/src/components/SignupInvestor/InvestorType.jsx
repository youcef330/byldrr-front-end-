import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInvestorType, nextStep, prevStep } from '../../slices/signupSlice';

const InvestorType = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Are you Investing as:</h3>
            <button
                type="button"
                onClick={() => {
                    dispatch(setInvestorType('Individual'));
                    dispatch(nextStep());
                }}
                className="w-full bg-midnight-blue text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-2"
            >
                Individual (you)
            </button>
            <button
                type="button"
                onClick={() => {
                    dispatch(setInvestorType('Entity'));
                    dispatch(nextStep());
                }}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
                Entity (Business)
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

export default InvestorType