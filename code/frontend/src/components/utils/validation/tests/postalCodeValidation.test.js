import { PostalCodeValidation } from '../postalCodeValidation';

describe('PostalCodeValidation', () => {
  test('returns error message when postal code is empty', () => {
    const errorMessage = PostalCodeValidation('');
    expect(errorMessage).toBe('Postal code is required');
  });

  test('returns error message when postal code is invalid', () => {
    const errorMessage1 = PostalCodeValidation('A1A');
    expect(errorMessage1).toBe('Postal code is invalid');

    const errorMessage2 = PostalCodeValidation('A1A 1@1');
    expect(errorMessage2).toBe('Postal code is invalid');

    const errorMessage3 = PostalCodeValidation('A1A-1A');
    expect(errorMessage3).toBe('Postal code is invalid');
  });

  test('returns empty string when postal code is valid', () => {
    const errorMessage = PostalCodeValidation('A1A1A1');
    expect(errorMessage).toBe('');
  });
});
