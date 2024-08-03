import { defineFactory } from '@julr/factorify';

interface User {
  id: number;
  name: string;
  password: string;
}

interface Post {
  id: number;
  content: string;
}

interface Comment {
  id: number;
  content: string;
}

export const CommentFactory: any = defineFactory<Comment>('comment', ({ faker, isStubbed }) => ({
  id: +faker.random.numeric(4),
  content: faker.random.alpha(6),
}))
  .belongsTo('user', () => UserFactory)
  .belongsTo('post', () => PostFactory)
  .build();

export const PostFactory: any = defineFactory<Post>('post', ({ faker, isStubbed }) => ({
  id: +faker.random.numeric(4),
  content: faker.random.alpha(6),
}))
  .hasMany('comments', () => CommentFactory, {
    localKey: 'id',
    foreignKey: 'postId',
  })
  .build();

export const UserFactory: any = defineFactory<User>('user', ({ faker, isStubbed }) => ({
  id: +faker.random.numeric(4),
  password: faker.random.alpha(6),
  name: faker.random.alpha(6),
}))
  .hasMany('posts', () => PostFactory, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  .hasMany('comments', () => CommentFactory, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  .build();
