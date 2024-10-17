---
theme: seriph
background: /assets/wallpaper-1.jpg
title: Fine-Grained reactivity without any compiler
info: Fine-Grained reactivity without any compiler
class: text-center # apply any unocss classes to the current slide
highlighter: shiki # https://sli.dev/custom/highlighters.html
drawings:
  persist: false
transition: slide-left
mdc: true # enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
colorSchema: dark
themeConfig:
  primary: rgb(61, 172, 225)
  secondary: rgb(247, 147, 35)
---

<!---
https://x.com/posva/status/1198918347599106049

https://x.com/bernhardsson/status/1523763748200382464?t=-pZG5v8Fv8STgEnOK6pkGQ

https://x.com/rorypreddy/status/1142967056150728708

Maybe for conclusion?
https://www.linkedin.com/posts/alexis-hamann-845a74102_quand-tu-fais-un-hotfix-en-prod-ugcPost-6580374814211604480-A9xM/
-->

<div style="display:flex; justify-content: center; margin-bottom: 16px;">
  <img src="/assets/conf-logo.webp" style="max-width: 20%" />
</div>

<h1 style="color: #fff !important">Fine-Grained reactivity without any compiler</h1>

_How did we achieve fine-grained reactivity at Pigment?_

_**by Nicolas DUBIEN**_

---
layout: center
---

# What is reactivity? 🤔

<div v-click>

<blockquote>
<div style="font-size: 2em; text-align: left; line-height: 1.5em;">
When you modify [the states], the view updates. It makes state management simple and intuitive
</div>
</blockquote>

<p style="text-align: right">

