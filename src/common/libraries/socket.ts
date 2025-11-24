/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview Provides common methods to listen network state.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-24
 * @file socket.ts
 * @version 0.0.3
 */

// Custom dependencies.
import {
	logInformation,
	logSuccess,
	logWarning,
	logError
} from "@/common/libraries/std.ts";
import {
	SOCKET_STATUS_5000,
	SOCKET_STATUS_4004,
	SOCKET_STATUS_4003,
	SOCKET_STATUS_4001,
	SOCKET_STATUS_4000
} from "@/common/constants/variables.ts";
import {
	showSocketConnectionLostMessage,
	showNotFoundRequestErrorMessage,
  showPermissionUnGrantedMessage,
	showAuthenticationErrorMessage,
  showBadRequestErrorMessage,
  showInternalErrorMessage,
	showRequestErrorMessage,
	MessageDisplayProps
} from "@/common/libraries/messages.ts";

// Enumerations.
enum FeedbackType {
	MESSAGE_BOX = "MESSAGE_BOX",
	TOAST = "TOAST",
	NONE = "NONE"
}
enum SocketStatus {
	CONNECTING = 0,
	CLOSING = 2,
	CLOSED = 3,
	OPEN = 1
}

// Types.
type SocketErrorMessageDisplay = {
	UIData?: MessageDisplayProps,
	status?: (number | null)
};
type SocketEvent<T> = (
	(
		(
			data?: (null | T),
			other?: (unknown | null),
			ref?: SocketManager<T>
		) => void
	) | null
);
type SocketProps<T> = {
	feedbackType?: (FeedbackType | null),
	protocols?: (string[] | string),
	onMessage?: SocketEvent<T>,
	onClose?: SocketEvent<T>,
	onError?: SocketEvent<T>,
	onOpen?: SocketEvent<T>,
	autoConnect?: boolean,
	url?: (string | null),
	verbose?: boolean
};

/**
 * @classdesc Manages socket requests.
 * @param {SocketProps} data It supports following keys:
 * 	- Function onMessage: Called when we receive a message from server.
 * 	- Function onClose: Called when socket connection has been lost.
 * 	- Function onError: Called when something wrong on running.
 * 	- String url: The link to connect to.
 * 	- Function onOpen: Called when socket connection successfully
 * 		established.
 * 	- String[] protocols: The protocols to be used before
 * 		establish a socket connection (Useful for secure socket).
 * 	- Boolean autoConnect: Whether we want to automatically
 *	 	establish connection when it looses.
 * 	- Feedback feedbackType: The feedback UI to use when
 *    any unexpected behaviour throws.
 * @type {SocketManager}
 * @public
 * @class
 * @returns {SocketManager}
 */
class SocketManager<T> {
	// Attributes.
	private protocols_: (undefined | string[] | string) = undefined;
	private feebackType_: FeedbackType = FeedbackType.TOAST;
	private warnOnSocketConnectionLost_: boolean = true;
	private socket_: (WebSocket | null) = null;
	private autoConnect_: boolean = true;
	private caches_: Array<string> = [];
	private onMessage_: SocketEvent<T>;
	private verbose_: boolean = false;
	private onClose_: SocketEvent<T>;
	private onError_: SocketEvent<T>;
	private onOpen_: SocketEvent<T>;
	private url_: string;

	/**
	 * @description Initializes event data and build it.
	 * @constructor
	 */
	constructor ({
		feedbackType,
		autoConnect,
		protocols,
		onMessage,
		verbose,
		onClose,
		onError,
		onOpen,
		url
	}: SocketProps<T>) {
		// Gets `message` event callback.
		this.onMessage_ = (typeof onMessage === "function" ? onMessage : null);
		// Gets `close` event callback.
		this.onClose_ = (typeof onClose === "function" ? onClose : null);
		// Gets `error` event callback.
		this.onError_ = (typeof onError === "function" ? onError : null);
		// Gets verbose state.
		this.verbose_ = (typeof verbose === "boolean" ? verbose : true);
		// Gets `open` event callback.
		this.onOpen_ = (typeof onOpen === "function" ? onOpen : null);
		// Gets web socket url connection.
		this.url_ = (typeof url === "string" ? url.trim() : '');
		// Gets `feedback` type.
		this.feebackType_ = (
			typeof feedbackType === "string" ? feedbackType : FeedbackType.TOAST
		);
		// Gets auto connection state.
		this.autoConnect_ = (
			typeof autoConnect === "boolean" ? autoConnect : true
		);
		// Gets protocols.
		this.protocols_ = (
			(typeof protocols === "string" || Array.isArray(protocols)) ?
			protocols : undefined
		);
		// Initializes socket manager.
		this.build_();
	}

