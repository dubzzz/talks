---
theme: seriph
background: https://www.margeride-en-gevaudan.com/wp-content/uploads/2020/01/JSC-PAYSAGES-MARGERIDE-283.jpg
title: Property-based testing with fast-check
info: 
class: text-center # apply any unocss classes to the current slide
highlighter: shiki # https://sli.dev/custom/highlighters.html
drawings:
  persist: false
transition: slide-left
mdc: true # enable MDC Syntax: https://sli.dev/guide/syntax#mdc-syntax
colorSchema: light
themeConfig:
  primary: rgb(0, 122, 204)
  secondary: rgb(248, 211, 78)
favicon: "https://cdn.prod.website-files.com/6605b12132f6a8b5d23896bd/66d9efed1b2158878cbd56bf_Pigment%20Favicon%20Webflow.png"
#fonts:
#  sans: DM Sans
#  serif: Crimson Pro
layout: cover
---

<div>
  <img src="/assets/me.jpg" style="border-radius: 50%; height: 128px; border: white 2px solid;" />
</div>

<div style="margin-top: 32px"></div>
<h1 style="color: #fff !important; font-size: 3rem; line-height: 3.2rem">Property-based testing<br/><i>with</i> <code style="color:#0552db;">fast-check</code></h1>
<h2 style="color: #fff !important; margin-top: 24px; opacity: 0.9">Nicolas DUBIEN</h2>
<div style="display: flex; justify-content: center; font-size: 1.2em; margin-top: -12px; align-items: end; opacity: 0.9">
  <span style="margin-top: 0.7em">
    Lead Principal Software Engineer at&nbsp;
  </span>
  <img
    src="/assets/Pigment logo.svg"
    style="height: 31px; box-shadow: none"
  />
</div>

<div style="margin-top: 24px"></div>
<div style="display: flex; gap: 8px; color: #ffffff; vertical-align: middle; opacity: 0.9">
  <img src="/assets/github-white.png" style="height: 24px; border: none; background: none; margin: 0px" />
  dubzzz
</div>
<div style="display: flex; gap: 8px; color: #ffffff; vertical-align: middle; opacity: 0.9">
  <img src="/assets/bluesky.svg" style="height: 24px; border: none; background: none; margin: 0px" />
  @nicolas.dubien.me
</div>
<div style="display: flex; gap: 8px; color: #ffffff; vertical-align: middle; opacity: 0.9">
  <img src="/assets/npm.png" style="height: 24px; border: none; background: none; margin: 0px" />
  fast-check
</div>

---
layout: center
---

## **Why another technique?**

---
layout: fact
---

### Writing tests is hard

<br/>

<v-click>

> Why covering this <code>-1</code>?

</v-click>

<v-click>

> Or this <code>""</code>?

</v-click>

<v-click>

> Why are we mocking this API?

</v-click>

---
layout: fact
---

### It requires seniority*


<v-click>

> *It's about knowing the ways to get it wrong

</v-click>

---
layout: center
---

## **Coverage**

---
layout: center
---

![](/assets/coverage.jfif)

---
layout: fact
---

### Not enough

---
layout: center
---

## **What's missing?**

---
layout: fact
---

### Our tests today

<div style="text-align: left">

````md magic-move {lines: true}
```ts
import { expect, describe, it } from 'vitest'
import { isSubstring } from './isSubstring.js'

describe('isSubstring', () => {
  // ...
})
```

```ts
import { expect, describe, it } from 'vitest'
import { isSubstring } from './isSubstring.js'

describe('isSubstring', () => {
  it('should find "niddle" inside the text', () => {
    // ...
  })
})
```

```ts
import { expect, describe, it } from 'vitest'
import { isSubstring } from './isSubstring.js'

describe('isSubstring', () => {
  it('should find "niddle" inside the text', () => {
    // Arrange
    const pattern = "niddle"
    const text = "text with niddle into it!"

    // Act
    const out = isSubstring(pattern, text)

    // Assert
    expect(out).toBe(true)
  })
})
```

```ts
import { expect, describe, it } from 'vitest'
import { isSubstring } from './isSubstring.js'

describe('isSubstring', () => {
  it('should find "niddle" inside the text', () => {
    // Arrange
    const pattern = "niddle"
    //              ^ ⚠️ Is it an hardcoded value?!!
    const text = "text with niddle into it!"
    //           ^ ⚠️ Is it an hardcoded value?!!

    // Act
    const out = isSubstring(pattern, text)

    // Assert
    expect(out).toBe(true)
  })
})
```
````

</div>

---
layout: fact
---

### Limited scope of inputs covered

---
layout: center
---

## **Property-Based Testing**

<br/>

<v-click>

> Going random*

</v-click>

<v-click>

> *But in reproducible way

