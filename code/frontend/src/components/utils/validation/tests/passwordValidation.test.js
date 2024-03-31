import { PasswordValidation, ConfirmPasswordValidation } from '../passwordValidation';

describe('PasswordValidation', () => {
  test('returns error message when password is empty', () => {
    const errorMessage = PasswordValidation('');
    expect(errorMessage).toBe('Password is required');
  });

  test('returns error message when password length is less than 8 characters', () => {
    const errorMessage = PasswordValidation('pass');
    expect(errorMessage).toBe('Password must be at least 8 characters long');
  });

  test('returns empty string when password is valid', () => {
    const errorMessage = PasswordValidation('password');
    expect(errorMessage).toBe('');
  });
});

describe('ConfirmPasswordValidation', () => {
  test('returns error message when passwords do not match', () => {
    const errorMessage = ConfirmPasswordValidation('password1', 'password2');
    expect(errorMessage).toBe('Passwords do not match');
  });

  test('returns empty string when passwords match', () => {
    const errorMessage = ConfirmPasswordValidation('password1', 'password1');
    expect(errorMessage).toBe('');
  });
});
