import React, { useState } from 'react';
import './FundRequestPage.css';

// Custom Hook for Form Handling
const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleAddItem = () => {
        setValues({
            ...values,
            items: [...values.items, { name: '', quantity: 1, unitPrice: '' }],
        });
    };

    const handleRemoveItem = (index) => {
        const updatedItems = values.items.filter((_, i) => i !== index);
        setValues({
            ...values,
            items: updatedItems,
        });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = values.items.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setValues({
            ...values,
            items: updatedItems,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length === 0) {
            // Simulate successful submission
            setTimeout(() => {
                console.log('Form Submitted:', values);
                setValues(initialValues);
                setErrors({});
                setIsSubmitting(false);
                alert('Request submitted successfully!');
            }, 1000);
        } else {
            setErrors(validationErrors);
            setIsSubmitting(false);
        }
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleAddItem,
        handleRemoveItem,
        handleItemChange,
        handleSubmit,
    };
};

// Validation function
const validate = (values) => {
    const errors = {};
    if (!values.amount) errors.amount = 'Amount is required';
    if (values.amount <= 0) errors.amount = 'Amount must be greater than 0';
    if (!values.reason) errors.reason = 'Reason is required';
    if (!values.date) errors.date = 'Date is required';
    return errors;
};

const departments = [
    'Administrative Department',
    'Logistics Department',
    'Training Department',
    'Operations Department',
    'Engineering Department',
];

const CRPFFundRequestPage = () => {
    const { values, errors, isSubmitting, handleChange, handleAddItem, handleRemoveItem, handleItemChange, handleSubmit } = useForm({
        amount: '',
        reason: '',
        date: '',
        requesterName: '',
        requesterId: '',
        department: '',
        requestPurpose: '',
        items: [{ name: '', quantity: 1, unitPrice: '' }]
    }, validate);

    return (
        <div className="crpf-container">
            <h1>CRPF Fund Request Form</h1>
            <form onSubmit={handleSubmit} className="crpf-form">
                <div className="form-group">
                    <label>Amount (₹):</label>
                    <input
                        type="number"
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        required
                    />
                    {errors.amount && <span className="error">{errors.amount}</span>}
                </div>
                <div className="form-group">
                    <label>Reason:</label>
                    <textarea
                        name="reason"
                        value={values.reason}
                        onChange={handleChange}
                        required
                    ></textarea>
                    {errors.reason && <span className="error">{errors.reason}</span>}
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={values.date}
                        onChange={handleChange}
                        required
                    />
                    {errors.date && <span className="error">{errors.date}</span>}
                </div>
                <div className="form-group">
                    <label>Requester Name:</label>
                    <input
                        type="text"
                        name="requesterName"
                        value={values.requesterName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Requester ID:</label>
                    <input
                        type="text"
                        name="requesterId"
                        value={values.requesterId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Department:</label>
                    <select
                        name="department"
                        value={values.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Request Purpose:</label>
                    <input
                        type="text"
                        name="requestPurpose"
                        value={values.requestPurpose}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Departmental needs, Personal needs"
                    />
                </div>
                <div className="form-group">
                    <label>Items:</label>
                    {values.items.map((item, index) => (
                        <div key={index} className="item-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Item Name"
                                value={item.name}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <input
                                type="number"
                                name="unitPrice"
                                placeholder="Unit Price (₹)"
                                value={item.unitPrice}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <button type="button" onClick={() => handleRemoveItem(index)}>Remove Item</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddItem}>Add Another Item</button>
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default CRPFFundRequestPage;
