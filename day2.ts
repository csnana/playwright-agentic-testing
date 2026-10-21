interface TestUser {  username: string; active: boolean;}

function describeUser(user: TestUser): string {
  return `${user.username} is ${user.active ? 'active' : 'inactive'}`;
}

const user: TestUser = { username: 'Nanjappa', active: false};

console.log(describeUser(user));

import { getBaseUrl } from './test-utils';
const url: string = getBaseUrl();
console.log(url);