	/**
	 * @description Overrides web socket connection lost warn state.
	 * @param {boolean} value The warn state.
	 * @function warnOnSocketConnectionLost
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public warnOnSocketConnectionLost (value: boolean): void {
		// Updates that value.
		this.warnOnSocketConnectionLost_ = value;
	}

	/**
	 * @description Returns web socket used protocols.
	 * @type {undefined|string[]|string}
	 * @function getProtocols
	 * @public
	 * @returns {undefined|string[]|string}
	 */
	public getProtocols (): (undefined | string[] | string) {
		// Sends that value.
		return this.protocols_;
	}

	/**
	 * @description Overrides web socket error messages UI type to be used.
	 * @param {FeedbackType} value The UI to be used to display messages.
	 * @function setFeebackType
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setFeebackType (value: FeedbackType): void {
		// Updates that value.
		this.feebackType_ = value;
	}

	/**
	 * @description Returns socket connection lost warn state.
	 * @function canWarnOnSocketConnectionLost
	 * @type {boolean}
	 * @public
	 * @returns {boolean}
	 */
	public canWarnOnSocketConnectionLost (): boolean {
		// Sends that value.
		return this.warnOnSocketConnectionLost_;
	}

	/**
	 * @description Returns active web socket connection instance.
	 * @function getSocketInstance
	 * @type {?WebSocket}
	 * @public
	 * @returns {?WebSocket}
	 */
	public getSocketInstance (): (WebSocket | null) {
		// Sends that value.
		return this.socket_;
	}

	/**
	 * @description Overrides auto connection state.
	 * @param {boolean} value The new value.
	 * @function autoConnection
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public autoConnection (value: boolean): void {
		// Updates that value.
		this.autoConnect_ = value;
	}

	/**
	 * @description Returns message event callback.
	 * @function getMessageCallback
	 * @type {SocketEvent}
	 * @public
	 * @returns {SocketEvent}
	 */
	public getMessageCallback (): SocketEvent<T> {
		// Sends that value.
		return this.onMessage_;
	}

	/**
	 * @description Returns close event callback.
	 * @function getCloseCallback
	 * @type {SocketEvent}
	 * @public
	 * @returns {SocketEvent}
	 */
	public getCloseCallback (): SocketEvent<T> {
		// Sends that value.
		return this.onClose_;
	}

	/**
	 * @description Returns error event callback.
	 * @function getErrorCallback
	 * @type {SocketEvent}
	 * @public
	 * @returns {SocketEvent}
	 */
	public getErrorCallback (): SocketEvent<T> {
		// Sends that value.
		return this.onError_;
	}

	/**
	 * @description Returns connection status.
	 * @type {undefined|number}
	 * @function getStatus
	 * @public
	 * @returns {undefined|number}
	 */
	public getStatus (): (undefined | number) {
		// Sends that value.
		return this.socket_?.readyState;
	}

	/**
	 * @description Returns open event callback.
	 * @function getOpenCallback
	 * @type {SocketEvent}
	 * @public
	 * @returns {SocketEvent}
	 */
	public getOpenCallback (): SocketEvent<T> {
		// Sends that value.
		return this.onOpen_;
	}

	/**
	 * @description Overrides verbose state.
	 * @param {boolean} value The new value.
	 * @function setVerbose
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setVerbose (value: boolean): void {
		// Updates that value.
		this.verbose_ = value;
	}

	/**
	 * @description Returns web socket used feedback type to show messages.
	 * @function getFeebackType
	 * @type {FeedbackType}
	 * @public
	 * @returns {FeedbackType}
	 */
	public getFeebackType (): FeedbackType {
		// Sends that value.
		return this.feebackType_;
	}

	/**
	 * @description Returns auto connection state.
	 * @function isAutoConnection
	 * @type {boolean}
	 * @public
	 * @returns {boolean}
	 */
	public isAutoConnection (): boolean {
		// Sends that value.
		return this.autoConnect_;
	}

	/**
	 * @description Returns verbose state.
	 * @function isVerbose
	 * @type {boolean}
	 * @public
	 * @returns {boolean}
	 */
	public isVerbose (): boolean {
		// Sends that value.
		return this.verbose_;
	}

	/**
	 * @description Returns connection link.
	 * @function getUrl
	 * @type {string}
	 * @public
	 * @returns {string}
	 */
	public getUrl (): string {
		// Sends that value.
		return this.url_;
	}

