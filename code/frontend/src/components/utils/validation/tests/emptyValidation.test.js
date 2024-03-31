import { EmptyValidation } from '../emptyValidation';

describe('EmptyValidation', () => {
  test('returns error message when value is null or undefined', () => {
    const name = 'Field';
    const value = null || undefined;
    const errorMessage = EmptyValidation(name, value);
    expect(errorMessage).toBe('Field does not exist');
  });

  test('returns error message when trimmed value is empty', () => {
    const name = 'Field';
    const value = '    ';
    const errorMessage = EmptyValidation(name, value);
    expect(errorMessage).toBe('Field is required');
  });

  test('returns empty string when trimmed value is not empty', () => {
    const name = 'Field';
    const value = 'value';
    const errorMessage = EmptyValidation(name, value);
    expect(errorMessage).toBe('');
  });
});
