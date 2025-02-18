import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAccreditedInvestorStatus,
    setAnnualIncome,
    setNetWorth,
    nextStep,
    prevStep,
} from '../../slices/signupSlice';
import InputBox from '../../utils/inputBox';

const InvestorStatus = () => {
    const dispatch = useDispatch();
    const { accreditedInvestorStatus, annualIncome, netWorth } = useSelector(
        (state) => state.signup
    );

    const [localAccreditedStatus, setLocalAccreditedStatus] = useState(accreditedInvestorStatus || '');
    const [localIncome, setLocalIncome] = useState(annualIncome || '');
    const [localNetWorth, setLocalNetWorth] = useState(netWorth || '');

    const handleNext = () => {
        dispatch(setAccreditedInvestorStatus(localAccreditedStatus));
        dispatch(setAnnualIncome(localIncome));
        dispatch(setNetWorth(localNetWorth));
        dispatch(nextStep());
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Are you an accredited investor?</h3>
            <button
                type="button"
                onClick={() => setLocalAccreditedStatus('Yes')}
                className={`w-full py-2 px-4 rounded-lg mb-2 ${localAccreditedStatus === 'Yes'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-black'
                    }`}
            >
                Yes
            </button>
            <button
                type="button"
                onClick={() => setLocalAccreditedStatus('No')}
                className={`w-full py-2 px-4 rounded-lg mb-2 ${localAccreditedStatus === 'No'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-black'
                    }`}
            >
                No
            </button>
            {localAccreditedStatus === 'Yes' && (
                <>
                    <div className="mb-4">
                        <InputBox
                            id="annualIncome"
                            type="number"
                            label="Annual Income"
                            placeholder="Enter your approximate annual income"
                            value={localIncome}
                            onChange={(val) => setLocalIncome(val)}
                            className="w-full"
                            suffix={'USD'}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            id="netWorth"
                            type="number"
                            label="Net Worth"
                            placeholder="Enter your approximate net worth"
                            value={localNetWorth}
                            onChange={(val) => setLocalNetWorth(val)}
                            className="w-full"
                            suffix={'USD'}
                        />
                    </div>
                </>
            )}

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => dispatch(prevStep())}
                    className="w-full bg-gray-300 text-black py-2 px-4 rounded-lg mt-2 hover:bg-gray-400"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-midnight-blue text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default InvestorStatus