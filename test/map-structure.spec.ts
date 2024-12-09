describe('Map Structure Test', () => {
  it('keys()', () => {
    // Given
    const map = new Map();
    map.set('key1', 'value1');
    map.set('key2', 'value2');
    map.set('key3', 'value3');
    map.set('key4', 'value4');

    // When
    const keys = Array.from(map.keys());

    // Then
    expect(keys).toEqual(['key1', 'key2', 'key3', 'key4']);
  });

  it('Map iterate of Test', () => {
    const map: Map<string, number> = new Map();
    map.set('key1', 1);
    map.set('key2', 2);
    map.set('key3', 3);
    map.set('key4', 4);

    // When, Then
    for (const [key, value] of map) {
      expect(value).toBe(map.get(key));
    }
  });
});