From [vuejs.org](https://vuejs.org/guide/extras/reactivity-in-depth.html)

</p>
</div>

<div v-click  style="text-align: center">
<pre><code>
DOM = f(States)
</code></pre>
</div>

---

## Let's consider a basic example

<div style="display: grid;">
<v-switch>
<template #1>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <img src="/assets/simple-target.png" alt="Simple target" />
</div>
</template>
<template #2>
<div style="grid-row: 1; grid-column: 1; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-1.svg" alt="Basic step number 1" />
    <img src="/assets/simple-target.png" alt="Simple target" />
  </div>
</div>
</template>
<template #3>
<div style="grid-row: 1; grid-column: 1; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-2.svg" alt="Basic step number 2" />
    <img src="/assets/simple-target.png" alt="Simple target" />
  </div>
</div>
</template>
<template #4>
<div style="grid-row: 1; grid-column: 1; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-3.svg" alt="Basic step number 3" />
    <img src="/assets/simple-target.png" alt="Simple target" />
  </div>
</div>
</template>
<template #5>
<div style="grid-row: 1; grid-column: 1; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-4.svg" alt="Basic step number 4" />
    <img src="/assets/simple-target.png" alt="Simple target" />
  </div>
</div>
</template>
<template #6>
<div style="grid-row: 1; grid-column: 1; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">

```tsx
function App() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  return (
    <div>
      <Counter
        value={value1}
        increment={() => setValue1((v) => v + 1)} />
      <Counter
        value={value2}
        increment={() => setValue2((v) => v + 1)} />
      <Counter
        value={value3}
        increment={() => setValue3((v) => v + 1)} />
      <Total
        value1={value1}
        value2={value2}
        value3={value3} />
    </div>
  );
}
```

<img src="/assets/reactivity-bad-edited.gif" alt="Bad reactivity example" />
  </div>
</div>
</template>
</v-switch>
</div>

---
layout: center
---

![](/assets/not-the-right-thing.gif)

---
layout: center
---

<img src="/assets/sad-thing-no.jpg" style="max-width: 80%" />

---

## 🦸‍♀️ Compiler to the rescue

<div v-click style="padding-top: 16px;">

<img
  src="/assets/reactivity-compiler-edited.gif"
  alt="Better reactivity example"
/>

More details about the compiler at https://react.dev/learn/react-compiler

</div>

---
zoom: 1.4
---


````md magic-move {lines: true}
```tsx
function App() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  return (
    <div>
      <Counter value={value1} increment={() => setValue1((v) => v + 1)} />
      <Counter value={value2} increment={() => setValue2((v) => v + 1)} />
      <Counter value={value3} increment={() => setValue3((v) => v + 1)} />
      <Total value1={value1} value2={value2} value3={value3} />
    </div>
  );
}
```

```js
function App() {
  const $ = _c(18);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => setValue1((v) => v + 1);
    $[0] = t0;
  } else {
    t0 = $[0];
  }

  let t1;
  if ($[1] !== value1) {
    t1 = <Counter value={value1} increment={t0} />;
// ...more code...
```
````

---
zoom: 0.28
---


```js
function App() {
  const $ = _c(18);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => setValue1((v) => v + 1);
    $[0] = t0;
  } else {
    t0 = $[0];
  }

  let t1;
  if ($[1] !== value1) {
    t1 = <Counter value={value1} increment={t0} />;
    $[1] = value1;
    $[2] = t1;
  } else {
    t1 = $[2];
  }

  let t2;
  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = () => setValue2((v_0) => v_0 + 1);

    $[3] = t2;
  } else {
    t2 = $[3];
  }

  let t3;
  if ($[4] !== value2) {
    t3 = <Counter value={value2} increment={t2} />;
    $[4] = value2;
    $[5] = t3;
  } else {
    t3 = $[5];
  }

  let t4;
  if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = () => setValue3((v_1) => v_1 + 1);
    $[6] = t4;
  } else {
    t4 = $[6];
  }

  let t5;
  if ($[7] !== value3) {
    t5 = <Counter value={value3} increment={t4} />;
    $[7] = value3;
    $[8] = t5;
  } else {
    t5 = $[8];
  }

  let t6;
  if ($[9] !== value1 || $[10] !== value2 || $[11] !== value3) {
    t6 = <Total value1={value1} value2={value2} value3={value3} />;
    $[9] = value1;
    $[10] = value2;
    $[11] = value3;
    $[12] = t6;
  } else {
    t6 = $[12];
  }

  let t7;
  if ($[13] !== t1 || $[14] !== t3 || $[15] !== t5 || $[16] !== t6) {
    t7 = (
      <div>
        {t1}
        {t3}
        {t5}
        {t6}
      </div>
    );
    $[13] = t1;
    $[14] = t3;
    $[15] = t5;
    $[16] = t6;
    $[17] = t7;
  } else {
    t7 = $[17];
  }

  return t7;
}
```

---
layout: center
---

<img src="/assets/compiler-effect-5.gif" style="max-width: 80%" />

<!--
While the compiler looks promising,

1. It does not solve all the reactivity issues, but mostly simple ones. It cannot be as tailored as a very custom piece of optimization.
2. It has extra runtime costs. I recommend you to play with the REPL and playground to see the generated code. While not huge, that's still an overhead that might be useless in many cases for very optimized apps.

That said it should cover most of the cases for free. As such it's definitely a great option to use (once ready)!
-->

---
layout: center
---

# What is **fine-grained** reactivity? 🤔

<div v-click>

<blockquote>
<div style="font-size: 2em; text-align: left; line-height: 1.5em;">
In a fine-grained reactive system an application will now have the ability to make highly targeted and specific updates.
</div>
</blockquote>

<p style="text-align: right">

From [docs.solidjs.com](https://docs.solidjs.com/advanced-concepts/fine-grained-reactivity)

</p>
</div>

<div v-click style="text-align: center">
In such world: Only the <code>&lt;Counter/&gt;</code> being impacted and the <code>&lt;Total/&gt;</code> should recompute themselves
</div>

---
layout: center
---

# Let's talk about fine-grained reactivity

---
layout: cover
background: /assets/wallpaper-1.jpg
---

<div>
  <img src="/assets/me.jpg" style="border-radius: 50%; height: 128px; border: white 2px solid;" />
</div>

<div style="margin-top: 48px"></div>
<h2 style="color: #fff !important">Fine-Grained reactivity without any compiler</h2>
<h1 style="color: #fff !important">Nicolas DUBIEN</h1>
<div style="display: flex; justify-content: center; font-size: 1.2em; margin-top: -20px; align-items: end;">
  <span style="margin-top: 0.7em">
    Software Engineer at&nbsp;
  </span>
  <img
    src="/assets/Pigment logo.svg"
    style="height: 31px; box-shadow: none"
  />
</div>
<div style="opacity: 0.5">
 <a href="https://engineering.pigment.com/" target="_blank">engineering.pigment.com</a>
</div>

<div style="margin-top: 48px"></div>
<div style="display: flex; gap: 8px; color: #ffffff; vertical-align: middle;">
  <img src="/assets/github-white.png" style="height: 24px; border: none; background: none; margin: 0px" />
  dubzzz
</div>
<div style="display: flex; gap: 8px; color: #ffffff; vertical-align: middle;">
  <img src="/assets/x.png" style="height: 24px; border: none; background: none; margin: 0px" />
  ndubien
</div>
<div style="display: flex; gap: 8px; color: #ffffff; vertical-align: middle;">
  <img
    src="/assets/npm.png"
    style="height: 24px; border: none; background: none; margin: 0px; filter: grayscale(1)"
  />
  fast-check
</div>

---
layout: center
---

# How to make our application reactive?

---

## Let's understand why it was not very reactive

<div style="display: grid;">
<v-switch>
<template #1>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-4.svg" alt="Basic step number 4" />
    <ul></ul>
  </div>
</div>
</template>
<template #2>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-5.svg" alt="Basic step number 5" />
    <ul><li>Whenever the state of a component changes React has to re-render it</li></ul>
  </div>
</div>
</template>
<template #3>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-6.svg" alt="Basic step number 6" />
    <ul>
      <li>Whenever the state of a component changes React has to re-render it</li>
      <li>Whenever a component re-renders React has to re-render all its children <i>(the ones instantiating by this component)</i></li>
    </ul>
  </div>
</div>
</template>
<template #4>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-7.svg" alt="Basic step number 7" />
    <ul>
      <li>Whenever the state of a component changes React has to re-render it</li>
      <li>Whenever a component re-renders React has to re-render all its children <i>(the ones instantiating by this component)</i></li>
    </ul>
  </div>
</div>
</template>
<template #5>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-8.svg" alt="Basic step number 8" />
    <ul>
      <li>Whenever the state of a component changes React has to re-render it</li>
      <li>Whenever a component re-renders React has to re-render all its children <i>(the ones instantiating by this component)</i></li>
    </ul>
  </div>
</div>
</template>
<template #6>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-9.svg" alt="Basic step number 9" />
    <ul>
      <li>Whenever the state of a component changes React has to re-render it</li>
      <li>Whenever a component re-renders React has to re-render all its children <i>(the ones instantiating by this component)</i></li>
    </ul>
  </div>
</div>
</template>
<template #7>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-10.svg" alt="Basic step number 10" />
    <ul>
      <li>Whenever the state of a component changes React has to re-render it</li>
      <li>Whenever a component re-renders React has to re-render all its children <i>(the ones instantiating by this component)</i></li>
    </ul>
  </div>
</div>
</template>
<template #8>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
    <img src="/assets/basic-10.svg" alt="Basic step number 10" />
    <ul>
      <li>Whenever the state of a component changes React has to re-render it</li>
      <li>Whenever a component re-renders React has to re-render all its children <i>(the ones instantiating by this component)</i></li>
      <li>Whenever the value of a context changes, every component using this context has to re-render <i>(as if the value of the context was their own state)</i></li>
    </ul>
  </div>
</div>
</template>
</v-switch>
</div>

---

## Well, why not memoizing?

````md magic-move {lines: true}
```tsx
import { useState } from "react";
import Counter from "./Counter";
import Total from "./Total";

export default function App() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  return (
    <div>
      <Counter value={value1} increment={() => setValue1((v) => v + 1)} />
      <Counter value={value2} increment={() => setValue2((v) => v + 1)} />
      <Counter value={value3} increment={() => setValue3((v) => v + 1)} />
      <Total value1={value1} value2={value2} value3={value3} />
    </div>
  );
}
```

```tsx
import { memo, useState } from "react";
import _Counter from "./Counter";
import Total from "./Total";

const Counter = memo(_Counter);

export default function App() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  return (
    <div>
      <Counter value={value1} increment={() => setValue1((v) => v + 1)} />
      <Counter value={value2} increment={() => setValue2((v) => v + 1)} />
      <Counter value={value3} increment={() => setValue3((v) => v + 1)} />
      <Total value1={value1} value2={value2} value3={value3} />
    </div>
  );
}
```
````

---

## Is it enough?

<div style="display: grid;">
<v-switch>
<template #1>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
   <img src="/assets/basic-4.svg" alt="Basic step number 4" />
  </div>
</div>
</template>
<template #2>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
   <img src="/assets/basic-memo-1.svg" alt="Memo step number 1" />
  </div>
</div>
</template>
<template #3>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
   <img src="/assets/basic-memo-2.svg" alt="Memo step number 2" />
  </div>
</div>
</template>
<template #4>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <div grid="~ cols-2 gap-16">
   <img src="/assets/basic-memo-3.svg" alt="Memo step number 3" />
  </div>
</div>
</template>
</v-switch>
</div>

---

## Memoizing even more?

````md magic-move {lines: true}
```tsx
import { memo, useState } from "react";
import _Counter from "./Counter";
import Total from "./Total";

const Counter = memo(_Counter);

export default function App() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  return (
    <div>
      <Counter value={value1} increment={() => setValue1((v) => v + 1)} />
      <Counter value={value2} increment={() => setValue2((v) => v + 1)} />
      <Counter value={value3} increment={() => setValue3((v) => v + 1)} />
      <Total value1={value1} value2={value2} value3={value3} />
    </div>
  );
}
```

```tsx
import { memo, useCallback, useState } from "react";
import _Counter from "./Counter";
import Total from "./Total";

const Counter = memo(_Counter);

export default function App() {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);

  const increment1 = useCallback(() => setValue1((v) => v + 1), []);
  const increment2 = useCallback(() => setValue2((v) => v + 1), []);
  const increment3 = useCallback(() => setValue3((v) => v + 1), []);

  return (
    <div>
      <Counter value={value1} increment={increment1} />
      <Counter value={value2} increment={increment2} />
      <Counter value={value3} increment={increment3} />
      <Total value1={value1} value2={value2} value3={value3} />
    </div>
  );
}
```
````

---
layout: center
---

# Let's discuss of Pigment

---

## Boards at Pigment

<div style="display: grid; grid-template-columns: 2fr 1fr">
<img v-click.hide="3" style="grid-row: 1; grid-column: 1; height: 70%" src="/assets/pigment-board.png" />
<img v-click="3" style="grid-row: 1; grid-column: 1; height: 70%" src="/assets/pigment-board-2.png" />

<div style="grid-row: 1; grid-column: 2">

<ul>
<li v-click="1">Real-time data and figures</li>
<li v-click="2">Huge datasets possibly reaching several millions of cells</li>
<li v-click="4">Real-time labels synchronized and shared between components</li>
</ul>

</div>
</div>

<!--
At Pigment we can have multiple grids, charts, KPIs, texts... all displayed on the same page.
All of them being live-updated and sharing data between each others.
-->

---

## Grids at Pigment

![Grid at Pigment](/assets/pigment-grid-reactivity.gif)

---

## Let's take a simplified grid implementation


![Grid at Pigment](/assets/pigment-grid-2.png)

<v-switch>
<template #1>

- lines: _data in a CSV fashion_
- columns/rows: _columns of the CSV to use as columns (resp. rows)_

</template>
<template #2>

```js
const lines = [
  { Kind: 'Sussex', Chicken: 'Bianca' , Year: '2020', value: 166 },
  { Kind: 'Sussex', Chicken: 'Bianca' , Year: '2021', value: 184 },
  { Kind: 'Sussex', Chicken: 'Bianca' , Year: '2022', value:  54 },
  { Kind: 'Sussex', Chicken: 'Bernard', Year: '2020', value: 130 },
  //...
];
const columns = ["Kind", "Chicken"];
const rows = ["Year"];
```

</template>
</v-switch>

---
zoom: 1.0
---

## A simpler grid

```tsx
export default function Grid(props: Props) {
  const { lines, columnHeaderIds, rowHeaderIds } = props;

  const columnsHeaders = buildHeaders(lines, columnHeaderIds, 0);
  const columnsSpans = extractHeaderSpans(columnsHeaders);
  const columnsPaths = extractPathsFromSpans(columnsSpans);

  const rowsHeaders = buildHeaders(lines, rowHeaderIds, 0);
  const rowsSpans = extractHeaderSpans(rowsHeaders);
  const rowsPaths = extractPathsFromSpans(rowsSpans);

  return (
    <div>
      <Rows rowsSpans={rowsSpans} columnsDepth={columnsSpans.length} />
      <Columns columnsSpans={columnsSpans} rowsDepth={rowsSpans.length} />
      <Cells rowsPaths={rowsPaths} columnsPaths={columnsPaths} lines={lines} rowsDepth={rowsSpans.length} columnsDepth={columnsSpans.length} />
    </div>
  );
}
```

<p style="text-align: right">

[github.com/dubzzz/reactivity-comparison](https://github.com/dubzzz/reactivity-comparison/tree/main/stacks/react)

</p>

<!--
  There are several reasons to do the pivoting in front side. One of them being to make the UI as fluid as possible.
  By avoiding calling the back whenever the user scrolls we come with a very efficient UI.

  The algorithm precomputes the whole pivoted tree and do not push the computation down to the cells.
  One of the reason being that we are highly depending on virtualization and need to quickly now the cell at a precise location.

  Without React compiler the code sucks!
-->

---
zoom: 1.0
---

## A simpler grid in action

```tsx
export default function App() {
  const [lines, setLines] = useState([]);

  return (
    <div>
      <HeaderButtons refreshLines={newLines => setLines(newLines)} />
      <Grid lines={lines} rowHeaderIds={["Country", "Town"]} columnHeaderIds={["Product"]} />
    </div>
  );
}
```

<p style="text-align: right">

[github.com/dubzzz/reactivity-comparison](https://github.com/dubzzz/reactivity-comparison/tree/main/stacks/react)

</p>

---

## Let's play with it!

<img src="/assets/react-compiler-fails.gif" alt="React compiler failing on complex grids" style="width:50%"/>

---

<h2>React Compiler to the rescue<span v-click.hide="2" style="position: absolute">🦸</span><span v-click="2" style="position: absolute">😭</span></h2>

<div v-click="1">
<img src="/assets/react-compiler-fails.gif" alt="React compiler failing on complex grids" style="width:50%"/>
</div>

---
zoom: 1.0
---

## Let's take back our `<App/>` component

```tsx {all|2}
export default function App() {
  const [lines, setLines] = useState([]);

  return (
    <div>
      <HeaderButtons refreshLines={newLines => setLines(newLines)} />
      <Grid lines={lines} rowHeaderIds={["Country", "Town"]} columnHeaderIds={["Product"]} />
    </div>
  );
}
```

<!--
Let's take back our <App/> component. As seen previously going with native primitives offered by React could work (and at the end we will rely on them under-the-scene)
but can be very verbose and request us to change a lot the code.

So we want to superseed and replace some usages of React's primitives with some new primitives we will come up with and that should not break DX.
-->



---
zoom: 2.0
---

````md magic-move {lines: true}
```tsx
// ...
const [lines, setLines] = useState([]);
// ...
```

```tsx
// ...
const [lines, setLines] = useShell([]);
// ...
```
````

<!--
So we want to replace useState by something that will be as simple to use but way more reactive by default.
Note that we may drop some of the useful invariants offered by useState for the sake of reactivity (such as all states updates at the same time so there is no offset by one frame issues).
-->

---

<div style="display: grid; padding-top: 100px">
<v-switch>
<template #0>
<div style="grid-row: 1; grid-column: 1;">

<img src="/assets/use-state-before.svg" alt="useState (before)" />

</div>
</template>
<template #1>
<div style="grid-row: 1; grid-column: 1;">

<img src="/assets/use-state-after.svg" alt="useState (after)" />

</div>
</template>
</v-switch>
</div>

---

<div style="display: grid; padding-top: 100px">
<v-switch>
<template #0>
<div style="grid-row: 1; grid-column: 1;">

<img src="/assets/use-shell-before.svg" alt="useShell (before)" />

</div>
</template>
<template #1>
<div style="grid-row: 1; grid-column: 1;">

<img src="/assets/use-shell-after.svg" alt="useShell (after)" />

</div>
</template>
</v-switch>
</div>

---
zoom: 1.0
---

````md magic-move {lines: true}
```tsx
function useShell<T>(initialValue: T): [value: Shell<T>, setter: (nextValue: T) => void] {
  // Not implemented!
}
```

```tsx
type Shell<T> = BehaviorSubject<T>;

function useShell<T>(initialValue: T): [value$: Shell<T>, setter: (nextValue: T) => void] {
  // Not implemented!
}
```

```tsx
type Shell<T> = BehaviorSubject<T>;

function useShell<T>(initialValue: T): [value$: Shell<T>, setter: (nextValue: T) => void] {
  const [value$] = useState(() => new BehaviorSubject(initialValue));
  const [setter] = useState(() => (nextValue: T) => value$.next(nextValue));
  return [value$, setter];
}
```
````

---
zoom: 1.0
---

## Let's use the shell within our `<Grid/>` component

```tsx {all|4,5,6}
export default function Grid(props: Props) {
  const { lines, columnHeaderIds, rowHeaderIds } = props;

  const columnsHeaders = buildHeaders(lines, columnHeaderIds, 0);
  const columnsSpans = extractHeaderSpans(columnsHeaders);
  const columnsPaths = extractPathsFromSpans(columnsSpans);

  const rowsHeaders = buildHeaders(lines, rowHeaderIds, 0);
  const rowsSpans = extractHeaderSpans(rowsHeaders);
  const rowsPaths = extractPathsFromSpans(rowsSpans);

  return (
    <div>
      <Rows rowsSpans={rowsSpans} columnsDepth={columnsSpans.length} />
      <Columns columnsSpans={columnsSpans} rowsDepth={rowsSpans.length} />
      <Cells rowsPaths={rowsPaths} columnsPaths={columnsPaths} lines={lines} rowsDepth={rowsSpans.length} columnsDepth={columnsSpans.length} />
    </div>
  );
}
```

---
zoom: 1.5
---

````md magic-move {lines: true}
```tsx
const columnsHeaders = buildHeaders(lines, columnHeaderIds, 0);
const columnsSpans = extractHeaderSpans(columnsHeaders);
const columnsPaths = extractPathsFromSpans(columnsSpans);
```

```tsx
const columnsHeaders$ = useComputed(
  lines => buildHeaders(lines, columnHeaderIds, 0),
  [lines$],
);
const columnsSpans$ = useComputed(
  columnsHeaders => extractHeaderSpans(columnsHeaders),
  [columnsHeaders$],
);
const columnsPaths$ = useComputed(
  columnsSpans => extractPathsFromSpans(columnsSpans),
  [columnsSpans$],
);
```
````

---

<div style="display: grid; padding-top: 100px">

<img src="/assets/use-computed.svg" alt="useComputed" />

</div>

---
zoom: 1.2
---

````md magic-move {lines: true}
```tsx
function useComputed<T, U>(transform: (value: T) => U, [shell$]: [Shell<T>]): Shell<U> {
  // Not implemented!
}
```

```tsx
function useComputed<T, U>(transform: (value: T) => U, [shell$]: [Shell<T>]): Shell<U> {
  const [mappedShell$, setter] = useShell(transform(readSync(shell$)));
  // We need to update the mappedShell whenever the source shell receives an update
  return mappedShell$;
}
```

```tsx
function useComputed<T, U>(transform: (value: T) => U, [shell$]: [Shell<T>]): Shell<U> {
  const [mappedShell$, setter] = useShell(transform(readSync(shell$)));
  useEffect(() => {
    const subscription = shell$.subscribe((value) => setter(transform(value)));
    return () => subscription.unsubscribe();
  }, [shell$, setter, transform]);
  return mappedShell$;
}
```
````

---
zoom: 1.0
---

## Let's unwrap the shell within our `<Grid/>` component

```tsx {all|11}
export default function Grid(props: Props) {
  const { lines$, columnHeaderIds, rowHeaderIds } = props;

  const columnsHeaders$ = useComputed(lines => buildHeaders(lines, columnHeaderIds, 0), [lines$]);
  const columnsSpans$ = useComputed(columnsHeaders => extractHeaderSpans(columnsHeaders), [columnsHeaders$]);
  const columnsPaths$ = useComputed(columnsSpans => extractPathsFromSpans(columnsSpans), [columnsSpans$]);
  // Same for rows...

  return (
    <div>
      <Rows rowsSpans={rowsSpans$} columnsDepth={columnsSpans.length} />
      <Columns columnsSpans={columnsSpans$} rowsDepth={rowsSpans.length} />
      <Cells rowsPaths={rowsPaths$} columnsPaths={columnsPaths$} lines={lines$} rowsDepth={rowsSpans.length} columnsDepth={columnsSpans.length} />
    </div>
  );
}
```

---
zoom: 1.5
---

````md magic-move {lines: true}
```tsx
const columnsDepth = columnsSpans.length;
```

```tsx
const columnsDepth$ = useComputed(
  columnsSpans => columnsSpans.length,
  [columnsSpans$]
);
const columnsDepth = ???;
```

```tsx
const columnsDepth$ = useComputed(
  columnsSpans => columnsSpans.length,
  [columnsSpans$]
);
const columnsDepth = useWatch(columnsDepth$);
```
````

---

<div style="display: grid; padding-top: 100px">

<img src="/assets/use-watch.svg" alt="useWatch" />

</div>

---
zoom: 1.5
---

````md magic-move {lines: true}
```tsx
function useWatch<T>(shell$: Shell<T>): T {
  // Not implemented!
}
```

```tsx
function useWatch<T>(shell$: Shell<T>): T {
  const subscribe = "???";
  const getSnapshot = "???";
  return useSyncExternalStore(subscribe, getSnapshot);
}
```

```tsx
function useWatch<T>(shell$: Shell<T>): T {
  const subscribe = useCallback(
    (onChange: () => void): (() => void) => {
      const subscription = shell$.subscribe(onChange);
      return () => subscription.unsubscribe();
    },
    [shell$]
  );
  const getSnapshot = "???";
  return useSyncExternalStore(subscribe, getSnapshot);
}
```

```tsx
function useWatch<T>(shell$: Shell<T>): T {
  const subscribe = useCallback(
    (onChange: () => void): (() => void) => {
      const subscription = shell$.subscribe(onChange);
      return () => subscription.unsubscribe();
    },
    [shell$]
  );
  const getSnapshot = useCallback(() => readSync(shell$), [shell$]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
```
````

---

## Results...

<div v-click="1">
<img src="/assets/observable-magic.gif" alt="Observables on complex grids" style="width:50%"/>
</div>

---

<img src="/assets/early-optim.gif" alt="Early optims is nor great" style="width:30%"/>

<div v-click>Beware of early optimizations</div>

---
layout: center
---

# Questions

Do not hesitate to visit our blog: <a href="https://engineering.pigment.com/" target="_blank">engineering.pigment.com</a>