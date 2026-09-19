export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegisterInput(body: any): ValidationResult {
  const errors: string[] = [];
  const { name, email, password } = body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters.");
  }
  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    errors.push("A valid email is required.");
  }
  if (!password || typeof password !== "string" || password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }
  if (
    password &&
    (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))
  ) {
    errors.push("Password must contain both letters and numbers.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateLoginInput(body: any): ValidationResult {
  const errors: string[] = [];
  const { email, password } = body || {};

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    errors.push("A valid email is required.");
  }
  if (!password || typeof password !== "string") {
    errors.push("Password is required.");
  }

  return { valid: errors.length === 0, errors };
}
