"use client";
import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [users, setUsers] = useState<User[]>([]);

  const checkEmailExists = (email: string) => {
    return users.some((user) => user.email === email);
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!id) newErrors.id = "값을 입력해주세요.";
    else if (id.length < 5) newErrors.id = "최소 5자 이상 입력해주세요.";
    else if (id.length > 15) newErrors.id = "최대 15자 이하로 입력해주세요.";

    if (!name) newErrors.name = "값을 입력해주세요.";

    if (email) {
      if (!/\S+@\S+\.\S+/.test(email))
        newErrors.email = "이메일 형식에 맞게 입력해주세요.";
      else if (users.some((user) => user.email === email))
        newErrors.email = "이미 존재하는 이메일입니다.";
    }

    if (!password) newErrors.password = "값을 입력해주세요.";
    else if (password.length < 8)
      newErrors.password = "최소 8자 이상 입력해주세요.";
    else if (password.length > 20)
      newErrors.password = "최대 20자 이하로 입력해주세요.";
    else if (!/^[A-Za-z0-9]+$/.test(password))
      newErrors.password = "영문과 숫자만 입력해주세요.";

    if (!confirmPassword) newErrors.confirmPassword = "값을 입력해주세요.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && !checkEmailExists(email)) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: User = { id, name, email, password: hashedPassword };
      const updatedUsers = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      // Reset form fields
      setId("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={"text-amber-500"}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          id="id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        {errors.id && <span>{errors.id}</span>}
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          // type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
