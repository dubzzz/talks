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