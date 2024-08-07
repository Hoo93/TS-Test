describe('Date Test', () => {
  it('undefined 로 Date 를 생성할 수 있다.', () => {
    // Given, When
    const undefindDate = new Date(undefined);

    // Then
    expect(undefindDate).toBeDefined();
  });

  it('undefined 생성한 Date 는 Date 객체이다.', () => {
    // Given, When
    const undefindDate = new Date(undefined);

    // Then
    expect(undefindDate).toBeInstanceOf(Date);
  });

  it('undefined 생성한 Date 를 toDateString Invalid Date 메시지 리턴된다.', () => {
    // Given
    const undefindDate = new Date(undefined);

    // When
    const sut = undefindDate.toDateString();

    // Then
    expect(sut).toBe('Invalid Date');
  });

  it.each([
    ['getDate'],
    ['getDay'],
    ['getFullYear'],
    ['getHours'],
    ['getMilliseconds'],
    ['getMinutes'],
    ['getMonth'],
    ['getSeconds'],
    ['getTime'],
  ])('undefined 생성한 Date 에서 시간을 추출하는 함수 %s 를 사용하면 NaN이 리턴된다.', (method) => {
    // Given
    const undefindDate = new Date(undefined);

    // When
    const sut = undefindDate[method]();

    // Then
    expect(sut).toBeNaN();
    expect(isNaN(sut)).toBeTruthy();
  });

  describe('Date to String Test', () => {
    it('toISOString', () => {
      // Given
      const date = new Date('2024-07-01T00:00:00.000Z');

      // When
      const sut = date.toISOString();

      // Then
      expect(sut).toBe('2024-07-01T00:00:00.000Z');
    });
  });

  describe('day Of week Test', () => {
    it('Date From DateString', () => {
      // Given
      const dateString = '2024-08-07';

      // When
      const date = new Date(dateString);

      // Then
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(7);
      expect(date.getDate()).toBe(7);
    });

    it('Day From DateString', () => {
      // Given
      const dateString = '2024-08-07';

      // When
      const date = new Date(dateString);

      // Then
      expect(date.getDay()).toBe(3);
    });
  });
});
