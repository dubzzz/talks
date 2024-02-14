import { findUser } from '@/db/Db';

export default async function Greeting() {
  const user = await findUser();
  return <p>Hello {user?.name ?? 'Unknown user'}!</p>;
}
