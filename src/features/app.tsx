/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @fileoverview The entry point of the application.
 * @author Obrymec - https://obrymec.vercel.app
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-13
 * @version 0.0.1
 * @file app.tsx
 */

// React dependencies.
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {RefObject, useEffect, useRef} from "react";

// Chakra dependencies.
import {Flex, Box} from "@chakra-ui/react";

// Plugin dependencies.
import {useSelector} from "react-redux";

// Custom dependencies.
import {listenNetworkState} from "@/common/libraries/network.ts";
import Toaster from "@/common/components/feedbacks/toaster.tsx";
import {HOME_LINK} from "@/common/constants/end_points.ts";
import {MessageType} from "@/common/states/alert.ts";
import {RootState} from "@/common/states/store.ts";
import Home from "@/features/home.tsx";
import {
	listenWindowResizeToExtractHisSize
} from "@/common/libraries/browser.ts";
import MessageBox, {
	MessageBoxFeatures,
	ButtonOption
} from "@/common/components/popups/message_box.tsx";
import {
	SCROLL_BOTTOM_ID,
	SCROLL_TOP_ID,
	SF_REGULAR
} from "@/common/constants/variables.ts";

// The entry point of application.
export default function App () {
	// Attributes.
	const messageBox: RefObject<MessageBoxFeatures> = useRef(null);
	const onOptionPressed: (() => void) = useSelector(
		(state: RootState): (() => void) => state.alert.onOptionPressed
	);
	const onDialogClosed: (() => void) = useSelector(
		(state: RootState): (() => void) => state.alert.onDialogClosed
	);
	const options: Array<ButtonOption> = useSelector(
		(state: RootState): Array<ButtonOption> => state.alert.options
	);
	const isDisplayed: boolean = useSelector(
		(state: RootState): boolean => state.alert.isDisplayed
	);
	const type: MessageType = useSelector(
		(state: RootState): MessageType => state.alert.type
	);
	const closable: boolean = useSelector(
		(state: RootState): boolean => state.alert.closable
	);
	const message: string = useSelector(
		(state: RootState): string => state.alert.message
	);
	const details: string = useSelector(
		(state: RootState): string => state.alert.details
	);
	const title: string = useSelector(
		(state: RootState): string => state.alert.title
	);

	// Whether application is ready.
	useEffect((): void => {
		// Listens window size mutation.
		listenWindowResizeToExtractHisSize();
		// Listens network state mutation.
		listenNetworkState();
		// Whether we must display the global message box.
		if (isDisplayed) messageBox.current?.show();
		// Otherwise, destroys it.
		else messageBox.current?.close();
	// Dependencies.
	}, [isDisplayed]);

  // Builds tsx code.
	return <Flex
		fontSize = {{base: 12, sm: 13, md: 14}}
		backgroundColor = "neutral.3"
		fontFamily = {SF_REGULAR}
		transition = "all .2s"
		direction = "column"
		overflowX = "hidden"
		color = "neutral.10"
		userSelect = "none"
		overflowY = "auto"
		position = "fixed"
		as = "section"
		bottom = {0}
		right = {0}
		left = {0}
		top = {0}
	>
		{/** Scroll helper top target */}
		<Box id = {SCROLL_TOP_ID.split('#')[1]}/>
		{/** Mutable section */}
		<Router future = {{v7_startTransition: true}}>
			{/** Available routes */}
			<Routes>
				{/** Home view */}
				<Route element = {<Home/>} path = {HOME_LINK}/>
			</Routes>
		</Router>	
		{/** Scroll helper bottom target */}
		<Box id = {SCROLL_BOTTOM_ID.split('#')[1]}/>
		{/** Global toaster */}
		<Toaster/>
		{/** Global message box */}
		<MessageBox
			onOptionPressed = {onOptionPressed}
			onDialogClosed = {onDialogClosed}
			isDisplayed = {isDisplayed}
			closable = {closable}
			message = {message}
			details = {details}
			options = {options}
			ref = {messageBox}
			title = {title}
			type = {type}
		/>
	</Flex>;
}
