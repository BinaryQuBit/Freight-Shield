import { WebsiteValidation } from '../websiteValidation';

describe('WebsiteValidation', () => {
  test('returns empty string when website is empty', () => {
    const errorMessage = WebsiteValidation('');
    expect(errorMessage).toBe('');
  });

  test('returns error message when website is invalid', () => {
    const errorMessage = WebsiteValidation('invalidwebsite'); 
    expect(errorMessage).toBe('Website is invalid');
  });

  test('returns empty string when website is valid with http prefix', () => {
    const errorMessage = WebsiteValidation('http://www.raman.com');
    expect(errorMessage).toBe('');
  });

  test('returns empty string when website is valid with https prefix', () => {
    const errorMessage = WebsiteValidation('https://www.raman.com');
    expect(errorMessage).toBe('');
  });

  test('returns empty string when website is valid without prefix', () => {
    const errorMessage = WebsiteValidation('www.raman.com');
    expect(errorMessage).toBe('');
  });
});
