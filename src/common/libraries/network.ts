/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Provides common methods to listen network state.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-09-23
 * @updated 2025-09-23
 * @file network.ts
 * @version 0.0.1
 */

// Plugin dependencies.
import i18next from "i18next";

// Custom dependencies.
import {showToast, ToastType} from "@/common/libraries/toast.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";

// Types.
type CheckNetworkStateProps = {verbose?: boolean, state: boolean};

/**
 * @description Checks whether browser is offline or online.
 * @function checkNetworkOfflineAndOnlineStates
 * @type {void}
 * @public
 * @returns {void}
 */
function checkNetworkOfflineAndOnlineStates (): void {
	// Displays a toaster whether needed.
	checkNetworkState({state: window.navigator.onLine});
}

/**
 * @description Listens network state mutation.
 * @function listenNetworkState
 * @type {void}
 * @public
 * @returns {void}
 */
function listenNetworkState (): void {
	// Destroys old callback from `offline` event.
	window.removeEventListener("offline", checkNetworkOfflineAndOnlineStates);
	// Destroys old callback from `offline` event.
	window.removeEventListener("online", checkNetworkOfflineAndOnlineStates);
	// Listens `offline` event.
	window.addEventListener("offline", checkNetworkOfflineAndOnlineStates);
	// Listens `online` event.
	window.addEventListener("online", checkNetworkOfflineAndOnlineStates);
	// Whether browser is offline.
	if (!window.navigator.onLine) checkNetworkState({state: false});
}

/**
 * @description Checks whether browser is offline or not.
 * @param {CheckNetworkStateProps} data Supports following keys:
 * 	- Boolean verbose: Do you want to show success message ?
 * 	- Boolean state: The current network state.
 * @function checkNetworkState
 * @type {boolean}
 * @public
 * @returns {boolean}
 */
function checkNetworkState (
	{verbose, state}: CheckNetworkStateProps
): boolean {
	// Applies a default value.
	verbose = (typeof verbose === "boolean" ? verbose : true);
	// Whether navigator is offline.
	if (!state) showToast({
		message: i18next.t(`${GLOBAL_LANG}:networkOff`),
		title: i18next.t(`${GLOBAL_LANG}:networkError`),
		type: ToastType.ERROR
	});
	// Otherwise.
 	else if (verbose) showToast({
		message: i18next.t(`${GLOBAL_LANG}:networkOn`),
		type: ToastType.SUCCESS
	});
	// Sends received state.
	return state;
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {
	checkNetworkOfflineAndOnlineStates,
	listenNetworkState,
	checkNetworkState
};
