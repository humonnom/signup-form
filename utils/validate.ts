type ValidationResult = {
  isValid: boolean;
  message: string;
};

const validateRequired = (value: string): ValidationResult => ({
  isValid: value.trim() !== '',
  message: '값을 입력해주세요.',
});

const validateMinLength = (value: string, min: number): ValidationResult => ({
  isValid: value.length >= min,
  message: `최소 ${min}자 이상 입력해주세요.`,
});

const validateMaxLength = (value: string, max: number): ValidationResult => ({
  isValid: value.length <= max,
  message: `최대 ${max}자 이하로 입력해주세요.`,
});

const validateEmail = (value: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(value),
    message: '이메일 형식에 맞게 입력해주세요.',
  };
};

const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): ValidationResult => ({
  isValid: password === confirmPassword,
  message: '비밀번호가 일치하지 않습니다.',
});

const validatePasswordFormat = (value: string): ValidationResult => {
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  return {
    isValid: passwordRegex.test(value),
    message: '영문과 숫자만 입력해주세요.',
  };
};

export {
  validateEmail,
  validateMaxLength,
  validateMinLength,
  validatePasswordFormat,
  validatePasswordMatch,
  validateRequired,
};
