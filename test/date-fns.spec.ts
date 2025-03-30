import { addSeconds, eachDayOfInterval, format, isAfter, isBefore, isWithinInterval, set } from 'date-fns';

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

    it('같은 경우 false 를 리턴한다.', () => {
      // Given
      const date_a = new Date(2000, 1, 1);
      const date_b = new Date(2000, 1, 1);

      // When
      const sut = isAfter(date_a, date_b);

      // Then
      // 2000 년은 2024년 보다 후가 아니므로 false return
      expect(sut).toBe(false);
    });
  });

  describe('isBefore Test', () => {
    it('isBefore(date_a, date_b) 의 형태로 비교한다.', () => {
      // Given
      const date_a = new Date(2000, 1, 1);
      const date_b = new Date(2024, 7, 22);

      // When
      const sut = isBefore(date_a, date_b);

      // Then
      expect(sut).toBe(true);
    });

    it('boolean 값을 리턴한다.', () => {
      // Given
      const date_a = new Date(2020, 5, 1);
      const date_b = new Date(2021, 5, 1);

      // When
      const sut = isBefore(date_a, date_b);

      // Then
      expect(typeof sut).toBe('boolean');
    });

    it('앞의 날짜를 기준으로 isBefore 를 판별한다.', () => {
      // Given
      const date_a = new Date(2020, 5, 1);
      const date_b = new Date(2021, 5, 1);

      // When
      const sut = isBefore(date_a, date_b);

      // Then
      // 2020년은 2021년보다 전이므로 true 리턴
      expect(sut).toBe(true);
    });

    it('같은 경우 false 를 리턴한다.', () => {
      // Given
      const date_a = new Date(2024, 7, 22);
      const date_b = new Date(2024, 7, 22);

      // When
      const sut = isBefore(date_a, date_b);

      // Then
      // 날짜가 같으므로 false 리턴
      expect(sut).toBe(false);
    });

    it('date_a 가 date_b 보다 이후이면 false 를 리턴한다.', () => {
      // Given
      const date_a = new Date(2025, 0, 1); // 2025-01-01
      const date_b = new Date(2024, 11, 31); // 2024-12-31

      // When
      const sut = isBefore(date_a, date_b);

      // Then
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

  describe('isWithinInterval', () => {
    it('start 이상 end 이하를 true 로 리턴한다.', () => {
      // Given
      const start = new Date(2024, 1, 22);
      const end = new Date(2024, 2, 22);

      // When
      const startResult = isWithinInterval(start, { start, end });
      const endResult = isWithinInterval(end, { start, end });

      // Then
      expect(startResult).toBe(true);
      expect(endResult).toBe(true);
    });
  });

  describe('eachDayOfInterval', () => {
    it('start~end 사이의 startOfDay를 리턴한다.', () => {
      // Given

      // When
      const result = eachDayOfInterval({
        start: new Date('2024-02-13T00:00:00Z'),
        end: new Date('2024-02-15T00:00:00Z'),
      });

      // Then
      expect(result).toMatchObject([
        new Date('2024-02-12T15:00:00.000Z'),
        new Date('2024-02-13T15:00:00.000Z'),
        new Date('2024-02-14T15:00:00.000Z'),
      ]);
    });

    it('end Date 의 날짜도 포함한다,.', () => {
      // Given

      // When
      const result = eachDayOfInterval({
        start: new Date('2024-02-13T00:00:00Z'),
        end: new Date('2024-02-15T00:00:00Z'),
      });

      // Then
      expect(result.at(-1)).toStrictEqual(new Date('2024-02-14T15:00:00.000Z'));
    });
  });
});
