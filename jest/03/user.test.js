import axios from 'axios';
import { getAllUsers } from './user';
import users from './users.json';

jest.mock('axios');

test('fetch users', async () => {
  const resp = { data: users };

  axios.get.mockResolvedValue(resp);

  const data = await getAllUsers();

  expect(data).toEqual(users);
})
