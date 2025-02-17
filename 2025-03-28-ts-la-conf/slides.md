---
theme: seriph
background: https://lespepitesdefrance.com/wp-content/uploads/2023/09/Top-5-des-plus-belles-rivieres-de-Lozere.png
title: Mastering TypeScript for Real-World Applications
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
---

<div style="display:flex; justify-content: center; margin-bottom: 16px;">
  <img src="/assets/ts-conf.webp" style="max-width: 20%;" />
</div>

<h1 style="color: #fff !important; line-height: 1.1em !important;">Mastering TypeScript</h1>
<h2 style="color: #fff !important; line-height: 1.1em !important;">For Real-World Applications</h2>

_**By Nicolas DUBIEN**_

---
layout: center
---

![](assets/runtime-error-undefined.png)

---
layout: center
---

![](assets/runtime-error-map.png)

<!--
  It may feels a bit frustrating whe nusing TypeScript to fall into such problems.
  But in many cases, these cases happen because we are bypassing a bit TypeScript, not defining the right types...
-->

---

## Everyone did it once…

<div style="display: grid; margin-top: 32px; color: white; text-align: center; font-size: 3em; position: relative">
  <v-switch>
    <template #1>
      <div style="grid-row: 1; grid-column: 1">
        <pre style="background-color: rgb(0, 122, 204);"><code>as any</code></pre>
      </div>
    </template>
    <template #2>
      <div style="grid-row: 1; grid-column: 1">
        <pre style="background-color: #cc4700;"><code>as any</code><div style="position: absolute; top: 0; right: 0; height: 0;">😱</div></pre>
      </div>
    </template>
    <template #3>
      <div style="grid-row: 1; grid-column: 1">
        <pre style="background-color: #cc4700;"><code><span style="font-weight: 900;">as</span> <span style="opacity: 50%">any</span></code><div style="position: absolute; top: 0; right: 0; height: 0;">😱</div></pre>
      </div>
    </template>
  </v-switch>
</div>


---

## …not sure?

````md magic-move {lines: true}
```ts
type Props = {}; // should support single-select and multi-select

declare function Select(props: Props);
```

```ts
type Props = {
  multiple: boolean | undefined;
  value: string | string[];
  onChange: (newValue: string | string[]) => void;
};

declare function Select(props: Props);
```

```ts
type Props = {
  /** Should the Select support multi-selection? */
  multiple: boolean | undefined;
  /*
   * Mode multiple=false/undefined: the selected value as a string
   * Mode multiple=true: the selected values as an array of strings
   */
  value: string | string[];
  onChange: (newValue: string | string[]) => void;
};

declare function Select(props: Props);
```

```ts
type Props = {
  /** Should the Select support multi-selection? */
  multiple: boolean | undefined;
  /*
   * Mode multiple=false/undefined: the selected value as a string
   * Mode multiple=true: the selected values as an array of strings
   */
  value: string | string[];
  onChange: (newValue: string | string[]) => void;
};

export default function Select(props: Props) {
  const { multiple, value, onChange } = props;
  return multiple ? (
    <MultipleValuesSelect value={value} onChange={onChange} />
  ) : (
    <SingleValueSelect value={value} onChange={onChange} />
  );
}
```

```ts
type Props = {
  /** Should the Select support multi-selection? */
  multiple: boolean | undefined;
  /*
   * Mode multiple=false/undefined: the selected value as a string
   * Mode multiple=true: the selected values as an array of strings
   */
  value: string | string[];
  onChange: (newValue: string | string[]) => void;
};

export default function Select(props: Props) {
  const { multiple, value, onChange } = props;
  return multiple ? (
    <MultipleValuesSelect value={value as string[]} onChange={onChange} />
  ) : (
    <SingleValueSelect value={value as string} onChange={onChange} />
  );
}
```
````

---
layout: cover
background: https://www.margeride-en-gevaudan.com/wp-content/uploads/2020/01/JSC-PAYSAGES-MARGERIDE-283.jpg
---

<div>
  <img src="/assets/me.jpg" style="border-radius: 50%; height: 128px; border: white 2px solid;" />
</div>

<div style="margin-top: 48px"></div>
<h2 style="color: #fff !important">Mastering TypeScript for Real-World Applications</h2>
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
  <img src="/assets/npm.png" style="height: 24px; border: none; background: none; margin: 0px" />
  fast-check
</div>

