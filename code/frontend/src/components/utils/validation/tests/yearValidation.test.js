import { YearValidation } from '../yearCalidation';

describe('YearValidation', () => {
  test('returns "Year is required" when year is empty', () => {
    const errorMessage = YearValidation('');
    expect(errorMessage).toBe('Year is required');
  });

  test('returns "Year must be in YYYY format" when year is not in YYYY format', () => {
    const errorMessage = YearValidation('22'); // Not in YYYY format
    expect(errorMessage).toBe('Year must be in YYYY format');
  });

  test('returns "Year must be between 1900 and current year + 1" when year is not within the range', () => {
    const errorMessage = YearValidation('1899'); // Before 1900
    expect(errorMessage).toBe('Year must be between 1900 and ' + (new Date().getFullYear() + 1));
  });

  test('returns empty string when year is valid', () => {
    const errorMessage = YearValidation('2023');
    expect(errorMessage).toBe('');
  });
});
