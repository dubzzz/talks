---
theme: seriph
background: https://www.margeride-en-gevaudan.com/wp-content/uploads/2020/01/JSC-PAYSAGES-MARGERIDE-283.jpg
title: Réactivité granulaire en React mais sans React Compiler
info: Réactivité granulaire en React mais sans React Compiler
class: text-center # apply any unocss classes to the current slide
highlighter: shiki # https://sli.dev/custom/highlighters.html
drawings:
  persist: false
transition: slide-left
mdc: true # enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
colorSchema: dark
themeConfig:
  primary: rgb(84, 213, 232)
  secondary: rgb(222, 49, 206)
favicon: "https://cdn.prod.website-files.com/6605b12132f6a8b5d23896bd/66d9efed1b2158878cbd56bf_Pigment%20Favicon%20Webflow.png"
#fonts:
#  sans: DM Sans
#  serif: Crimson Pro
---

<div style="display:flex; justify-content: center; margin-bottom: 16px;">
  <img src="/assets/conf-logo.avif" style="max-width: 40%" />
</div>

<h1 style="color: #fff !important; line-height: 1.1em !important;">Réactivité granulaire en React mais sans React Compiler</h1>

_Comment a-t'on rendu Pigment ultra-réactif ?_

_**Par Nicolas DUBIEN**_

<!--
Good morning everyone, my name is Nicolas and today we're gonna talk of reactivity.
More precisely about fine-grained reactivity.
-->

---

## layout: center

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

<!--
But before we move further, what is reactivity? And would we care about reactivity?
Well according to VueJS... yes I know I'm in a React conference...
But according to VueJS reactivity can be defined as follow:
...reading...

If we rephrase it in a different way, we can say that our DOM or actually whatever display target we are aiming for is a function of our states. In other words, changing our states is enough to have our display being updated.
-->

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
      <Counter value={value1} increment={() => setValue1((v) => v + 1)} />
      <Counter value={value2} increment={() => setValue2((v) => v + 1)} />
      <Counter value={value3} increment={() => setValue3((v) => v + 1)} />
      <Total value1={value1} value2={value2} value3={value3} />
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

<!--
So let's first confirm that React is reactive. Let's confirm it on a toy example.

We are gonna implement a simple UI made of three counters and a total. On this slide you can see a very simplified UI for it with the first three rows being counters that we can increment and decrement and the last line containing the sum of all the previous counters.

If we were to implement it we would probably come with the following architecture: an App component responsible to instantiate three instances of counter and one of total.

Now to make it interactive, we would need to add some states. Our counters have to be interactive so let's put one state containing the value of the counter within each counter.

Now let's add our total... But unfortunately, we would need to access the states of each counter to have the total. A common approach for that would be to move the state higher in our tree.

By moving our three states directly within App and forwarding them to the relevant counters and to the total we should have everything wired!

So we can implement it! Let's go!

Here is what we could have come up with for the App component.

Now that we have the code we can start playing with it. And first thing to note is: Yes it's reactive! Indeed whenever states got updated the UI updates itself. But... but... I feel there is something wrong with it. Actually on this video I enabled a feature of the React devtools, this feature is responsible to highlight any re-render (aka call to the function we wrote). And... well I feel we re-render things that are irrelevant for our changes. Indeed whenever we increment or decrement one counter we not only re-render this counter and the total but also all the other counters and the app component itself.
-->

---

## layout: center

![](/assets/not-the-right-thing.gif)

<!--
At first it felt that React is a bit dumb there. We may have expected way better from it.

(re-render does not mean updating the DOM, the sad part is just that our code is being called while we would have imagined it should not)
-->

---

## layout: center

<img src="/assets/sad-thing-no.jpg" style="max-width: 80%" />

<!--
And so 5 years ago when I started my journey with React I felt a bit sad.
But lately things got better, I received the memo that there would be a React Compiler that should help us making our apps better.