	/**
	 * @description Overrides web socket connection protocols.
	 * @param {undefined|string[]|string} value The connection protocols.
	 * @function setProtocols
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setProtocols (value?: (string[] | string)): void {
		// Updates that value.
		this.protocols_ = value;
		// Re-initializes web socket connection.
		this.init_();
	}

	/**
	 * @decription Builds and creates a socket manager.
	 * @private {function}
	 * @function build_
	 * @returns {void}
	 */
	private build_ (): void {
		// Initializes web socket connection.
		if (this.url_.startsWith("wss://") || this.url_.startsWith("ws://")) {
			// Creates a web socket connection.
			this.init_();
		// No url found or invalid url for web socket.
		} else logError("The url is undefined or invalid for web socket.");
	}

	/**
	 * @description Checks and parses a string.
	 * @param {string} text The string to parse.
	 * @function checkString_
	 * @private {function}
	 * @type {?string}
	 * @returns {?string}
	 */
	private checkString_ (text: string): (string | null) {
		// Trims blank spaces.
		text = text.trim();
		// Whether we detect a value.
		if (text.length > 0) return text;
		// Nothing to send.
		return null;
	}

	/**
	 * @description Re-establishes socket connection when it lost.
	 * @function reconnect_
	 * @private {function}
	 * @type {void}
	 * @returns {void}
	 */
	private reconnect_ (): void {
		// Whether auto reconnection is disallowed.
		if (!this.autoConnect_) return;
		// Makes an info about auto reconnection.
		if (this.verbose_) logInformation(
			`Reconnecting to web socket to this url: ${this.url_}`
		);
		// Re-initializes web socket connection.
		this.init_();
	}

	/**
	 * @description Overrides connection url.
	 * @param {string} value The new url.
	 * @function setUrl
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setUrl (value: string): void {
		// Gets real value.
		const parsed: (string | null) = this.checkString_(value);
		// Whether no value is detected.
		if (
			(!parsed?.startsWith("wss://") && !parsed?.startsWith("ws://")) ||
			parsed == null
		) return;
		// Updates socket link.
		this.url_ = parsed;
		// Creates a web socket connection.
		this.init_();
	}

	/**
	 * @description Overrides `message` event callback.
	 * @param {SocketEvent} value The new callback.
	 * @function setMessageCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setMessageCallback (value: SocketEvent<T>): void {
		// Updates that value.
		this.onMessage_ = value;
		// Whether socket instance is defined.
		if (this.socket_ == null) return;
		// Listens `message` event on web socket.
		this.socket_.onmessage = (event: MessageEvent): void => {
			// Gets received data.
			const data: T = (JSON.parse(event.data) as T);
			// Makes a warn about new received message.
			if (this.verbose_) logInformation(event.data, "A message is received");
			// Throws `message` event.
			if (this.onMessage_ != null) this.onMessage_(data, null, this);
		};
	}

	/**
	 * @decription Initializes and build a web socket.
	 * @private {function}
	 * @function init_
	 * @type {void}
	 * @returns {void}
	 */
	private init_ (): void {
		// Initializes a web socket.
		this.socket_ = new WebSocket(this.url_, this.protocols_);
		// Sets socket warn on disconnection.
		this.warnOnSocketConnectionLost(this.warnOnSocketConnectionLost_);
		// Sets message event callback.
		this.setMessageCallback(this.onMessage_);
		// Sets UI feedback type.
		this.setFeebackType(this.feebackType_);
		// Sets auto connection state.
		this.autoConnection(this.autoConnect_);
		// Sets close event callback.
		this.setCloseCallback(this.onClose_);
		// Sets error event callback.
		this.setErrorCallback(this.onError_);
		// Sets open event callback.
		this.setOpenCallback(this.onOpen_);
		// Sets verbose.
		this.setVerbose(this.verbose_);
	}

