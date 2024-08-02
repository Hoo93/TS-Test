import { defineFactorifyConfig } from '@julr/factorify';
import { UserFactory } from '../../src/factory/defineFactory';

describe('MemberFactory Test', () => {
  let disconnect: any;
  beforeAll(() => {
    disconnect = defineFactorifyConfig({
      casing: {
        insert: 'camel',
        return: 'camel',
      },
      database: {
        // See https://knexjs.org/guide/#configuration-options
        // for more information about the possible options
        client: 'pg',
        connection: {
          host: '127.0.0.1',
          port: 1104,
          user: 'vetching',
          password: 'test',
          database: 'vetching',
        },
      },
    });
  });

  it('UserFactory Create Test', async () => {
    // Given
    const user = await UserFactory.create();
  });

  it('UserFactory With Post Test', async () => {
    // Given
    const user = await UserFactory.with('posts', 1).create();

    // Then
  });

  it('UserFactory With Post, Comment Test', async () => {
    // Given
    const user = await UserFactory.with('posts', 1).with('comments', 3).create();
    // When
    // Then
  });
});