---
layout: image
image: /assets/papyrus.avif
---

<h1 style="color: #cc4700">Our Guiding Example</h1>

<p v-click style="color: #5C4420; opacity: 1">We’re building a store management web app where each store can define and manage their product listings. Today, our focus is on the <b>Product sheet</b>.</p>

<p v-click style="color: #5C4420; opacity: 1">So let’s build it!</p>

<pre v-click style="color: #5C4420; background: #fff5; padding: 16px; border-radius: 1px"><code>function ProductSheet(props) {
  const { storeId, productId } = props;
  const productDetails = useFetchProductDetails(storeId, productId);
  // TODO: display the content
}</code></pre>

---
layout: image
image: /assets/papyrus.avif
---

<h2 style="color: #cc4700">Problem #1: Order of IDs in a function call</h2>

<p v-click style="color: #5C4420; opacity: 1">Is it <code>storeId, productId</code> or <code>productId, storeId</code>?</p>

<pre v-click style="color: #5C4420; background: #fff5; padding: 16px; border-radius: 1px"><code>declare function useFetchProductDetails(
  storeId: string,
  productId: string
): ProductDetails;</code></pre>

<p v-click style="color: #5C4420; opacity: 1">Can we enforce proper ordering?</p>

---

# Branded Types

Let’s extend type safety to ensure our ID is not just a `string`, a `number` or other…

<v-click>

````md magic-move {lines: true}
```ts
export type StoreId = string;
```

```ts
declare const validStoreId: unique symbol;
export type StoreId = string & { [validStoreId]: true };
```

```ts
declare const validStoreId: unique symbol;
export type StoreId = string & { [validStoreId]: true };
export const toStoreId = (id: string) => id as StoreId;
```
````

</v-click>

<v-click>

**Usages:** Ensure you manipulate the right IDs at the right place

</v-click>

---
layout: image
image: /assets/papyrus.avif
---

<h1 style="color: #cc4700">Back to our Guiding Example</h1>

<p v-click style="color: #5C4420; opacity: 1">Let’s display our product on the page. We actually have two kinds of products: <b>fruit</b> and <b>vegetable</b>, each with its own display and its own set of attributes.</p>

<pre v-click style="color: #5C4420; background: #fff5; padding: 16px; border-radius: 1px"><code>function ProductSheet(props) {
  const { storeId, productId } = props;
  const productDetails = useFetchProductDetails(storeId, productId);
  return productDetails.type === "fruit"
    ? &lt;div&gt;{productDetails.fruit.name}&lt;/div&gt;
    : &lt;div&gt;{productDetails.vegetable.name}&lt;/div&gt;;
}</code></pre>

---
layout: image
image: /assets/papyrus.avif
---

<h2 style="color: #cc4700">Problem #2: Shape depending on the "type"</h2>

<p v-click style="color: #5C4420; opacity: 1">Is there a <code>.fruit</code> property available if the item is of type <code>fruit</code>?</p>

<pre v-click style="color: #5C4420; background: #fff5; padding: 16px; border-radius: 1px"><code>type ProductDetails = {
  type: 'fruit' | 'vegetable';
  fruit?: Fruit;
  vegetable?: Vegetable;
};</code></pre>

<p v-click style="color: #5C4420; opacity: 1">We may end up with:</p>

<pre v-click style="color: #5C4420; background: #fff5; padding: 16px; border-radius: 1px">
<code>productDetails.fruit.name ➡️ productDetails.fruit!.name</code>
<code>productDetails.fruit.name ➡️ (productDetails.fruit as Fruit).name</code>
</pre>

---

# Discriminated Unions

Let's group in a single type several shapes while preserving a way to split them back

<v-click>

````md magic-move {lines: true}
```ts
type ProductDetails = {
  type: 'fruit' | 'vegetable';
  fruit?: Fruit;
  vegetable?: Vegetable;
};
```

```ts
type ProductDetails =
  | {
      type: 'fruit';
      fruit: Fruit;
    }
  | {
      type: 'vegetable';
      vegetable: Vegetable;
    };
```
````

</v-click>

<v-click>

**Usages:** Strongly type external data

```ts
type Value = {
  type: 'text' | 'numeric' | 'date';
  textValue?: string;
  numericValue?: number;
  dateValue?: Date;
};
```

</v-click>

---
layout: image
image: /assets/papyrus.avif
---

<h2 style="color: #cc4700">Problem #3: Can we repeat ourselves less?</h2>