And so I tested it!
-->

---

## 🦸‍♀️ Compiler to the rescue

<div v-click style="padding-top: 16px;">

<img
  src="/assets/reactivity-compiler-edited.gif"
  alt="Better reactivity example"
/>

More details about the compiler at https://react.dev/learn/react-compiler

</div>

<!--
And... it's definitely better. If we toggle on the Compiler as detailed on the official documentation, we immediatelly see improvements.

This time we only re-render App, 1 Counter and Total.
-->

---

## zoom: 1.4

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

<!--
But as I like to understand what happens under the scene I started to look for the explanations of this sudden improvement. Part of the answer is that the compiler is adding automatic memoization in your code with nothing to do on your side.

Problem is that it's not just two lines...
-->

---

## zoom: 0.28

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

<!--
Well, not even 10. As for this very simple component it does not fit in the screen.

(actually it's still not rolled-out so things may change, but it's still good to see what is the current status and honestly it's already a great improvement)
-->

---

## layout: center

<img src="/assets/compiler-effect-5.gif" style="max-width: 80%" />

<!--
So I felt a bit worried... Maybe good maybe not...
Maybe I'm not using the right tool for what I'm looking for...
-->

---

## layout: center

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

<!--
And actually is it achieving fine-grained reactivity? And well actually what do we mean with fine-grained reactivity?

In order to give an answer I'd take the definition given by Solid: ...reading...

In other words, applied to our case only the counter being impacted and the total should recompute themselves. As such we don't expect App to re-render with such definition.

So if we go for this definition it's not totally fine-grained on this specific example. Or at least not out-of-the-box.
-->

---

## layout: center

# Let's talk about fine-grained reactivity

<!--
So let's go for fine-grained reactivity!
-->

---

layout: cover
background: /assets/wallpaper-1.jpg

---

<div>
  <img src="/assets/me.jpg" style="border-radius: 50%; height: 128px; border: white 2px solid;" />
</div>

<div style="margin-top: 48px"></div>
<h2 style="color: #fff !important">Réactivité granulaire en React mais sans React Compiler</h2>
<h1 style="color: #fff !important">Nicolas DUBIEN</h1>
<div style="display: flex; justify-content: center; font-size: 1.2em; margin-top: -20px; align-items: end;">
  <span style="margin-top: 0.7em">
    Lead Principal Software Engineer at&nbsp;
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
  <img src="/assets/bluesky.svg" style="height: 24px; border: none; background: none; margin: 0px" />
  @nicolas.dubien.me
</div>
<div style="display: flex; gap: 8px; color: #ffffff; vertical-align: middle;">
  <img
    src="/assets/npm.png"
    style="height: 24px; border: none; background: none; margin: 0px; filter: grayscale(1)"
  />
  fast-check
</div>

<!--
But before that let me introduce myself and tell me a bit more why I wanted to speak about reactivity of React.

So my name is Nicolas Dubien. I started my journey with React when I entered at Pigment. The company is working on business planning and among our key features we have dashboards made of several widgets possibly referencing charts and grids with real-time data.

At Pigment, 5 years ago, there was no React Compiler, we were still at React 16 (the first version of React using hooks if I'm not wrong) and Recoil, Zustand or Jotai were not there yet. Redux and MobX existed though!

So reactivity came to the scene pretty early. With grids showing millions of cells with around hundred having to be displayed (the rest being virtualized) rendering cost is not negligeable.

So I'll try to describe you what we did.

Before I move with reactivity, you may know me for fast-check framework. If you have never heard of it, you should probably have a look at it.
-->

---

## layout: center

# How to make our application reactive?

<!--
So the first question we asked ourselves as been: How to make our application reactive?

Understanding what goes behind the scene is key if you plan to optimize it. And understanding and trying to optimize things is always simpler with small examples you can easily think of.
-->

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
      <li>Whenever a component re-renders React has to re-render all its children <i>(the ones instantiated by this component)</i></li>
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

<!--
So let's apply this strategy on our toy example!

Let see why we had that many renders. And let see if we find any ways to drop part of them.

Let investigate what happens when we update one of our states. Considering user incremented the value of the third Counter (moving from Green to Red on the slide), React will mark this component as dirty (there is no real dirty in React, while dirty exists in Angular, but the idea is easy to get). Actually this is the first rule of re-rendering in React: ...reading...

Now, that our component re-rendered React considers that children have to be too: ...reading...

And so we will render 1st counter, then 2nd one, then 3rd one and finally the total.

And this why everything re-rendered in our app. A classical and I'd my recommended option would be to try moving states closer to the leaves. But in our case we cannot as we need both Counters and Total to share these states. So we have to think of another solution.

Before we leave the last re-render case is around context. If you're using context I pretty like to summarize it that way: when pulling from a context you can consider that the value of that context is like a state within the component doing the useContext.
-->

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

<!--
So let's optimize it! We said the React Compiler was doing memoization, maybe we can do the same. Actually when we started at Pigment we did not have this hint from the compiler but we quickly knew that memoizing stuff was a possible option.

So we will put a memo around our Counter. The aim of the memo is to stop the re-rendering cascade at Counter if none of its props changed across renders.
-->

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

<!--
But is it enough?

Well, actually Counter has been simplified a bit in our diagram. Counter is actually receiving two props: one for the value (the one we showed) and one for the increment function.

And if you see where I want to go, you probably have an idea of what will happen there.

So let's re-emulate our update.

User asked to increment the third counter (as in previous example). As a consequence App has to be re-rendered, so it gets recomputed.

But unfortunately whenvever App gets recomputed it passes a new version of the increment function to our counters. As such... memo got defeated as increment function is changing across renders.

So we'd need to go even further...
-->

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

<!--
And the last optimization I'll show you on this example is to meoize the increment callbacks across renders. Actually at the end we will probably never have to do it again with React Compiler as both memo, useMemo and useCallback will be more or less done for us for free.

But having this understanding helped us to think about a better state management option for us!
-->

---

## layout: center

# Let's discuss of Pigment

---

## Boards at Pigment

<div style="display: grid; grid-template-columns: 2fr 1fr">
<img v-click.hide="3" style="grid-row: 1; grid-column: 1;" src="/assets/pigment-board.png" />
<img v-click="3" style="grid-row: 1; grid-column: 1;" src="/assets/pigment-board-2.png" />

<div style="grid-row: 1; grid-column: 2">

<ul>
<li v-click="1">Real-time data and figures</li>
<li v-click="2">Huge datasets possibly reaching several millions of cells</li>
<li v-click="4">Real-time labels synchronized and shared between components</li>
</ul>

</div>
</div>

<!--
So at Pigment we display financial data. It implies grids, charts, kpis, texts and many others. All of these displayed on the same page in many cases.

Our data is updated in real-time meaning that whenever someone changes part of the data I'm watching I'll see it updated on my screen. And that whatever the size of the datasets. as such we have many clients asking to show millions of cells on screen (even if it does not fit on screen, the fact to have it possibly displayed is always good for clients to confirm they have all their data and nothing is missing).

We also have lots of data being shared across our widgets. And initially we went full React with contexts, and we are still happy with them as they made us able to better manage lifecycles of our caches...

As such you can easily imagine that a single update if not properly handled could quickly cascade in thousands of components having to recompute themselves for just a few change for the end user (if any). So re-render and finer reactivity as quickly been a major concern for us.
-->

---

## Grids at Pigment

![Grid at Pigment](/assets/pigment-grid-reactivity.gif)

<!--
And as you could see on this video: our grids are reactive.

When someone changes something on anothre machine, we got the update and this update only re-renders the precise cells and headers. If you look closely to this video you should see that the highlightings only occur on modified pieces and not others.
-->

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
  { Kind: "Sussex", Chicken: "Bianca", Year: "2020", value: 166 },
  { Kind: "Sussex", Chicken: "Bianca", Year: "2021", value: 184 },
  { Kind: "Sussex", Chicken: "Bianca", Year: "2022", value: 54 },
  { Kind: "Sussex", Chicken: "Bernard", Year: "2020", value: 130 },
  //...
];
const columns = ["Kind", "Chicken"];
const rows = ["Year"];
```

</template>
</v-switch>

<!--
So let's see how we did against a simplified reimplementation of Pigment.

We will take a really simplified implementation of a Pivot Table component. As is a pivot table is taking a flat set of lines (one per cell to be displayed but without any precise ordering) plus a configuration of what to be put as rows or columns. Based on that it will display the data in a pivoted fashion.

For instance to give you a clearer picture our grid above could be described by the data: ...giving examples from the data...

Based on these lines and this configuration we can for instance know that we have one Kind called Sussex spanning on two columns. That the children headers for Sussex are Bianca and Bernard...
-->

---

## zoom: 1.0

## A simpler grid

```tsx {all|2|4|5|6|14-16}
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
      <Cells
        rowsPaths={rowsPaths}
        columnsPaths={columnsPaths}
        lines={lines}
        rowsDepth={rowsSpans.length}
        columnsDepth={columnsSpans.length}
      />
    </div>
  );
}
```

<p style="text-align: right">

[github.com/dubzzz/reactivity-comparison](https://github.com/dubzzz/reactivity-comparison/tree/main/stacks/react)

</p>

<!--
So now that you've the idea let see the code!

For the record if you really want to read through it you can have a look at the link below the code.

But said simply the component on the screen is taking lines plus a configuration and displaying the pivoted version of the dataset. In order to do so it has to run multiple computations:

1. For each level of headers extract the relevant labels
2. For each level x label compute the size of the headers - in other words how many columns/rows will the header span on
3. For each most granular level compute the path of the header - in othre words for the first column it would be Sussex,Bianca...

Then we can use this data to render the headers in rows, in columns and the cells.

And so we have it, a naive but working implementation.
-->

---

## zoom: 1.0

## A simpler grid in action

```tsx
export default function App() {
  const [lines, setLines] = useState([]);

  return (
    <div>
      <HeaderButtons refreshLines={(newLines) => setLines(newLines)} />
      <Grid
        lines={lines}
        rowHeaderIds={["Country", "Town"]}
        columnHeaderIds={["Product"]}
      />
    </div>
  );
}
```

<p style="text-align: right">

[github.com/dubzzz/reactivity-comparison](https://github.com/dubzzz/reactivity-comparison/tree/main/stacks/react)

</p>

<!--
We can thus go futher and connect it within an app responsible to pull lines from a server, to update lines...
-->

---

## Let's play with it!

<img src="/assets/react-compiler-fails.gif" alt="React compiler failing on complex grids" style="width:50%"/>

---

<h2>React Compiler to the rescue<span v-click.hide="2" style="position: absolute">🦸</span><span v-click="2" style="position: absolute">😭</span></h2>

<div v-click="1">
<img src="/assets/react-compiler-fails.gif" alt="React compiler failing on complex grids" style="width:50%"/>
</div>

---

## zoom: 1.0

## Let's take back our `<App/>` component

```tsx {all|2}
export default function App() {
  const [lines, setLines] = useState([]);

  return (
    <div>
      <HeaderButtons refreshLines={(newLines) => setLines(newLines)} />
      <Grid
        lines={lines}
        rowHeaderIds={["Country", "Town"]}
        columnHeaderIds={["Product"]}
      />
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

## zoom: 2.0

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

## zoom: 1.2

````md magic-move {lines: true}
```tsx
function useShell<T>(
  initialValue: T
): [value: Shell<T>, setter: (nextValue: T) => void] {
  // Not implemented!
}
```

```tsx
type Shell<T> = BehaviorSubject<T>;

function useShell<T>(
  initialValue: T
): [value$: Shell<T>, setter: (nextValue: T) => void] {
  // Not implemented!
}
```

```tsx
type Shell<T> = BehaviorSubject<T>;

function useShell<T>(
  initialValue: T
): [value$: Shell<T>, setter: (nextValue: T) => void] {
  const [value$] = useState(() => new BehaviorSubject(initialValue));
  const [setter] = useState(() => (nextValue: T) => value$.next(nextValue));
  return [value$, setter];
}
```
````

---

## zoom: 1.0

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
      <Cells
        rowsPaths={rowsPaths}
        columnsPaths={columnsPaths}
        lines={lines}
        rowsDepth={rowsSpans.length}
        columnsDepth={columnsSpans.length}
      />
    </div>
  );
}
```

---

## zoom: 1.5

````md magic-move {lines: true}
```tsx
const columnsHeaders = buildHeaders(lines, columnHeaderIds, 0);
const columnsSpans = extractHeaderSpans(columnsHeaders);
const columnsPaths = extractPathsFromSpans(columnsSpans);
```

```tsx
const columnsHeaders$ = useComputed(
  (lines) => buildHeaders(lines, columnHeaderIds, 0),
  [lines$]
);
const columnsSpans$ = useComputed(
  (columnsHeaders) => extractHeaderSpans(columnsHeaders),
  [columnsHeaders$]
);
const columnsPaths$ = useComputed(
  (columnsSpans) => extractPathsFromSpans(columnsSpans),
  [columnsSpans$]
);
```
````

---

<div style="display: grid; padding-top: 100px">

<img src="/assets/use-computed.svg" alt="useComputed" />

</div>

---

## zoom: 1.2

````md magic-move {lines: true}
```tsx
function useComputed<T, U>(
  transform: (value: T) => U,
  [shell$]: [Shell<T>]
): Shell<U> {
  // Not implemented!
}
```

```tsx
function useComputed<T, U>(
  transform: (value: T) => U,
  [shell$]: [Shell<T>]
): Shell<U> {
  const [mappedShell$, setter] = useShell(transform(readSync(shell$)));
  // We need to update the mappedShell whenever the source shell receives an update
  return mappedShell$;
}
```

```tsx
function useComputed<T, U>(
  transform: (value: T) => U,
  [shell$]: [Shell<T>]
): Shell<U> {
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

## zoom: 1.0

## Let's unwrap the shell within our `<Grid/>` component

```tsx {all|11}
export default function Grid(props: Props) {
  const { lines$, columnHeaderIds, rowHeaderIds } = props;

  const columnsHeaders$ = useComputed(
    (lines) => buildHeaders(lines, columnHeaderIds, 0),
    [lines$]
  );
  const columnsSpans$ = useComputed(
    (columnsHeaders) => extractHeaderSpans(columnsHeaders),
    [columnsHeaders$]
  );
  const columnsPaths$ = useComputed(
    (columnsSpans) => extractPathsFromSpans(columnsSpans),
    [columnsSpans$]
  );
  // Same for rows...

  return (
    <div>
      <Rows rowsSpans={rowsSpans$} columnsDepth={columnsSpans.length} />
      <Columns columnsSpans={columnsSpans$} rowsDepth={rowsSpans.length} />
      <Cells
        rowsPaths={rowsPaths$}
        columnsPaths={columnsPaths$}
        lines={lines$}
        rowsDepth={rowsSpans.length}
        columnsDepth={columnsSpans.length}
      />
    </div>
  );
}
```

---

## zoom: 1.5

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
  (columnsSpans) => columnsSpans.length,
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

## zoom: 1.5

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

## layout: center

# Questions

Do not hesitate to visit our blog: <a href="https://engineering.pigment.com/" target="_blank">engineering.pigment.com</a>
