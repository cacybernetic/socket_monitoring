/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Defines most common methods used for string treatments.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-09-23
 * @updated 2025-09-23
 * @file string.ts
 * @version 0.0.1
 */

// Types.
type CorrectStringProps = {
  defaultValue?: (string | null),
  input: unknown
};

/**
 * @description Corrects content of a string by remove blank spaces.
 * @param {CorrectStringProps} data Supports following keys:
 *  - String defaultValue: The value to use as default.
 *  - Unknown input: The value to treat as a string.
 * @function correctString
 * @type {T}
 * @public
 * @returns {T}
 */
function correctString<T> (
  {defaultValue = '', input}: CorrectStringProps
): T {
  // Sends corrected shape of passed input.
  return (
    typeof input === "string" ? (input.trim() as T) : (defaultValue as T)
  );
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {correctString};
