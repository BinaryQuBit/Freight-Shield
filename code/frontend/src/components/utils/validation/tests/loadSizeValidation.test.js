import { LoadSizeValidation } from '../loadSizeValidation';

describe('LoadSizeValidation', () => {
  test('returns error message when number is null or undefined', () => {
    const errorMessage = LoadSizeValidation(null || undefined);
    expect(errorMessage).toBe('Number is required');
  });
  
  test('returns error message when number is empty', () => {
    const errorMessage = LoadSizeValidation('');
    expect(errorMessage).toBe('Number is required');
  });

  test('returns error message when number is not a whole number', () => {
    const errorMessage = LoadSizeValidation('abc');
    expect(errorMessage).toBe('Please enter a whole number');
  });

  test('returns error message when number is less than 1', () => {
    const errorMessage = LoadSizeValidation('0');
    expect(errorMessage).toBe('Load cannot be less than 1');
  });

  test('returns empty string when number is valid', () => {
    const errorMessage = LoadSizeValidation('10');
    expect(errorMessage).toBe('');
  });
});