<p v-click style="color: #5C4420; opacity: 1">What if we had a magic way to say <code>.fruit</code> property exists because type is <code>fruit</code>? For this example let suppose that whather the type of product, the content is the same, the name of the property is the only things that changes.</p>

<pre v-click style="color: #5C4420; background: #fff5; padding: 16px; border-radius: 1px"><code>type ProductDetails = {
  type: 'fruit' | 'vegetable';
  fruit?: { name: string };
  vegetable?: { name: string };
};</code></pre>

<p v-click style="color: #5C4420; opacity: 1">What if we added 100 extra types?</p>

---

# Mapped types

Let's stop repeating ourselves

<v-click>

````md magic-move {lines: true}
```ts
type SetOfKeys = /* TODO */;
type MyType = { [K in SetOfKeys]: ValueForKeyK };
```

```ts
type ProductDetailsType = 'fruit' | 'vegetable';
type ProductDetails = { [K in ProductDetailsType]: ValueForKeyK };
```

```ts
type ProductDetailsType = 'fruit' | 'vegetable';
type ProductDetails = { [K in ProductDetailsType]: { name: string } };
// type ProductDetails = {
//   fruit: { name: string; };
//   vegetable: { name: string; };
// }
```

```ts
type ProductDetailsType = 'fruit' | 'vegetable';
type ProductDetails = { [K in ProductDetailsType]: { type: K, name: string } };
// type ProductDetails = {
//   fruit: { type: 'fruit'; name: string; };
//   vegetable: { type: 'vegetable'; name: string; };
// }
```

```ts
type ProductDetailsType = 'fruit' | 'vegetable';
type ProductDetails = { [K in ProductDetailsType]: { type: K, [K]: { name: string } } };
// ERROR!!!
```

```ts
type ProductDetailsType = 'fruit' | 'vegetable';
type ProductDetailsValueFor<K extends string> =  { type: K, [K]: { name: string } };
type ProductDetails = { [K in ProductDetailsType]: ProductDetailsValueFor<K> };
// ERROR!!!
```

```ts
type ProductDetailsType = 'fruit' | 'vegetable';
type ProductDetailsValueFor<K extends string> =  { type: K } & { [SK in K]: { name: string } };
type ProductDetails = { [K in ProductDetailsType]: ProductDetailsValueFor<K> };
// type ProductDetails = {
//   fruit: { type: 'fruit'; fruit: { name: string; } };
//   vegetable: { type: 'vegetable'; vegetable: { name: string; } };
// }
```

```ts
type ProductDetailsType = 'fruit' | 'vegetable';
type ProductDetailsValueFor<K extends string> =  { type: K } & { [SK in K]: { name: string } };
type ProductDetails = { [K in ProductDetailsType]: ProductDetailsValueFor<K> }[ProductDetailsType];
// type ProductDetails =
//   | { type: 'fruit'; fruit: { name: string; } }
//   | { type: 'vegetable'; vegetable: { name: string; } };
```
````

</v-click>

<v-click>

**Usages:** Strongly type external data

```ts
type Value = {
  type: 'text' | 'numeric' | 'date';
  textValue?: string;
  numericValue?: number;
  dateValue?: Date;
};
```

</v-click>

---

Quick zoom on "Strongly type external data":

```ts
type ValueType = 'text' | 'numeric' | 'date';
type Value = {
  type: ValueType;
  textValue?: string;
  numericValue?: number;
  dateValue?: Date;
};

type StronglyTypedValue = {
  [K in Value['type']]: { type: K } & Required<Pick<Value, `${Uncapitalize<K>}Value`>>;
}[ValueType]
```

---
layout: image
image: /assets/papyrus.avif
---

<h2 style="color: #cc4700">Problem #4: Type exhaustion</h2>

<p v-click style="color: #5C4420; opacity: 1">Am I sure I checked all types?</p>

<pre v-click style="color: #5C4420; background: #fff5; padding: 16px; border-radius: 1px"><code>return productDetails.type === 'fruit'
  ? "It's a fruit"
  : "It's a vegetable";</code></pre>

---

# _\*never_

Let's avoid missing one type

<v-click>

````md magic-move {lines: true}
```ts
return productDetails.type === 'fruit'
  ? "It's a fruit"
  : "It's a vegetable";
```

```ts
return productDetails.type === 'fruit'
  ? "It's a fruit"
  : productDetails.type === 'vegetable'
  ? "It's a vegetable"
  : "It's not supported yet";
```

