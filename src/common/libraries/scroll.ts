/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Defines a class to detect and manage scrolling.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-23
 * @file scroll.ts
 * @version 0.0.2
 */

/**
 * @description Scrolls scrollbar thumb to specified element.
 * @param {?(HTMLElement|string)} element The target element.
 * @function scrollTo
 * @type {void}
 * @public
 * @returns {void}
 */
function scrollTo (element: (HTMLElement | string | null)): void {
  // Gets passed tag.
  const tag: (HTMLElement | null) = (
    typeof element !== "string" ? element :
    document.querySelector<HTMLElement>(String(element))
  );
	// Scrolls directly to target tag reference.
  if (tag != null) tag.scrollIntoView({
		behavior: "smooth", inline: "nearest", block: "start"
	});
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {scrollTo};
