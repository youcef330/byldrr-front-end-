import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, prevStep, nextStep } from '../../slices/signupSlice';

const InvestorDetails = () => {
    const dispatch = useDispatch();
    const { userDetails, investorType, email } = useSelector((state) => state.signup);

    const [ssnMasked, setSsnMasked] = useState(true);
    const [errors, setErrors] = useState({});
    const [date, setDate] = useState('');

    const formatSSN = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 9);
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 5) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
    };

    const formatEIN = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 9);
        if (cleaned.length <= 2) return cleaned;
        return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
    };

    const formatPhone = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 10);
        if (cleaned.length <= 3) return `(${cleaned}`;
        if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    };

    const formatZipcode = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 5);
        return cleaned;
    };

    const validateEmail = (emailInput) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    const validateEIN = (ein) => /^\d{2}-\d{7}$/.test(ein);
    const validatePhone = (phone) => /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
    const validateSSN = (ssn) => /^\d{3}-\d{2}-\d{4}$/.test(ssn);
    const validateZip = (zip) => /^\d{5}(-\d{4})?$/.test(zip);
    const validateDOB = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18 && age <= 120;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === 'ssn') formattedValue = formatSSN(value);
        if (name === 'ein') formattedValue = formatEIN(value);
        if (name === 'phone') formattedValue = formatPhone(value);
        if (name === 'zipCode') formattedValue = formatZipcode(value);

        dispatch(setUserDetails({ ...userDetails, [name]: formattedValue }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (investorType === 'Individual') {
            if (!userDetails.validIdNum) newErrors.validIdNum = 'Valid ID is required';
            if (!userDetails.ssn || !validateSSN(userDetails.ssn)) newErrors.ssn = 'Invalid SSN';
            if (!userDetails.dob || !validateDOB(userDetails.dob)) newErrors.dob = 'You must be 18 or older';
        }

        if (investorType === 'Entity') {
            if (!userDetails.entityName) newErrors.entityName = 'Entity Name is required';
            if (!userDetails.ein || !validateEIN(userDetails.ein)) newErrors.ein = 'Invalid EIN';
            if (!userDetails.phone || !validatePhone(userDetails.phone)) newErrors.phone = 'Invalid phone number';
            if (!email || !validateEmail(email)) newErrors.email = 'Invalid email';
        }

        if (!userDetails.firstName) newErrors.firstName = 'First name is required';
        if (!userDetails.lastName) newErrors.lastName = 'Last name is required';
        if (!userDetails.zipCode || !validateZip(userDetails.zipCode)) newErrors.zipCode = 'Invalid ZIP code';
        if (!userDetails.state) newErrors.state = 'State is required';
        if (!userDetails.city) newErrors.city = 'City is required';
        if (!userDetails.streetAddress) newErrors.streetAddress = 'Street Address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateForm()) {
            dispatch(nextStep());
        }
    };

    return (
        <div className="py-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {investorType === 'Individual' && (
                    <>
                        <div>
                            <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={userDetails.firstName || ''}
                                onChange={handleInputChange}
                                autoComplete="given-name"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName && 'border-red-500'
                                    }`}
                            />
                            {errors.firstName && (
                                <span className="text-red-500 text-sm">{errors.firstName}</span>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={userDetails.lastName || ''}
                                onChange={handleInputChange}
                                autoComplete="family-name"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName && 'border-red-500'
                                    }`}
                            />
                            {errors.lastName && (
                                <span className="text-red-500 text-sm">{errors.lastName}</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="dob" className="block text-gray-700 text-sm font-semibold">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={userDetails.dob || date}
                                onChange={handleInputChange}
                                max={new Date().toISOString().split('T')[0]}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.dob && 'border-red-500'
                                    }`}
                            />
                            {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
                        </div>

                        <div>
                            <label htmlFor="ssn" className="block text-gray-700 text-sm font-semibold">
                                SSN
                            </label>
                            <div className="relative">
                                <input
                                    type={ssnMasked ? 'password' : 'text'}
                                    id="ssn"
                                    name="ssn"
                                    value={userDetails.ssn || ''}
                                    onChange={handleInputChange}
                                    placeholder="XXX-XX-XXXX"
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.ssn && 'border-red-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setSsnMasked(!ssnMasked)}
                                    className="absolute right-2 top-2 text-blue-500 hover:text-blue-700 text-sm"
                                >
                                    {ssnMasked ? 'Show' : 'Hide'}
                                </button>
                            </div>
                            {errors.ssn && <span className="text-red-500 text-sm">{errors.ssn}</span>}
                        </div>

                        <div>
                            <label htmlFor="validIdNum" className="block text-gray-700 text-sm font-semibold">
                                Driver’s License or Valid ID
                            </label>
                            <input
                                type="text"
                                id="validIdNum"
                                name="validIdNum"
                                value={userDetails.validIdNum || ''}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.validIdNum && 'border-red-500'
                                    }`}
                            />
                            {errors.validIdNum && (
                                <span className="text-red-500 text-sm">{errors.validIdNum}</span>
                            )}
                        </div>
                    </>
                )}

                {investorType === 'Entity' && (
                    <>
                        <div className="sm:col-span-2">
                            <label htmlFor="entityName" className="block text-gray-700 text-sm font-semibold">
                                Entity Name
                            </label>
                            <input
                                type="text"
                                id="entityName"
                                name="entityName"
                                value={userDetails.entityName || ''}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.entityName && 'border-red-500'
                                    }`}
                            />
                            {errors.entityName && (
                                <span className="text-red-500 text-sm">{errors.entityName}</span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="ein" className="block text-gray-700 text-sm font-semibold">
                                EIN
                            </label>
                            <input
                                type="text"
                                id="ein"
                                name="ein"
                                value={userDetails.ein || ''}
                                onChange={handleInputChange}
                                placeholder="XX-XXXXXXX"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.ein && 'border-red-500'
                                    }`}
                            />
                            {errors.ein && <span className="text-red-500 text-sm">{errors.ein}</span>}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email || ''}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email && 'border-red-500'
                                    }`}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-gray-700 text-sm font-semibold">
                                Phone
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                inputMode="numeric"
                                pattern="\d*"
                                value={userDetails.phone || ''}
                                onChange={handleInputChange}
                                placeholder="(XXX)-XXX-XXXX"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone && 'border-red-500'
                                    }`}
                            />
                            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                        </div>
                    </>
                )}

                <div className="sm:col-span-2">
                    <label htmlFor="streetAddress" className="block text-gray-700 text-sm font-semibold">
                        Street Address
                    </label>
                    <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        value={userDetails.streetAddress || ''}
                        onChange={handleInputChange}
                        autoComplete="street-address"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.streetAddress && 'border-red-500'
                            }`}
                    />
                    {errors.streetAddress && (
                        <span className="text-red-500 text-sm">{errors.streetAddress}</span>
                    )}
                </div>

                <div>
                    <label htmlFor="unitNumber" className="block text-gray-700 text-sm font-semibold">
                        Unit Number
                    </label>
                    <input
                        type="text"
                        id="unitNumber"
                        name="unitNumber"
                        value={userDetails.unitNumber || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="city" className="block text-gray-700 text-sm font-semibold">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={userDetails.city || ''}
                        onChange={handleInputChange}
                        autoComplete="address-level2"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city && 'border-red-500'
                            }`}
                    />
                    {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                </div>

                <div>
                    <label htmlFor="state" className="block text-gray-700 text-sm font-semibold">
                        State
                    </label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={userDetails.state || ''}
                        onChange={handleInputChange}
                        autoComplete="address-level1"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state && 'border-red-500'
                            }`}
                    />
                    {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
                </div>

                <div>
                    <label htmlFor="zipCode" className="block text-gray-700 text-sm font-semibold">
                        Zip Code
                    </label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        inputMode="numeric"
                        pattern="\d*"
                        value={userDetails.zipCode || ''}
                        onChange={handleInputChange}
                        placeholder="12345"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.zipCode && 'border-red-500'
                            }`}
                    />
                    {errors.zipCode && <span className="text-red-500 text-sm">{errors.zipCode}</span>}
                </div>

                {investorType === 'Entity' && (
                    <>
                        <div className="font-bold text-xl text-gray-700 sm:col-span-3 mt-6">
                            Entity Owner
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={userDetails.firstName || ''}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName && 'border-red-500'
                                    }`}
                            />
                            {errors.firstName && (
                                <span className="text-red-500 text-sm">{errors.firstName}</span>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={userDetails.lastName || ''}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName && 'border-red-500'
                                    }`}
                            />
                            {errors.lastName && (
                                <span className="text-red-500 text-sm">{errors.lastName}</span>
                            )}
                        </div>
                    </>
                )}
            </div>

            <button
                type="button"
                onClick={handleNext}
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

export default InvestorDetails