</v-click>

<v-click>

> *New inputs at each run

</v-click>

<v-click>

> *With shrinking in mind

</v-click>

---
layout: fact
---

### Properties over Isolated Cases

---
layout: fact
---

<div style="text-align: left">
<div class="font-mono text-lg leading-relaxed">
<span class="text-gray-600">for all (x, y, ...)</span>
<v-click><div class="pl-6 text-blue-600">generate random inputs based on specified generators</div></v-click>
<span class="text-gray-600">such that precondition(x, y, ...) holds</span>
<v-click><div class="pl-6 text-yellow-600">check preconditions — failure? go back to previous</div></v-click>
<span class="text-gray-600">property(x, y, ...) is true</span>
<v-click><div class="pl-6 text-green-600">run the test — failure? shrink</div></v-click>
</div>
</div>

<v-click>

<div class="mt-8 text-2xl text-center">🔁 Run it 100 times 🔁</div>

</v-click>

---
layout: fact
---

### Back to <code>isSubstring</code>

---
layout: fact
---

<div style="text-align: left">
<div class="font-mono text-lg leading-relaxed">
<span class="text-gray-600">for all <b>(x, y, ...)</b></span>
<br/><span class="text-gray-600">such that <b>precondition(x, y, ...)</b> holds</span>
<br/><span class="text-gray-600"><b>property(x, y, ...)</b> is true</span>
</div>
</div>

<div style="text-align: right" v-click>
<div class="font-mono text-lg leading-relaxed">
<span class="text-gray-600">for all <b>a, b, c strings</b></span>
<br/><span class="text-gray-600"><b>b</b> is a substring of <b>a + b + c</b></span>
</div>
</div>


---
layout: fact
---

### Our tests today rewritten

<div style="text-align: left">

````md magic-move {lines: true}
```ts
import { expect, describe, it } from 'vitest'
import { isSubstring } from './isSubstring.js'

describe('isSubstring', () => {
  it('should find "niddle" inside the text', () => {
    // Arrange
    const pattern = `niddle`
    const text = `text with niddle into it!`

    // Act
    const out = isSubstring(pattern, text)

    // Assert
    expect(out).toBe(true)
  })
})
```

```ts
import { expect, describe, it } from 'vitest'
import { isSubstring } from './isSubstring.js'

describe('isSubstring', () => {
  it('should find "niddle" inside the text', () => {
    // Arrange
    const pattern = `niddle`
    const text = `text with ${pattern} into it!`

    // Act
    const out = isSubstring(pattern, text)

    // Assert
    expect(out).toBe(true)
  })
})
```

```ts
import { expect, describe, it } from 'vitest'
import { isSubstring } from './isSubstring.js'

describe('isSubstring', () => {
  it('should find "niddle" inside the text', () => {
    // Arrange
    const pattern = `niddle`
    const prefix = `text with `
    const suffix = ` into it!`
    const text = `${prefix}${pattern}${suffix}`

    // Act
    const out = isSubstring(pattern, text)

    // Assert
    expect(out).toBe(true)
  })
})
```

```ts
import * as fc from "fast-check"
import { expect, describe, it } from 'vitest'
import { isSubstring } from './isSubstring.js'

describe('isSubstring', () => {
  it('should find <pattern> inside the <prefix><pattern><suffix>', () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), fc.string(), (pattern, prefix, suffix) => {
        // Arrange
        const text = `${prefix}${pattern}${suffix}`

        // Act
        const out = isSubstring(pattern, text)

        // Assert
        expect(out).toBe(true)
      })
    )
  })
})
```
````

</div>


---
layout: fact
---

### <code>fast-check</code> unpacked


<div style="text-align: left">

````md magic-move {lines: true}
```ts
import * as fc from "fast-check"
import { expect, describe, it } from 'vitest'
import { isSubstring } from './isSubstring.js'

describe('isSubstring', () => {
  it('should find <pattern> inside the <prefix><pattern><suffix>', () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), fc.string(), (pattern, prefix, suffix) => {
        // Arrange
        const text = `${prefix}${pattern}${suffix}`

        // Act
        const out = isSubstring(pattern, text)

        // Assert
        expect(out).toBe(true)
      })
    )
  })
})
```

```ts
fc.assert(
  fc.property(fc.string(), fc.string(), fc.string(), (pattern, prefix, suffix) => {
    // Arrange
    const text = `${prefix}${pattern}${suffix}`

    // Act
    const out = isSubstring(pattern, text)

     // Assert
     expect(out).toBe(true)
  })
)
```

```ts
fc.assert(
  fc.property(...arbitraries, (...generatedValues) => {
    // ...predicate code
  })
)
```
````

</div>

---
layout: center
---

# 👋 Your turn now!