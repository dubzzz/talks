---
theme: seriph
background: https://lespepitesdefrance.com/wp-content/uploads/2023/09/Top-5-des-plus-belles-rivieres-de-Lozere.png
title: Property based testing - de la théorie à la pratique
info: 
class: text-center # apply any unocss classes to the current slide
highlighter: shiki # https://sli.dev/custom/highlighters.html
drawings:
  persist: false
transition: slide-left
mdc: true # enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
colorSchema: light
themeConfig:
  primary: rgb(90, 166, 0)
  secondary: rgb(248, 211, 78)
favicon: "https://cdn.prod.website-files.com/6605b12132f6a8b5d23896bd/66d9efed1b2158878cbd56bf_Pigment%20Favicon%20Webflow.png"
#fonts:
#  sans: DM Sans
#  serif: Crimson Pro
---

<div style="display:flex; justify-content: center; margin-bottom: 16px;">
  <img src="/assets/nodejs.svg" style="max-width: 40%; filter: drop-shadow(0 0 2rem white) contrast(1.5);" />
</div>

<h1 style="color: #fff !important; line-height: 1.1em !important;">Property based testing,</h1>
<h2 style="color: #fff !important; line-height: 1.1em !important;">De la théorie à la pratique</h2>

_**Par Nicolas DUBIEN**_

---
layout: center
---

# Why the hell a new testing technic? 😠

---