	/**
	 * @description Overrides `open` event callback.
	 * @param {SocketEvent} value The new callback.
	 * @function setOpenCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setOpenCallback (value: SocketEvent<T>): void {
		// Updates that value.
		this.onOpen_ = value;
		// Whether socket instance is defined.
		if (this.socket_ == null) return;
		// Listens `open` event on web socket.
		this.socket_.onopen = (event: Event): void => {
			// Makes a warn about connection.
			if (this.verbose_) logSuccess("Connection established!");
			// Throws `open` event.
			if (this.onOpen_ != null) this.onOpen_(null, event, this);
			// Whether socket connection isn't really opened.
			if (this.socket_?.readyState !== SocketStatus.OPEN) return;
			// Sends cached request(s).
			this.caches_.forEach(
				(request: string): void => this.socket_?.send(request)
			);
			// Clears caches.
			this.caches_ = [];
		};
	}

	/**
	 * @description Overrides `close` event callback.
	 * @param {SocketEvent} value The new callback where error will be sent.
	 * @function setCloseCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setCloseCallback (value: SocketEvent<T>): void {
		// Updates that value.
		this.onClose_ = value;
		// Whether socket instance is defined.
		if (this.socket_ == null) return;
		// Listens `close` event on web socket.
		this.socket_.onclose = (event: CloseEvent): void => {
			// Displays a message about connection closing.
			if (this.verbose_) logWarning("Connection closed!");
			// Whether we can execute callback.
			if (this.warnOnSocketConnectionLost_ && this.onClose_ != null) {
				// Whether we can display a message.
				if (FeedbackType.NONE !== this.feebackType_) {
					// Displays a message.
					showSocketConnectionLostMessage({
						useToast: (FeedbackType.TOAST === this.feebackType_),
						details: event.reason
					});
				}
				// Throws `close` event.
				this.onClose_(null, event, this);
			}
			// Tries to re-establish connection whether possible.
			this.reconnect_();
		};
	}

	/**
	 * @description Displays proper socket error message from response status.
	 * @param {SocketErrorMessageDisplay} configs The UI feedback data.
	 * @function displayProperSocketErrorMessage
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public displayProperSocketErrorMessage (
		{status, UIData}: SocketErrorMessageDisplay
	): void {
		// Unreachable resource.
		if (status === SOCKET_STATUS_4004) {
			// Displays a message.
			showNotFoundRequestErrorMessage(UIData);
		// Permission not granted.
		} else if (status === SOCKET_STATUS_4003) {
			// Displays a message.
			showPermissionUnGrantedMessage(UIData);
		// Authentication error.
		} else if (status === SOCKET_STATUS_4001) {
			// Displays a message.
			showAuthenticationErrorMessage(UIData);
		// Invalid JSON or missing required fields.
		} else if (status === SOCKET_STATUS_4000) {
			// Displays a message.
			showBadRequestErrorMessage(UIData);
		// Internal server error.
		} else if (status === SOCKET_STATUS_5000) {
			// Displays a message.
			showInternalErrorMessage(UIData);
		// Unknown error.
		} else showRequestErrorMessage(UIData);
	}

	/**
	 * @description Sends a message from client to back-end.
	 * @param {unknown} payload The data to be sent to server.
	 * @function emit
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public emit<V> (payload: V): void {
		// Whether passed payload is a valid object.
		if (
			typeof payload === "object" &&
			!Array.isArray(payload) &&
			payload !== undefined &&
			payload !== null
		) {
			// Whether socket connection instance is available.
			if (this.socket_ instanceof WebSocket) {
				// Converts payload into json.
				const json: string = JSON.stringify(payload);
				// Whether connect isn't opened.
				if (
					this.socket_.readyState === SocketStatus.CONNECTING ||
					this.socket_.readyState === SocketStatus.CLOSING ||
					this.socket_.readyState === SocketStatus.CLOSED
				// Keeps this request in catches.
				) this.caches_.push(json);
				// Sends given payload data to server.
				else this.socket_.send(json);
			// A web socket object instance isn't defined.
			} else throw new Error("The web socket instance is undefined.");
		// Invalid parameter, must be a javascript object instead.
		} else throw new Error(
			"Invalid payload data. Must be a javascript object."
		);
	}

	/**
	 * @description Overrides `error` event callback.
	 * @param {SocketEvent} value The new callback where error will be sent.
	 * @function setErrorCallback
	 * @type {void}
	 * @public
	 * @returns {void}
	 */
	public setErrorCallback (value: SocketEvent<T>): void {
		// Updates that value.
		this.onError_ = value;
		// Whether socket instance is defined.
		if (this.socket_ == null) return;
		// Listens `error` event on web socket.
		this.socket_.onerror = (error: Event): void => {
			// Whether no error throw between opening and during exchanges.
			if (
				this.socket_?.readyState === SocketStatus.CLOSING ||
				this.socket_?.readyState === SocketStatus.CLOSED
			) return;
			// Displays a connection error message.
			if (this.verbose_) logError(error.type, "Connection error");
			// Throws `error` event.
			if (this.onError_ != null) this.onError_(null, error, this);
			// Closes connection.
			this.socket_?.close();
			// Whether message feedback isn't allowed.
			if (
				FeedbackType.NONE === this.feebackType_ ||
				!this.warnOnSocketConnectionLost_
			) return;
			// Displays a message.
			showRequestErrorMessage({
				useToast: (FeedbackType.TOAST === this.feebackType_),
				details: error.type
			});
		};
	}
}

/**
 * @description Exports only public features.
 * @exports *
 */
export {SocketManager, SocketStatus, FeedbackType};