```ts
return productDetails.type === 'fruit'
  ? "It's a fruit"
  : productDetails.type === 'vegetable'
  ? "It's a vegetable"
  : assertUnreachable(productDetails.type, "It's not supported yet");
```

```ts
export function assertUnreachable<T>(arg: never, defaultValue: T) {
  return defaultValue;
}

return productDetails.type === 'fruit'
  ? "It's a fruit"
  : productDetails.type === 'vegetable'
  ? "It's a vegetable"
  : assertUnreachable(productDetails.type, "It's not supported yet");
```
````

</v-click>

<v-click>

**Usages:** New types need to be added over time in the API

</v-click>

---
layout: image
image: /assets/papyrus.avif
---

<h1 style="color: #cc4700">Back to our Guiding Example</h1>

<p v-click style="color: #5C4420; opacity: 1">Let's suppose we want to tell our users that they should reload the page as some external changes may have impacted the sheet. Our code might have to be adapted as follow:</p>

<pre v-click style="color: #5C4420; background: #fff5; padding: 16px; border-radius: 1px"><code>function ProductSheet(props) {
  const productDetails = useFetchProductDetails(props.storeId, props.productId);
  useNotifyChanges((updatedProductDetails) => {
    // return true if the change should be considered as impactful
  }, productDetails);
  return ...;
}

type SubscribableProductDetails = {
  subscribe: (updatedValue: ProductDetails) => void;
} & ProductDetails;</code></pre>

---
layout: image
image: /assets/papyrus.avif
---

<h2 style="color: #cc4700">Problem #5: More generic?</h2>

<p v-click style="color: #5C4420; opacity: 1">Could we make <code>Subscribable</code> more generic?</p>

---

# Generic

Let's make things _generic_

<v-click>

````md magic-move {lines: true}
```ts
type SubscribableProductDetails = {
  subscribe: (updatedValue: ProductDetails) => void;
} & ProductDetails;
```

```ts
type Subscribable<T> = {
  subscribe: (updatedValue: T) => void;
} & T;
```
````

</v-click>

<v-click>

**Usages:** Factorizing types

</v-click>

---
layout: image
image: /assets/papyrus.avif
---

<h2 style="color: #cc4700">Problem #6: Typings mixing generics and variadics?</h2>

<p v-click style="color: #5C4420; opacity: 1">Our helper called <code>useNotifyChanges</code> should mix both variadics and generics to work well. With out initial hardcoded types not relying on generics and without variadics the thing could have been as simple as:</p>

<pre v-click style="color: #5C4420; background: #fff5; padding: 16px; border-radius: 1px"><code>declare function useNotifyChanges(
  shouldNotify: (updatedProductDetails: ProductDetails) => boolean,
  subscribableProductDetails: SubscribableProductDetails,
): void;</code></pre>

---

# Consuming generics

Let's consume _generic_

<v-click>

````md magic-move {lines: true}
```ts
declare function useNotifyChanges(
  shouldNotify: (updatedProductDetails: ProductDetails) => boolean,
  subscribableProductDetails: SubscribableProductDetails,
): void;
```

```ts
declare function useNotifyChanges(
  shouldNotify: (updatedProductDetails: ProductDetails) => boolean,
  subscribableProductDetails: Subscribable<ProductDetails>,
): void;
```

```ts
declare function useNotifyChanges<T>(
  shouldNotify: (updatedValue: T) => boolean,
  subscribable: Subscribable<T>,
): void;
```
````

</v-click>

<v-click>

**Usages:** Consuming factorized types

</v-click>

---

# Variadics

Let's support an elastic number of parameters

<v-click>

````md magic-move {lines: true}
```ts
declare function useNotifyChanges<T>(
  shouldNotify: (updatedValue: T) => boolean,
  subscribable: Subscribable<T>,
): void;
```

```ts
declare function useNotifyChanges<TValues extends unknown[]>(
  shouldNotify: (...updatedValues: TValues) => void,
  ...subscribables: { [K in keyof TValues]: Subscribable<TValues[K]> },
): void;
```
````

</v-click>

<v-click>

**Usages:** Properties in fast-check, <code>Promise.all</code>

</v-click>

---
layout: center
---

# Questions

Do not hesitate to visit our blog: <a href="https://engineering.pigment.com/" target="_blank">engineering.pigment.com</a>