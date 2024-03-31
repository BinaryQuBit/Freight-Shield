import { EmailValidation } from '../emailValidation';

describe('EmailValidation', () => {
  test('returns error message when email is empty', () => {
    const email = '';
    const errorMessage = EmailValidation(email);
    expect(errorMessage).toBe('Email is required');
  });

  test('returns error message when email is invalid', () => {
    const email = 'invalid-email';
    const errorMessage = EmailValidation(email);
    expect(errorMessage).toBe('Email is invalid');
  });

  test('returns empty string when email is valid', () => {
    const email = 'valid@example.com';
    const errorMessage = EmailValidation(email);
    expect(errorMessage).toBe('');
  });
});
