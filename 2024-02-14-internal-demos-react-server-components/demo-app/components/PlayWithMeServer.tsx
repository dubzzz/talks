import { findCounter } from '@/db/Db';
import PlayWithMe from './PlayWithMe';

export default async function PlayWithMeServer() {
  const init = await findCounter();
  return <PlayWithMe init={init} />;
}
