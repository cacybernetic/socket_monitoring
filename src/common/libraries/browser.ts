/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Defines common methods used with the browser.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-09-23
 * @updated 2025-11-23
 * @file browser.ts
 * @version 0.0.2
 */

// Custom dependencies.
import {setWindowHeight, setWindowWidth} from "@/common/states/app.ts";
import {store} from "@/common/states/store.ts";

/**
 * @description Listens window `resize` event to extract his size.
 * @function listenWindowResizeToExtractHisSize
 * @type {void}
 * @public
 * @returns {void}
 */
function listenWindowResizeToExtractHisSize (): void {
  // Destroys old attached callback from `resize` event.
  window.removeEventListener("resize", fetchWindowInnerSize_);
  // Hooks another method to the `resize` event.
  window.addEventListener("resize", fetchWindowInnerSize_);
}

/**
 * @description Gets current window inner size for custom responsive.
 * @function fetchWindowInnerSize_
 * @private {function}
 * @type {void}
 * @returns {void}
 */
function fetchWindowInnerSize_ (): void {
  // Sets application global page height.
  store.dispatch(setWindowHeight(window.innerHeight));
  // Sets application global page width.
  store.dispatch(setWindowWidth(window.innerWidth));
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {listenWindowResizeToExtractHisSize};