## We already have unit-tests…

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    expect(knuthMorrisPratt('a', '')).toBe(0);
    expect(knuthMorrisPratt('a', 'a')).toBe(0);
    expect(knuthMorrisPratt('abcbcglx', 'abca')).toBe(-1);
    expect(knuthMorrisPratt('abcbcglx', 'bcgl')).toBe(3);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toBe(15);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabca')).toBe(-1);
    expect(knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).toBe(12);
    expect(knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).toBe(11);
  });
});
```

---

## And end-to-end tests…

```ts
describe('Search engine', () => {
  it('should impact title on search', async () => {
    await driver.get('https://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  })
})
```

---

## And on top of that we have good practices…

<ul>
  <li v-click="1">Coverage,</li>
  <li v-click="2">Testing pyramid,</li>
  <li v-click="3">…</li>
</ul>

<p v-click="4">And… all my users are happy!</p>

---
layout: image
image: /assets/papyrus.avif
---

<img src="/assets/express.png" style="width: 25%" />

<p style="color: #5C4420">
  <span v-click>On the 26<sup>th</sup> of November 2022, they got stroke by a severe CVE…</span>
  <br />
  <span v-click>…pushing to a Denial of Service.</span>
</p>

<p style="color: #5C4420" v-click>
  <span>The trigger was as easy as forging an URL containing:</span>
  <br />
  <pre style="background: #fff5; padding: 16px; border-radius: 1px"><code>a[__proto__]=b&a[__proto__]&a[length]=100000000</code></pre>
</p>

<p style="color: #5C4420" v-click>
  <span>…but got revealed 10 months after the bug appeared (11<sup>th</sup> of January 2022).</span>
</p>

<p style="color: #5C4420; text-align: right; padding-top: 32px; font-weight: bold" v-click>
  <span>What if our tests were missing something?</span>
</p>

---
layout: cover
background: https://www.margeride-en-gevaudan.com/wp-content/uploads/2020/01/JSC-PAYSAGES-MARGERIDE-283.jpg
---

<div>
  <img src="/assets/me.jpg" style="border-radius: 50%; height: 128px; border: white 2px solid;" />
</div>

<div style="margin-top: 48px"></div>
<h2 style="color: #fff !important">Property based testing, de la théorie à la pratique</h2>
<h1 style="color: #fff !important">Nicolas DUBIEN</h1>
<div style="display: flex; justify-content: center; font-size: 1.2em; margin-top: -20px; align-items: end;">
  <span style="margin-top: 0.7em">
    At&nbsp;
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
  <img src="/assets/npm.png" style="height: 24px; border: none; background: none; margin: 0px" />
  fast-check
</div>

---
layout: center
---

# What is our issue?

---

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    expect(knuthMorrisPratt('a', '')).toBe(0);
    expect(knuthMorrisPratt('a', 'a')).toBe(0);
    expect(knuthMorrisPratt('abcbcglx', 'abca')).toBe(-1);
    expect(knuthMorrisPratt('abcbcglx', 'bcgl')).toBe(3);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toBe(15);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabca')).toBe(-1);
    expect(knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).toBe(12);
    expect(knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).toBe(11);
  });
});
```

<br />

<v-click>

> 🙋‍♂️ Why are we covering all these cases? Aren't redundant?

</v-click>

<br />

<v-click>

> 👱‍♀️ They each cover one specific common source of issues.

</v-click>

<v-click>

> 👱‍♀️ One for empty string, one for pattern at the beginning, one for the pattern at the end, one for the pattern at the middle…

</v-click>

---

## What is our issue, then?

<v-click>

> 🙋‍♂️ Why are we covering all these cases? Aren't redundant?

</v-click>

<v-click>

> 🦹‍♂️ Don't we need others?

</v-click>

<v-click>

> 🦹‍♂️ Why not generating some…? _given part of the issue is the limited scope of our inputs_

</v-click>

---
layout: center
---

# Going random\*…

<v-click>

_\*But in a reproducible way_  
_\*And not too deterministic_

</v-click>

---
layout: center
---

## Wait a minute… 😓

_Random?_

---

## What if the reported error is:

<v-click>

```js
text    = ".D0xjkFI{<:nx#U3lI~"
pattern = "j>~&]&/'0Fw{?O"
```

</v-click>

<v-click>

```js
text    = [1302 characters]
pattern = [983 characters]
```

</v-click>

---
layout: center
---

#  Have you ever heard about _Property based testing_?

---
layout: center
---

![](/assets/fast-check-downloads.png)

_\*fast-check.dev_

---

## In a nutshell

> We want to test properties instead of isolated cases.

<br />

<blockquote v-click="1">
  <p>for all <span style="color: rgb(90, 166, 0)">(x, y, ...)</span></p>
  <p v-click="2" style="padding-left: 16px; color: #777">generate random inputs based on specified generators</p>
  <p>such that <span style="color: rgb(90, 166, 0)">precondition(x, y, ...)</span> holds</p>
  <p v-click="3" style="padding-left: 16px; color: #777">check preconditions - <span style="color: rgb(90, 166, 0)">failure?</span> go back to previous</p>
  <p><span style="color: rgb(90, 166, 0)">predicate(x, y, ...)</span> is true</p>
  <p v-click="4" style="padding-left: 16px; color: #777">run the test - <span style="color: rgb(90, 166, 0)">failure?</span> shrink</p>
</blockquote>

<p v-click="5">
  🔁 Run it 100 times 🔁
</p>

---

## Example

> What if wanted to test: `knuthMorrisPratt`?

<v-click>

````md magic-move {lines: true}
```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    expect(knuthMorrisPratt('a', '')).toBe(0);
    expect(knuthMorrisPratt('a', 'a')).toBe(0);
    expect(knuthMorrisPratt('abcbcglx', 'abca')).toBe(-1);
    expect(knuthMorrisPratt('abcbcglx', 'bcgl')).toBe(3);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toBe(15);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabca')).toBe(-1);
    expect(knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).toBe(12);
    expect(knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).toBe(11);
  });
});
```

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    expect(knuthMorrisPratt('a', '')).toBe(0);
    expect(knuthMorrisPratt('a', 'a')).toBe(0);
    expect(knuthMorrisPratt('abcbcglx', 'bcgl')).toBe(3);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toBe(15);
    expect(knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).toBe(12);
    expect(knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).toBe(11);
  });
});
```

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    expect(knuthMorrisPratt('' + '' + '', '')).toBe(0);
    expect(knuthMorrisPratt('' + '' + 'a', '')).toBe(0);
    expect(knuthMorrisPratt('' + 'a' + '', 'a')).toBe(0);
    expect(knuthMorrisPratt('abc' + 'bcgl' + 'x', 'bcgl')).toBe(3);
    expect(knuthMorrisPratt('abcxabcdabxabcd' + 'abcdabcy' + '', 'abcdabcy')).toBe(15);
    expect(knuthMorrisPratt('abcxabcdabxa' + 'abcdabca' + 'bcdabcdabcy', 'abcdabca')).toBe(12);
    expect(knuthMorrisPratt('abcxabcdabx' + 'aabaabaaa' + 'abcdabcdabcy', 'aabaabaaa')).toBe(11);
  });
});
```

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    expect(knuthMorrisPratt('' + '' + '', '')).toBe(''.length);
    expect(knuthMorrisPratt('' + '' + 'a', '')).toBe(''.length);
    expect(knuthMorrisPratt('' + 'a' + '', 'a')).toBe(''.length);
    expect(knuthMorrisPratt('abc' + 'bcgl' + 'x', 'bcgl')).toBe('abc'.length);
    expect(knuthMorrisPratt('abcxabcdabxabcd' + 'abcdabcy' + '', 'abcdabcy')).toBe('abcxabcdabxabcd'.length);
    expect(knuthMorrisPratt('abcxabcdabxa' + 'abcdabca' + 'bcdabcdabcy', 'abcdabca')).toBe('abcxabcdabxa'.length);
    expect(knuthMorrisPratt('abcxabcdabx' + 'aabaabaaa' + 'abcdabcdabcy', 'aabaabaaa')).toBe('abcxabcdabx'.length);
  });
});
```

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    // expect(knuthMorrisPratt(a + b + c, b)).toBe(a.length);
    // :: when (a + b).slice(0, -1) does not include b
  });
});
```

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    // expect(knuthMorrisPratt(a + b + c, b)).not.toBe(-1);
  });
});
```
````

</v-click>

---

## Our test

> for all a, b, c strings  
> b is a substring of a + b + c

<br />

<v-click>

```ts
{a: "e漢}@🐱z’a", b: "eiiz", c: "漢null¤"} ✗
```

</v-click>

---

## Shrinking in action

<v-click>

```ts
{a: "e漢}@🐱z’a", b: "eiiz", c: "漢null¤"} ✗
```

</v-click>

<v-click>

```ts
{a: "", b: "eiiz", c: "漢null¤"} ✗ 
```

</v-click>

<v-click>

```ts
{a: "", b: "", c: "漢null¤"} ✓ 
```

</v-click>

<v-click>

```ts
{a: "", b: "ei", c: "漢null¤"} ✓ 
```

</v-click>

<v-click>

```ts
{a: "", b: "eii", c: "漢null¤"} ✗ 
```

</v-click>

<v-click>

```ts
{a: "", b: "ii", c: "漢null¤"} ✗ 
```

</v-click>

<v-click>

```ts
{a: "", b: "i", c: "漢null¤"} ✓ 
```

</v-click>

<v-click>

```ts
{a: "", b: "ii", c: ""} ✗ 
```

</v-click>

---

## Implementation

> What if wanted to test: `knuthMorrisPratt`?

````md magic-move {lines: true}
```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    // expect(knuthMorrisPratt(a + b + c, b)).not.toBe(-1);
  });
});
```

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    fc.property(
      // expect(knuthMorrisPratt(a + b + c, b)).not.toBe(-1);
    )
  });
});
```

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) => {
      // expect(knuthMorrisPratt(a + b + c, b)).not.toBe(-1);
    })
  });
});
```

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) => {
      expect(knuthMorrisPratt(a + b + c, b)).not.toBe(-1);
    })
  });
});
```

