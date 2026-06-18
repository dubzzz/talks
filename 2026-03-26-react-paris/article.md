# Chasing Performance Drifts: A Few Recipes That Scaled

*Based on a talk by Nicolas Dubien at React Paris — March 26, 2026*

---

Performance doesn't break all at once. It erodes — silently, gradually, one overlooked cleanup at a time. By the time users notice, the damage has compounded far beyond a quick fix. This is the story of how the team at Pigment learned to catch performance drifts before their users did, and the safety nets they built to make sure those drifts never crept back in.

## Why performance matters (even more for UI)

The numbers speak for themselves. In 2006, Google discovered that adding just 500 milliseconds of delay to search results caused a 20% drop in traffic. That same year, Amazon found that a 100-millisecond increase in page load time translated into a 1% drop in sales. These findings are two decades old, and the stakes have only grown since.

A more recent study from February 2026 paints an even more alarming picture: after scanning 500 public repositories — including well-known projects like Next.js, Kibana, and AFFiNE — researchers found that 86% of them contained at least one missing-cleanup pattern. Each leaked roughly 8 KB per navigation cycle, compounding silently in production. The heap climbs to 200 MB, 300 MB, 400 MB, with no sign of leveling off.

This isn't the kind of performance problem that shows up as a sudden spike in your monitoring dashboard. It's a slow, silent drift — and that's exactly what makes it dangerous.

## The context: Pigment's Board

At Pigment, the product revolves around real-time collaborative spreadsheets — what they call "The Board." Think of a grid that can stretch from thousands to billions of cells, with multiple users editing simultaneously. Everything is real-time: changes propagate instantly, even when a tab sits in the background. It's the kind of application where performance isn't a feature — it's a survival requirement.

Over time, three distinct performance crises emerged. Each one revealed a different class of drift, and each one led to a new kind of safety net.

## The first crack: silent memory leaks

It started with a support ticket that felt impossible to reproduce. Users reported that their tabs kept crashing with out-of-memory errors, but never right away. "It works fine at first," one user wrote. "But after a while, this strange message pops up."

The culprit turned out to be a classic but subtle bug: a `useEffect` hook that registered an event listener on `"keydown"` but removed it from `"keyup"`. A single character difference — invisible in code review, harmless in a quick test, but catastrophic over time. In a real-time application where the UI redraws itself repeatedly in the background, each redraw leaked a listener. Over hours, memory climbed until the tab collapsed.

### The trap: leak probes with WeakRef

The fix was straightforward, but the team wanted something more: a guarantee that this class of bug would never ship again. Their approach was elegant. They built a `useLeakProber` hook — a no-op in production — that plants a unique object inside each component and tracks it with a `WeakRef`. After garbage collection, if the object is still reachable via `ref.deref()`, that component has leaked.

The test pattern is simple:

1. Open the app on the homepage
2. Count the number of active leak probes
3. Run a user flow (navigate to a board, interact with it)
4. Return to the homepage
5. Force garbage collection and count again

If the count increased, something leaked. Wrapped in Cypress with a custom `cy.gc()` command to trigger explicit garbage collection, this became a reliable, automated safety net.

```jsx
function countLeaks() {
  cy.gc();
  return cy.window().then((window) => {
    window.gc?.();
    return window.countActiveLeaks();
  });
}
```

## The second crack: excessive re-renders

The next complaint came from users navigating grids with arrow keys. "Each keystroke hangs for seconds," they reported. The grid had become unusable.

The root cause was a state architecture issue. The "currently selected cell" state was stored in a way that was shared across all cells. When the selection changed, React had no choice but to re-render every single cell in the grid — even those that hadn't changed at all. For grids with thousands of visible cells, this turned a single keystroke into a full-grid repaint.

The fix was to move the shared state outside the React tree, allowing cells to subscribe to only the updates they cared about. But again, the team wanted a safety net to prevent regression.

### The trap: render counting

They built a `useRenderCount` hook that increments a counter every time a component renders, categorized by component type:

```jsx
const renderCount = new Map<string, number>();

function useRenderCount(kind: string) {
  useEffect(() => {
    renderCount.set(kind, (renderCount.get(kind) ?? 0) + 1);
  });
}
```

Tests then assert exact expectations: pressing the down arrow on a grid should re-render exactly 2 cells (the one losing focus and the one gaining it) and 0 headers. Anything more signals a regression.

```jsx
it('should not re-render the whole grid when navigating', () => {
  login();
  visitGrid('grid-name');
  focusOnCell(0, 0);
  resetRenderCounters();
  pressArrowDown();
  expectRenderCount('cell', 2);
  expectRenderCount('header', 0);
});
```

## The third crack: slow operations blocking the main thread

The third crisis was more insidious. Users noticed that scrolling through grids became progressively slower — the further they scrolled, the worse it got.

The problem was a time complexity issue hiding in a cache. Cells backed by enum types could reference millions of items — too many to hold in memory at once. So the application fetched them into a cache on demand. But updating that cache was an O(n) operation. As users scrolled and more items accumulated, each cache update took longer, blocking the main thread and freezing the entire UI.

The fix was to batch the operations. But how do you write a test that catches "the main thread is blocked for too long"?

### The trap: Long Task detection with PerformanceObserver

The browser already has an answer: the Long Tasks API. Any synchronous operation that blocks the main thread for more than 50 milliseconds is classified as a "long task" and can be observed via the `PerformanceObserver`:

```jsx
const longTasks = [];

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntriesByType('longtask')) {
    longTasks.push(entry.duration);
  }
});
observer.observe({ entryTypes: ['longtask'] });
```

The test is straightforward: run a user flow, then assert that no long tasks were recorded. This check can even be placed in an `afterEach` block, turning every integration test into a performance guardian for free.

## The pattern behind the patterns

Step back and a common shape emerges across all three safety nets:

1. **Measure** something before the flow
2. **Run** a user flow
3. **Measure** the same thing after the flow and verify expectations

Whether it's leak probes, render counters, or long task observers, the structure is identical. What changes is the metric being tracked.

These safety nets are not a replacement for the first line of defense — unit tests, code reviews, linting, and static analysis still catch the majority of issues. But when those defenses miss something (and eventually, they will), the safety net catches it before it reaches production.

## Takeaways

Performance drift is the kind of problem that makes you question your monitoring. Nothing looks broken. There's no error in the logs. There's no spike in your dashboards. There's just a user, three months from now, telling support that the app "feels slow."

The recipes shared in this talk offer a pragmatic defense:

- **Leak probes** using `WeakRef` catch components that outlive their lifecycle
- **Render counters** catch unnecessary re-renders that compound into sluggishness
- **Long task observers** catch synchronous operations that freeze the UI

None of these techniques require exotic tooling. They use standard browser APIs — `WeakRef`, `useEffect`, `PerformanceObserver` — wired into existing Cypress integration tests. The investment is small. The protection is lasting.

Performance doesn't drift when you're watching.

---

*Nicolas Dubien is a Lead Principal Software Engineer at [Pigment](https://engineering.pigment.com/) and the creator of [fast-check](https://www.npmjs.com/package/fast-check). You can find him on [GitHub](https://github.com/dubzzz) and [Bluesky](https://bsky.app/profile/nicolas.dubien.me).*
