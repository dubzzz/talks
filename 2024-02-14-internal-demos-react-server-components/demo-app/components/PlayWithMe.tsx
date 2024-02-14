'use client';

import { saveCounter } from '@/db/Db';
import { useState } from 'react';

export default function PlayWithMe({ init }: { init: number }) {
  const [counter, setCounter] = useState(init);
  return (
    <>
      <button onClick={() => setCounter((c) => c + 1)}>Click to increment, currently: {counter}</button>
      <button onClick={() => saveCounter(counter)}>Save</button>
    </>
  );
}
