import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function FullForm() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [submittedDate, setSubmittedDate] = useState(null);

    const datePickerHandleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      setSubmittedDate(selectedDate.toDateString());
    } else {
      alert('Please select a date before submitting.');
    }
  };


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    country: '',
    gender: '',
    agreeTerms: false,
  });

  // No need for submit to do anything special here, but you can keep it to prevent page reload
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <>

    <div style={{ maxWidth: 300, margin: 'auto' }}>
      <form onSubmit={datePickerHandleSubmit}>
        <label htmlFor="date-picker">Select a date:</label>
        <DatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          isClearable
          placeholderText="Click to select a date"
          style={{ display: 'block', margin: '10px 0' }}
        />
        <button type="submit">Submit</button>
      </form>

      {submittedDate && (
        <p style={{ marginTop: '20px' }}>
          You submitted: <strong>{submittedDate}</strong>
        </p>
      )}
    </div>



      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* Name */}
        <div>
          <label>
            Name:<br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {/* Email */}
        <div>
          <label>
            Email:<br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {/* Password */}
        <div>
          <label>
            Password:<br />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        {/* Bio (textarea) */}
        <div>
          <label>
            Bio:<br />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
            />
          </label>
        </div>

        {/* Country (select) */}
        <div>
          <label>
            Country:<br />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option value="us">USA</option>
              <option value="uk">UK</option>
              <option value="in">India</option>
            </select>
          </label>
        </div>

        {/* Gender (radio) */}
        <div>
          Gender:<br />
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
            />
            Male
          </label>{' '}
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            Female
          </label>{' '}
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === 'other'}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        {/* Agree to terms (checkbox) */}
        <div>
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            I agree to the terms and conditions
          </label>
        </div>

        {/* Submit button */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Display form data */}
      <div style={{ maxWidth: '400px', margin: '20px auto', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Form Data Preview:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </>
  );
}