```ts
describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    fc.assert(fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) => {
      expect(knuthMorrisPratt(a + b + c, b)).not.toBe(-1);
    }))
  });
});
```
````

---
layout: center
---

# Does it work?

---
layout: cover
---

**Issue detected:** knuth morris pratt implementation considered "" was not a substring of ""

![](/assets/pr-knuth.png)

**Code example:**

```ts
knuthMorrisPratt("", "")   //=> -1
knuthMorrisPratt("a", "a") //=> 0
```

---
layout: cover
---

**Issue detected:** integer overflows and rounding issues in the implementation of rabin karp

![](/assets/pr-rabin.png)

**Code example:**

```ts
rabinKarp("^ !/'#'pp", " !/'#'pp") //=> -1
// expected to be 2
```

---
layout: center
---

# But...

We only covered the truthy state  
In reality our algorithm is more <em>indexOf</em>

---
layout: center
---

<div style="display: grid;">
<v-switch>
<template #0>
<div style="grid-row: 1; grid-column: 1;; padding-top: 16px;">
  <p style="font-size: 3rem">a = "<span style="color: rgb(90, 166, 0)">inviter</span>" , b = "<span style="color: rgb(90, 166, 0)">vite</span>"</p>
</div>
</template>
<template #1>
<div style="grid-row: 1; grid-column: 1; padding-top: 16px;">
  <p style="font-size: 3rem">a = "<span style="color: rgb(90, 166, 0)">in<span style="color: red">vite</span>r</span>" , b = "<span style="color: rgb(90, 166, 0)">vite</span>"</p>
