import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSliderValue, nextStep, prevStep, setInvestmentAmount } from '../../slices/signupSlice';
import SearchBox from './SearchBox';
import TagList from './TagList';
import SelectionComponent from './SelectionComponent';
import InputBox from '../../utils/inputBox';

const formatAmount = (amount) => {
    const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return amount >= 1000000 ? `$${(amount / 1000000).toFixed(0)}M` : `$${formatted}`;
};

const InvestorPreferences = () => {
    const [showAmountOptions, setShowAmountOptions] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const sliderValue = useSelector((state) => state.signup.riskLevel);
    const investmentAmount = useSelector((state) => state.signup.investmentAmount);

    const descriptions = {
        1: 'Very Little Risk',
        3: 'Little Risk',
        5: 'Average Risk',
        7: 'High Risk',
        9: 'Very High Risk',
    };

    const predefinedAmounts = [
        0, 50000, 100000, 250000, 500000, 750000,
        1000000, 2000000, 5000000, 10000000, 15000000, 18000000,
    ];

    const handleSliderChange = (e) => {
        dispatch(setSliderValue(Number(e.target.value)));
    };

    const handleAmountChange = (e) => {
        dispatch(setInvestmentAmount(e.target.value));
    };

    const selectAmount = (amount) => {
        dispatch(setInvestmentAmount(amount));
        setShowAmountOptions(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowAmountOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Risk Assessment</h2>
            <div className="mx-10">
                <input
                    type="range"
                    min="1"
                    max="9"
                    step="1"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-midnight-blue rounded-lg appearance-none cursor-pointer mb-4"
                    style={{
                        backgroundImage: `linear-gradient(to right, #141b4d 0%, #141b4d ${(sliderValue - 1) * 12.5
                            }%, #f3f4f6 ${(sliderValue - 1) * 12.5}%, #f3f4f6 100%)`,
                    }}
                />
            </div>
            <div className="flex justify-between w-full text-gray-500 text-sm mt-2">
                {[1, 3, 5, 7, 9].map((num) => (
                    <div key={num} className="flex flex-col items-center">
                        <span className="font-bold text-gray-700 text-center">{num}</span>
                        <span className="text-center">{descriptions[num]}</span>
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-semibold my-4 text-gray-700">Estimated Investment Annually</h2>
            <div className="relative w-full py-2" ref={dropdownRef}>
                <div className="relative">
                    <InputBox
                        id="investmentAmount"
                        type="number"
                        placeholder="Enter investment amount"
                        value={investmentAmount}
                        onChange={(val) => dispatch(setInvestmentAmount(val))}
                        onFocus={() => setShowAmountOptions(true)}
                        onBlur={() => setTimeout(() => setShowAmountOptions(false), 200)}
                        suffix={'USD'}
                    />
                    {showAmountOptions && (
                        <div className="absolute left-0 w-full max-h-40 overflow-y-auto border border-gray-300 rounded-md bg-white z-20 mt-1">
                            {predefinedAmounts.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => selectAmount(amount)}
                                    className="block w-full text-left px-2 py-1 hover:bg-indigo-100"
                                >
                                    {formatAmount(amount)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <h2 className="text-xl font-semibold my-4 text-gray-700">Types of Investments</h2>
            <SelectionComponent />

            <h2 className="text-xl font-semibold my-4 text-gray-700">Interested Locations</h2>
            <div className="border border-gray-300 rounded-md bg-white overflow-visible">
                <SearchBox />
            </div>
            <TagList />

            <button
                type="button"
                onClick={() => dispatch(nextStep())}
                className="w-full bg-midnight-blue text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-600"
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
        </>
    );
};

export default InvestorPreferences