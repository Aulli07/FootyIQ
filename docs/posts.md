Here’s an X-style version with storytelling:

I built a comparison card inside my post feed and thought it was done.

On refresh, it would flash on screen for a moment, then disappear after hydration. Sometimes it showed. Sometimes it didn’t.

At first I blamed Strict Mode. Then I suspected React hydration.

The real issue was simpler:
I was reading browser storage during render.

That meant the server HTML and the first client render were not always the same.

The fix:
I moved the attachment and comparison lookup to run after mount, and made the store hydration synchronous and predictable.

Lesson learned:
If a component can render on the server, don’t depend on localStorage or other browser-only data during the first render.

Make the first paint stable.
Hydrate later.
Keep lookup helpers pure.