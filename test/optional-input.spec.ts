import { optionalInputFunction } from '../src/optional-input/optional-input';

/**
 * @see optional-input/optional-input.ts
 *
 * @description { input = 'default' }: { input?: string } 는 input이 주어지지 않았을 때 default 값을 반환합니다.
 */
describe('optional input test', () => {
  it('should return default value when input is not provided', () => {
    // Given
    // When
    const result = optionalInputFunction({});
    // Then
    expect(result).toBe('default');
  });
  it('should return input value when input is provided', () => {
    // Given
    // When
    const result = optionalInputFunction({ input: 'input' });
    // Then
    expect(result).toBe('input');
  });
});
