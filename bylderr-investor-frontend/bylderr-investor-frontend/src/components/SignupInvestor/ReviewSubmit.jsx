import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { prevStep, setIsSubmitting } from '../../slices/signupSlice';
import formatToUSD from '../../utils/formatToUSD';
import { submitSignup } from '../../api/signupApi';
const ReviewSubmit = () => {
    const dispatch = useDispatch();
    const {
        email,
        riskLevel,
        investmentAmount,
        userDetails,
        locations,
        investorType,
        commercial,
        residential,
        timeHorizon,
        isSubmitting,
        accreditedInvestorStatus,
        annualIncome,
        netWorth,
    } = useSelector((state) => state.signup);

    const [showSSN, setShowSSN] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePrev = () => {
        dispatch(prevStep());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setIsSubmitting(true));
        setError('');
        setSuccess('');

        const payload = {
            email,
            investorType,
            userDetails,
            riskLevel,
            investmentAmount,
            locations,
            commercial,
            residential,
            timeHorizon,
            accreditedInvestorStatus,
            annualIncome,
            netWorth
        };

        try {
            const response = await submitSignup(payload);
            console.log('Signup complete');
            dispatch(setIsSubmitting(false));
            setSuccess('Signup complete! Redirecting to login...');
        } catch (err) {
            console.error('Error submitting form', err);
            setError('There was a problem submitting your information. Please try again.');
            dispatch(setIsSubmitting(false));
        }
    };

    useEffect(() => {
        let timer;
        if (success) {
            // Redirects the user after 2 seconds
            timer = setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [success]);

    return (
        <div className="p-6 bg-white text-gray-600">
            <h2 className="text-2xl font-bold mb-4 text-gray-600">Review Your Information</h2>
            {investorType === 'Individual' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                        <p>
                            <strong>Email:</strong>{' '}
                            <span className="text-indigo-500">{email}</span>
                        </p>
                        <p>
                            <strong>Name:</strong>{' '}
                            <span className="text-indigo-500">
                                {userDetails.firstName} {userDetails.lastName}
                            </span>
                        </p>
                        <p>
                            <strong>Date of Birth:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.dob}</span>
                        </p>
                        <p>
                            <strong>SSN:</strong>{' '}
                            <span className="text-indigo-500">{showSSN ? userDetails.ssn : '***-**-****'}</span>
                            <button
                                type="button"
                                onClick={() => setShowSSN(!showSSN)}
                                className="text-blue-500 underline ml-2 text-sm"
                            >
                                {showSSN ? 'Hide' : 'Show'}
                            </button>
                        </p>
                        <p>
                            <strong>Address:</strong>{' '}
                            <span className="text-indigo-500">
                                {userDetails.streetAddress}, {userDetails.unitNumber}
                            </span>
                        </p>
                        <p>
                            <strong>City:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.city}</span>
                        </p>
                        <p>
                            <strong>State:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.state}</span>
                        </p>
                        <p>
                            <strong>ZIP Code:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.zipCode}</span>
                        </p>

                        <h3 className="text-xl font-semibold mb-2 mt-4">Location Preferences</h3>
                        {locations.length > 0 ? (
                            locations.map((location) => (
                                <p key={location.id}>
                                    <span className="text-indigo-500">- {location.name}</span>
                                </p>
                            ))
                        ) : (
                            <p>No locations selected.</p>
                        )}
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Investor Type</h3>
                        <p>
                            <strong>Type:</strong>{' '}
                            <span className="text-indigo-500">{investorType}</span>
                        </p>
                        <p>
                            <strong>Accredited Investor:</strong>{' '}
                            <span className="text-indigo-500">{accreditedInvestorStatus}</span>
                        </p>

                        {accreditedInvestorStatus === 'Yes' && (
                            <div>
                                <p>
                                    <strong>Annual Income:</strong>{' '}
                                    <span className="text-indigo-500">{formatToUSD(Number(annualIncome))}</span>
                                </p>
                                <p>
                                    <strong>Net worth:</strong>{' '}
                                    <span className="text-indigo-500">{formatToUSD(Number(netWorth))}</span>
                                </p>
                            </div>
                        )}

                        <h3 className="text-xl font-semibold mt-4 mb-2">Investment Preferences</h3>
                        <p>
                            <strong>Risk Level:</strong>{' '}
                            <span className="text-indigo-500">{riskLevel}</span>
                        </p>
                        <p>
                            <strong>Estimated Investment Annually:</strong>{' '}
                            <span className="text-indigo-500">{formatToUSD(Number(investmentAmount))}</span>
                        </p>

                        <h3 className="text-xl font-semibold mb-2 mt-4">Property Types & Time Horizon</h3>
                        <p>
                            <strong>Commercial:</strong>{' '}
                            <span className="text-indigo-500">
                                {commercial.length > 0 ? commercial.join(', ') : 'None selected'}
                            </span>
                        </p>
                        <p>
                            <strong>Residential:</strong>{' '}
                            <span className="text-indigo-500">
                                {residential.length > 0 ? residential.join(', ') : 'None selected'}
                            </span>
                        </p>
                        <p>
                            <strong>Time Horizon:</strong>{' '}
                            <span className="text-indigo-500">
                                {timeHorizon.length > 0 ? timeHorizon.join(', ') : 'None selected'}
                            </span>
                        </p>
                    </div>
                </div>
            )}

            {investorType === 'Entity' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Entity Information</h3>
                        <p>
                            <strong>Entity Name:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.entityName}</span>
                        </p>
                        <p>
                            <strong>EIN:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.ein}</span>
                        </p>
                        <p>
                            <strong>Email:</strong>{' '}
                            <span className="text-indigo-500">{email}</span>
                        </p>
                        <p>
                            <strong>Phone:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.phone}</span>
                        </p>
                        <p>
                            <strong>Address:</strong>{' '}
                            <span className="text-indigo-500">
                                {userDetails.streetAddress}
                                {userDetails.unitNumber ? `, Unit ${userDetails.unitNumber}` : ''}
                            </span>
                        </p>
                        <p>
                            <strong>City:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.city}</span>
                        </p>
                        <p>
                            <strong>State:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.state}</span>
                        </p>
                        <p>
                            <strong>ZIP Code:</strong>{' '}
                            <span className="text-indigo-500">{userDetails.zipCode}</span>
                        </p>

                        <h3 className="text-xl font-semibold mb-2 mt-4">Location Preferences</h3>
                        {locations.length > 0 ? (
                            locations.map((location) => (
                                <p key={location.id}>
                                    <span className="text-indigo-500">- {location.name}</span>
                                </p>
                            ))
                        ) : (
                            <p>No locations selected.</p>
                        )}
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Investor Type</h3>
                        <p>
                            <strong>Type:</strong>{' '}
                            <span className="text-indigo-500">{investorType}</span>
                        </p>

                        <h3 className="text-xl font-semibold mt-4 mb-2">Investment Preferences</h3>
                        <p>
                            <strong>Risk Level:</strong>{' '}
                            <span className="text-indigo-500">{riskLevel}</span>
                        </p>
                        <p>
                            <strong>Estimated Investment Annually:</strong>{' '}
                            <span className="text-indigo-500">${investmentAmount}</span>
                        </p>

                        <h3 className="text-xl font-semibold mb-2 mt-4">Property Types & Time Horizon</h3>
                        <p>
                            <strong>Commercial:</strong>{' '}
                            <span className="text-indigo-500">
                                {commercial.length > 0 ? commercial.join(', ') : 'None selected'}
                            </span>
                        </p>
                        <p>
                            <strong>Residential:</strong>{' '}
                            <span className="text-indigo-500">
                                {residential.length > 0 ? residential.join(', ') : 'None selected'}
                            </span>
                        </p>
                        <p>
                            <strong>Time Horizon:</strong>{' '}
                            <span className="text-indigo-500">
                                {timeHorizon.length > 0 ? timeHorizon.join(', ') : 'None selected'}
                            </span>
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-2 mt-6">
                {error && (
                    <div className='bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4'>
                        {error}
                    </div>
                )}
                {success && (
                    <div className='bg-green-50 border border-green-500 text-green-700 p-2 rounded mb-4'>
                        {success}
                    </div>
                )}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`w-full bg-midnight-blue text-white py-2 rounded-lg transition duration-200 ${isSubmitting ? 'bg-opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                    disabled={isSubmitting || success}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                    type="button"
                    onClick={handlePrev}
                    className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
                    disabled={success}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ReviewSubmit