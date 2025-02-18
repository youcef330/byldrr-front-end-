import React from 'react';
import { useDispatch } from 'react-redux';
import { nextStep, prevStep } from '../../slices/signupSlice';

const StripePayment = () => {
    const dispatch = useDispatch();

    return (
        <>
            <h2 className="text-xl text-center font-semibold mb-4 text-gray-700 mt-10">
                Connect your Bank account
            </h2>
            <button
                type="button"
                onClick={() => dispatch(nextStep())}
                className="w-full bg-midnight-blue text-white py-2 rounded-lg hover:bg-blue-600"
            >
                Continue
            </button>
            <button
                type="button"
                onClick={() => dispatch(prevStep())}
                className="w-full bg-gray-300 text-black py-2 rounded-lg mt-2 hover:bg-gray-400"
            >
                Back
            </button>
        </>
    );
};

export default StripePayment