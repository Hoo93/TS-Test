describe('objectContaining/ toMatchObject Test', () => {
  it('objectContaining Test', () => {
    // Given
    const user = {
      name: 'Kim',
      address: {
        city: 'Seoul',
        country: 'Korea',
      },
    };

    // When
    // Then
    expect(user).toEqual(
      expect.objectContaining({
        name: expect.any(String), // name만 일치하는지 확인
        address: expect.objectContaining({
          city: 'Seoul', // address.city가 일치하는지 확인
        }),
      }),
    ); // SUCCESS

    expect(user).toMatchObject({
      name: 'Kim',
    }); // SUCCESS

    expect(user).toMatchObject({
      name: 'Kim',
      address: {
        city: 'Seoul',
      },
    }); // SUCCESS
  });

  it('array objectContaining Test', () => {
    // GOAL : 배열의 객체가 일부만 일치하는지 확인

    // Given
    const products = [
      { id: 1, name: 'Laptop', price: 1000 },
      { id: 2, name: 'Mouse', price: 50 },
      { id: 3, name: 'Keyboard', price: 80 },
    ];

    // 배열에서 'Laptop'이 포함된 객체를 확인
    expect(products).toEqual(expect.arrayContaining([{ id: 1, name: 'Laptop', price: 1000 }])); // SUCCESS

    // 배열의 전체가 아닌 특정 객체에 대한 부분 일치를 확인
    expect(products).toEqual(expect.arrayContaining([expect.objectContaining({ name: 'Laptop' })])); // SUCCESS

    // toMatchObject 를 사용한 테스트
    expect(products).toMatchObject([{ id: 1, name: 'Laptop', price: 1000 }]); // FAIL

    // 만약 나였다면 ... ?
    const result = products.find((product) => product.name === 'Laptop');
    expect(result).toMatchObject({ name: 'Laptop' }); // SUCCESS

    // 결론 toMatchObject 는 배열의 전체가 일치해야 성공하는 반면, expect.arrayContaining 은 배열의 일부만 일치해도 성공한다.
  });
});