</div>
</template>
<template #2>
<div style="grid-row: 1; grid-column: 1; padding-top: 16px;">
  <p style="font-size: 3rem">a = "<span style="color: rgb(90, 166, 0)">in<span style="color: red">vite</span>r</span>" , b = "<span style="color: rgb(90, 166, 0)">vite</span>"</p>
  <br />
  <p>knuth(a, b) == 2</p>
</div>
</template>
<template #3>
<div style="grid-row: 1; grid-column: 1; padding-top: 16px;">
  <p style="font-size: 3rem">a = "<span style="color: rgb(90, 166, 0)">in<span style="color: red">vite</span>r</span>" , b = "<span style="color: rgb(90, 166, 0)">vite</span>"</p>
  <br />
  <p>knuth(a, b) == 2<br/>
  a.substr(2, b.length) == b</p>
</div>
</template>
<template #4>
<div style="grid-row: 1; grid-column: 1; padding-top: 16px;">
  <p style="font-size: 3rem">a = "<span style="color: rgb(90, 166, 0)">in<span style="color: red">vite</span>r</span>" , b = "<span style="color: rgb(90, 166, 0)">vite</span>"</p>
  <br />
  <p>knuth(a, b) == 2<br/>
  a.substr(2, b.length) == b</p>
  <br />

> for all a, b strings and idx = knuth(a, b)  
> idx is either -1 or position of the match

</div>
</template>
</v-switch>
</div>

---

```ts
fc.assert(
  fc.property(
    fc.string(), fc.string(),
    (a, b) => {
      const idx = knuthMorrisPratt(a, b)
      return idx === -1 || a.substr(idx, b.length) === b
    }
  )
)
```

---
layout: cover
---

**Issue detected:** asymmetrical equality for 0 and 5e-324

![](/assets/pr-jest-sym1.png)

**Code example:**

```ts
expect(0).toStrictEqual(5e-324) // success
expect(5e-324).toStrictEqual(0) // failure
```

---
layout: cover
---

**Issue detected:** asymmetrical equality for Set

![](/assets/pr-jest-sym2.png)

**Code example:**

```ts
const s1 = new Set([false, true]);
const s2 = new Set([new Boolean(true), new Boolean(true)]);
expect(s1).toEqual(s2); // failure
expect(s2).toEqual(s1); // success
```

---
layout: center
---

# Going further?

---

## Extending it to E2E

<v-click>

> The infinite monkey theorem states that a monkey hitting keys at random on a typewriter keyboard for an infinite amount of time will almost surely type any given text, including the complete works of William Shakespeare.

</v-click>

<v-click>

<img src="/assets/e2e.gif" style="margin-top: 16px; width: 35%" />

</v-click>

---

## Detecting race conditions

<iframe v-click width="560" height="315" src="https://www.youtube.com/embed/ysYoNrCfroo?si=csmPdbm3OekxWQLD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


---
layout: center
---

# Questions

Do not hesitate to visit our blog: <a href="https://engineering.pigment.com/" target="_blank">engineering.pigment.com</a>