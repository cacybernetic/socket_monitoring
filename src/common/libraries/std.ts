/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Defines most common methods used.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-23
 * @version 0.0.2
 * @file std.ts
 */

// Types.
type JSObject = {[key: string]: unknown};
type LogProps = {
  emoji?: (string | null),
  color?: (string | null),
  tag?: (string | null),
  input: unknown
};

/**
 * @description Prints an information log inside browser native console.
 * @param {unknown} input The content to be printed.
 * @param {?(undefined|string)} tag The printed out label reference.
 * @function logInformation
 * @type {void}
 * @public
 * @returns {void}
 */
function logInformation (input: unknown, tag?: (string | null)): void {
  // Makes a log to printed out message.
  log({emoji: "ℹ️ ", input, tag});
}

/**
 * @description Prints a warning log inside browser native console.
 * @param {unknown} input The content to be printed.
 * @param {?(undefined|string)} tag The printed out label reference.
 * @function logWarning
 * @type {void}
 * @public
 * @returns {void}
 */
function logWarning (input: unknown, tag?: (string | null)): void {
  // Makes a log to printed out message.
  log({color: "yellow", emoji: "⚠️ ", input, tag});
}

/**
 * @description Prints a success log inside browser native console.
 * @param {unknown} input The content to be printed.
 * @param {?(undefined|string)} tag The printed out label reference.
 * @function logSuccess
 * @type {void}
 * @public
 * @returns {void}
 */
function logSuccess (input: unknown, tag?: (string | null)): void {
  // Makes a log to printed out message.
  log({color: "green", emoji: "✅ ", input, tag});
}

/**
 * @description Prints an error log inside browser native console.
 * @param {unknown} input The content to be printed.
 * @param {?(undefined|string)} tag The printed out label reference.
 * @function logError
 * @type {void}
 * @public
 * @returns {void}
 */
function logError (input: unknown, tag?: (string | null)): void {
  // Makes a log to printed out message.
  log({color: "red", emoji: "❌ ", input, tag});
}

/**
 * @description Returns current browser window.
 * @function getWindow
 * @type {?Window}
 * @public
 * @returns {?Window}
 */
function getWindow (): ((Window & typeof globalThis) | null) {
  // Tries to send current window object reference.
  return (typeof window !== "undefined" ? window : null);
}

/**
 * @description Prints a log inside browser native console.
 * @param {LogProps} configs The log configuration data.
 * @function log
 * @type {void}
 * @public
 * @returns {void}
 */
function log ({color = "white", emoji, input, tag}: LogProps): void {
  // Whether project is under production.
  if (import.meta.env.MODE !== "development") return;
  // The color to be applied.
  const colorTag: string = `color:${color};`;
  // Whether tag is defined.
  if (tag != null) console.log(`%c${emoji}${tag} :\n${(input)}`, colorTag);
  // Otherwise.
  else console.log(`%c${emoji}${input}`, colorTag);
}

/**
 * @description Loads a form data from browser local storage.
 * @param {string} key The form access key.
 * @function loadFormData
 * @type {?T}
 * @public
 * @returns {?T}
 */
function loadFormData<T> (key: string): (null | T) {
	// Gets saved data of form.
	let data: (string | null) = window.localStorage.getItem(key);
	// Whether we have something.
	if (typeof data === "string") {
		// Let's trim any blank spaces.
		data = data.trim();
		// Whether it's an empty string.
		if (data.length > 0) return JSON.parse(data);
	}
	// Nothing to send.
	return null;
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {
  logInformation,
  loadFormData,
  logWarning,
  logSuccess,
  getWindow,
  logError,
  JSObject,
  log
};
