import { LexoRank } from 'lexorank';

describe('LexoRank PlayGround', () => {
  it('LexoRank min/max', async () => {
    // Given
    // When
    const minRank = LexoRank.min();
    const maxRank = LexoRank.max();

    // Then
    expect(minRank.toString()).toBe('0|000000:');
    expect(maxRank.toString()).toBe('0|zzzzzz:');
  });

  describe('Bucket', () => {
    it('lexoRank 맨 앞 자리를 얻는다.', () => {
      // Given
      const lexo = LexoRank.parse('0|zzzzzz:');

      // When
      const bucket = lexo.getBucket();

      // Then
      expect(lexo.toString()).toBe('0|zzzzzz:');
      expect(bucket.format()).toBe('0');
    });

    it('next 를 통해 다음 bucket 을 얻어온다.', () => {
      // Given
      const lexo = LexoRank.parse('0|zzzzzz:');

      // When
      const bucket = lexo.getBucket();
      const nextBucket = bucket.next();

      // Then
      expect(nextBucket.format()).toBe('1');
    });

    it('bucket 은 0 1 2 가 반복된다.', () => {
      // Given
      const lexo = LexoRank.parse('0|zzzzzz:');

      // When
      const bucket = lexo.getBucket();
      const nextBucket = bucket.next();
      const nextNextBucket = nextBucket.next();
      const nextNextNextBucket = nextNextBucket.next();

      // Then
      expect(bucket.format()).toBe('0');
      expect(nextBucket.format()).toBe('1');
      expect(nextNextBucket.format()).toBe('2');
      expect(nextNextNextBucket.format()).toBe('0');
    });
  });

  describe('Parse', () => {
    it('문자열을 LexoRank 로 변환한다.', () => {
      // Given
      const stringRank = '1|a00000';

      // When
      const parsedRank = LexoRank.parse(stringRank);

      // Then
      expect(parsedRank).toBeInstanceOf(LexoRank);
      expect(parsedRank.toString()).toBe('1|a00000:');
    });

    it('d|d{6}: 형태의 string 으로 변환한다.', () => {
      // Given
      const stringRank = '1|a';

      const lexoRegex = /[0-2]|[0-9a-z]{6}:/;

      // When
      const parsedRank = LexoRank.parse(stringRank);

      // Then
      expect(parsedRank).toBeInstanceOf(LexoRank);
      expect(parsedRank.toString()).toMatch(lexoRegex);
    });

    it('| 뒤에 6자리가 아닌 경우 앞에 모자른 만큼 0 을 추가한다.', () => {
      // Given
      const stringRank = '1|a';

      // When
      const parsedRank = LexoRank.parse(stringRank);

      // Then
      expect(parsedRank).toBeInstanceOf(LexoRank);
      expect(parsedRank.toString()).toBe('1|00000a:');
    });
  });

  describe('LexoRank Compare', () => {
    it('A 가 B 이전일 경우 -1 을 리턴한다.', async () => {
      // Given
      const rank1 = LexoRank.parse('0|000000:1');
      const rank2 = LexoRank.parse('0|000000:2');

      // When
      const result = rank1.compareTo(rank2);

      // Then
      expect(result).toBe(-1);
    });

    it('A 가 B 이후일 경우 1 을 리턴한다.', async () => {
      // Given
      const rank1 = LexoRank.parse('0|000000:1');
      const rank2 = LexoRank.parse('0|000000:2');

      // When
      const result = rank2.compareTo(rank1);

      // Then
      expect(result).toBe(1);
    });
  });

  describe('between', () => {
    it('두 LexoRank 의 사잇값을 리턴한다.', () => {
      // Given
      const rank1 = LexoRank.parse('0|000000:1');
      const rank2 = LexoRank.parse('0|000000:2');

      // When
      const result = rank2.between(rank1);

      // Then
      expect(result.toString()).toBe('0|000000:1i'); // 1 다음 2 인데 겹치므로 2 번째 자리로 이동하고 0~z 중 가운데 값인 i 를 리턴
    });

    it('자릿 수의 제한이 없다.', () => {
      // Given
      const rank1 = LexoRank.parse('0|000000:11111111111111111111111111111111111111111111111111111111111111111111111');
      const rank2 = LexoRank.parse('0|000000:11111111111111111111111111111111111111111111111111111111111111111111112');

      // When
      const result = rank2.between(rank1);

      // Then
      expect(result.toString()).toBe('0|000000:11111111111111111111111111111111111111111111111111111111111111111111111i'); // 1 다음 2 인데 겹치므로 2 번째 자리로 이동하고 0~z 중 가운데 값인 i 를 리턴
    });

    it('같은 lexoRank 값 사이의 값을 구할 경우 에러가 발생한다.', () => {
      // Given
      const rank1 = LexoRank.parse('0|000000:1');
      const rank2 = LexoRank.parse('0|000000:1');

      // When, Then
      expect(() => {
        rank2.between(rank1);
      }).toThrow();
    });
  });

  describe('genNext', () => {
    it('다음 lexoRank 값을 생성한다.', () => {
      // Given
      const lexo = LexoRank.parse('0|000000:1');

      // When
      const nextLexo = lexo.genNext();
      const next_2_Lexo = nextLexo.genNext();
      const next_3_Lexo = next_2_Lexo.genNext();
      const next_4_Lexo = next_3_Lexo.genNext();
      const next_5_Lexo = next_4_Lexo.genNext();

      // Then
      expect(nextLexo.toString()).toBe('0|000009:');
      expect(next_2_Lexo.toString()).toBe('0|00000h:');
      expect(next_3_Lexo.toString()).toBe('0|00000p:');
      expect(next_4_Lexo.toString()).toBe('0|00000x:');
      expect(next_5_Lexo.toString()).toBe('0|000015:');
    });

    it('fixed variable 의 마지막 자리수를 9~10 증가시킨 값을 리턴한다.', () => {
      // Given
      const lexo = LexoRank.parse('0|000000:1');

      // When
      const nextLexo = lexo.genNext();
      const next_2_Lexo = nextLexo.genNext();
      const next_3_Lexo = next_2_Lexo.genNext();
      const next_4_Lexo = next_3_Lexo.genNext();
      const next_5_Lexo = next_4_Lexo.genNext();

      // Then
      expect(nextLexo.toString()).toBe('0|000009:');
      expect(next_2_Lexo.toString()).toBe('0|00000h:');
      expect(next_3_Lexo.toString()).toBe('0|00000p:');
      expect(next_4_Lexo.toString()).toBe('0|00000x:');
      expect(next_5_Lexo.toString()).toBe('0|000015:');
    });
  });
});
