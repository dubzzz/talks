import { Suspense } from 'react';
import Greeting from '@/components/Greeting';
import PlayWithMeServer from '@/components/PlayWithMeServer';

export default function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>
        <Greeting />
      </Suspense>
      <Suspense fallback={'Loading counter...'}>
        <PlayWithMeServer />
      </Suspense>
    </main>
  );
}
