import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'vinh',
      password: '$2b$12$m9SqJGE3QQd99CVGujpdweufWglFdttDRlp..I/B6CHyaq994mCky',
    },
    {
      userId: 2,
      username: 'tung',
      password: '$2b$12$KVs4H2WyMW75d0NWdRVIK.TJPP8eEXZsU6.gbw1qP758WmO03OQM2',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
