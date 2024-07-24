'use client';
import React, { useState } from 'react';
import {
  validateEmail,
  validateMaxLength,
  validateMinLength,
  validatePasswordFormat,
  validatePasswordMatch,
  validateRequired,
} from 'utils/validate';

interface FormType {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_DATA = {
  id: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormType>(INITIAL_DATA);
  const [errorText, setErrorText] = useState<FormType>(INITIAL_DATA);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmFormData()) {
      const userInfos = JSON.parse(localStorage.getItem('users') || '[]');
      userInfos.push(formData);
      localStorage.setItem('users', JSON.stringify(userInfos));
    }
  };

  const handleChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const confirmFormData = () => {
    const newErrors = { ...INITIAL_DATA };
    const { id, name, email, password, confirmPassword } = formData;
    let result;

    result = validateRequired(id);
    if (result.isValid) {
      const minLengthCheck = validateMinLength(id, 5);
      const maxLengthCheck = validateMaxLength(id, 15);

      if (!minLengthCheck.isValid) {
        newErrors.id = minLengthCheck.message;
      } else if (!maxLengthCheck.isValid) {
        newErrors.id = maxLengthCheck.message;
      }
    } else {
      newErrors.id = result.message;
    }

    result = validateRequired(name);
    if (!result.isValid) newErrors.name = result.message;

    result = validateEmail(email);
    if (!result.isValid) newErrors.email = result.message;

    result = validateRequired(password);
    if (!result.isValid) {
      newErrors.password = result.message;
    } else {
      result = validatePasswordFormat(password);
      if (!result.isValid) {
        newErrors.password = result.message;
      } else {
        result = validateMinLength(password, 8);
        if (!result.isValid) {
          newErrors.password = result.message;
        } else {
          result = validateMaxLength(password, 20);
          if (!result.isValid) {
            newErrors.password = result.message;
          }
        }
      }
    }

    result = validateRequired(confirmPassword);
    if (!result.isValid) {
      newErrors.confirmPassword = result.message;
    } else {
      result = validatePasswordMatch(password, confirmPassword);
      if (!result.isValid) {
        newErrors.confirmPassword = result.message;
      }
    }

    setErrorText(newErrors);
    return Object.keys(newErrors).every((key) => newErrors[key as keyof FormType] === '');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input id="id" value={formData.id} onChange={handleChangeInput} />
        <span>{errorText.id}</span>
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" value={formData.name} onChange={handleChangeInput} />
        <span>{errorText.name}</span>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" value={formData.email} onChange={handleChangeInput} />
        <span>{errorText.email}</span>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" value={formData.password} onChange={handleChangeInput} />
        <span>{errorText.password}</span>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChangeInput}
        />
        <span>{errorText.confirmPassword}</span>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
