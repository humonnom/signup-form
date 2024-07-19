"use client";
import React, { useState } from "react";

const SignupForm: React.FC = () => {
  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState({
    id:"",
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "id":
        setId(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateInputs();
  };
  const validateInputs = () => {
    const NewErrorMessage = {
      id:"",
      name:"",
      email:"",
      password:"",
      confirmPassword:""
    }
    if (!id?.trim().length) {
      NewErrorMessage.id = "값을 입력해주세요.";
      setId("")

    }
    if (!name?.trim().length) {
      NewErrorMessage.name = "값을 입력해주세요.";
      setName("") 
    }
    if (!email?.trim().length) {
      NewErrorMessage.email = "값을 입력해주세요.";
      setEmail("") 
    }
    if (!password?.trim().length) {
      NewErrorMessage.password = "값을 입력해주세요.";
      setPassword("") 
    }
    if (!confirmPassword?.trim().length) {
      NewErrorMessage.confirmPassword = "값을 입력해주세요.";
      setConfirmPassword("") 
    }
    setErrorMessage(NewErrorMessage);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input id="id" onChange={handleInputChange} />
        {errorMessage?.id.length && <p>{errorMessage.id}</p>}
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" onChange={handleInputChange} />
        {errorMessage?.name.length && <p>{errorMessage.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" onChange={handleInputChange} />
        {errorMessage?.email.length && <p>{errorMessage.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" onChange={handleInputChange} />
        {errorMessage?.password.length && <p>{errorMessage.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" onChange={handleInputChange} />
        {errorMessage?.confirmPassword.length && <p>{errorMessage.confirmPassword}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
