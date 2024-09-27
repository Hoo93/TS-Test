import { format, isAfter, set } from 'date-fns';

describe('date-fns Test', () => {
  describe('isAfter Test', () => {
    it('isAfter(date_a, date_b) 의 형태로 비교한다.', () => {
      // Given
      const date_a = new Date(2000, 1, 1);
      const date_b = new Date(2024, 7, 22);

      // When
      const sut = isAfter(date_a, date_b);

      // Then
      expect(sut).toBe(false);
    });

    it('boolean 값을 리턴한다.', () => {
      // Given
      const date_a = new Date(2000, 1, 1);
      const date_b = new Date(2024, 7, 22);

      // When
      const sut = isAfter(date_a, date_b);

      // Then
      expect(sut).toBe(false);
    });

    it('앞의 날짜를 기준으로 isAfter를 판별한다.', () => {
      // Given
      const date_a = new Date(2000, 1, 1);
      const date_b = new Date(2024, 7, 22);

      // When
      const sut = isAfter(date_a, date_b);

      // Then
      // 2000 년은 2024년 보다 후가 아니므로 false return
      expect(sut).toBe(false);
    });
  });

  describe('format Test', () => {
    it.each([
      [new Date('2024-08-01T00:00:00.000Z'), '2024년 8월 1일'],
      [new Date('2024-11-12T00:00:00.000Z'), '2024년 11월 12일'],
      [new Date('2024-12-31T15:00:00.000Z'), '2025년 1월 1일'],
    ])('%s 를 "%s" 로 포맷한다.', (date, expected) => {
      // Given
      // When
      const result = format(date, 'yyyy년 M월 d일');
      // Then
      expect(result).toBe(expected);
    });
  });

  describe('set Test', () => {
    it('set 함수는 입력한 값의 Date 객체를 생성한다.', () => {
      // Given
      const now = new Date('2024-08-31T00:00:00Z');

      // When
      const result = set(now, { hours: 10, minutes: 57 });

      // Then
      expect(result).toStrictEqual(new Date('2024-08-31T10:57:00'));
    });

    it('set 함수는 새로운 Date 객체를 생성한다.', () => {
      // Given
      const now = new Date('2024-08-31T00:00:00Z');

      // When
      const result = set(now, { hours: 10, minutes: 57 });

      // Then
      expect(result).not.toStrictEqual(now);
      expect(now).toStrictEqual(new Date('2024-08-31T00:00:00Z'));
    });
  });
});
