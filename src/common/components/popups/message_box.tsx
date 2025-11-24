/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview The message box component.
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @file message_box.tsx
 * @created 2025-11-13
 * @updated 2025-11-23
 * @version 0.0.2
 */

// React dependencies.
import {CiCircleCheck, CiCircleInfo, CiWarning} from "react-icons/ci";
import {MdErrorOutline} from "react-icons/md";
import {
	useImperativeHandle,
	ForwardedRef,
	ReactElement,
	forwardRef
} from "react";

// Plugin dependencies.
import {useTranslation} from "react-i18next";
import {Dispatch} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

// Chakra dependencies.
import {
	useDisclosure,
	ButtonProps,
	CloseButton,
	IconProps,
	Button,
	Dialog,
	Portal,
	Text,
	Icon,
	Box
} from "@chakra-ui/react";

// Custom dependencies.
import {correctString} from "@/common/libraries/string.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {
	SF_REGULAR,
	SF_MEDIUM,
	SF_BOLD
} from "@/common/constants/variables.ts";
import {
	dismissable,
	MessageType,
	setDetails,
	setMessage,
	setOptions,
	setTitle,
	setType,
	close
} from "@/common/states/alert.ts";

// Component properties.
export interface MessageBoxProps {
	onOptionPressed?: (index: number) => void,
	options?: Array<ButtonOption>,
	type: (MessageType | string),
	onDialogClosed?: () => void,
	details?: (string | null),
	message?: (string | null),
	title?: (string | null),
	isDisplayed?: boolean,
	closable?: boolean
}

// Component types.
export type MessageBoxFeatures = {
	isVisible: () => boolean,
	close: () => void,
	show: () => void
};
export type ButtonOption = {
	buttonStyle?: (option?: ButtonOption) => (ButtonProps | null),
	onClick?: (index?: number) => void,
	rightIcon?: (ReactElement | null),
	leftIcon?: (ReactElement | null),
	text?: (string | null),
	disabled?: boolean,
	primary?: boolean
};

// The message box component.
export default forwardRef(function MessageBox (
	{
		onOptionPressed,
		onDialogClosed,
		isDisplayed,
		closable,
		message,
		options,
		details,
		title,
		type
	}: MessageBoxProps,
	ref: ForwardedRef<MessageBoxFeatures>
) {
	// Attributes.
	const {onClose, onOpen, open} = useDisclosure({open: isDisplayed});
	const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
	message = correctString<string>({input: message});
	details = correctString<string>({input: details});
	title = correctString<string>({input: title});
	const dispatch: Dispatch = useDispatch();
	const commonIconStyle: IconProps = {
		height: {base: 6, sm: 7, md: 8},
		width: {base: 6, sm: 7, md: 8},
		transition: "all .2s"
	};

	// Called when an option has been clicked.
	const onOptionClicked = (
		callback?: (index?: number) => void,
		disabled?: boolean, index?: number
	): void => {
		// Whether that button is enabled.
		if (!disabled) {
			// Calls given function.
			if (typeof callback === "function") callback(index);
			// Closes displayed message box.
			onClosed();
			// Whether `onOptionPressed` is listening.
			if (typeof onOptionPressed === "function") {
				// Throws `optionPressed` event.
				onOptionPressed(index ?? -1);
			}
		}
	};

	// Called when message box comes to be closed.
	const onClosed = (): void => {
		// Throws `dialogClosed` event.
		if (typeof onDialogClosed === "function") onDialogClosed();
		// Resets type.
		dispatch(setType(MessageType.NONE));
		// Resets closable.
		dispatch(dismissable(true));
		// Resets message.
		dispatch(setMessage(''));
		// Resets details.
		dispatch(setDetails(''));
		// Resets options.
		dispatch(setOptions([]));
		// Resets title.
		dispatch(setTitle(''));
		// Sets display state.
		dispatch(close());
		// Closes message box.
		onClose();
	};

	// Builds right icon to used according to type.
	const buildIcon = (type: (MessageType | string)): ReactElement => {
		// Listens message type.
		switch(type) {
			// Information message is used.
			case MessageType.INFORMATION: return <Icon
				{...commonIconStyle}
				color = "primary.600"
				as = {CiCircleInfo}
			/>
			// Warning message is used.
			case MessageType.WARNING: return <Icon
				{...commonIconStyle}
				color = "warning.600"
				as = {CiWarning}
			/>
			// Success message is used.
			case MessageType.SUCCESS: return <Icon
				{...commonIconStyle}
				color = "success.600"
				as = {CiCircleCheck}
			/>
			// Error message is used.
			case MessageType.ERROR: return <Icon
				{...commonIconStyle}
				as = {MdErrorOutline}
				color = "error.600"
			/>
			// Otherwise.
			default: return <></>;
		}
	};

	// Customizes instance value that is exposed to parent component.
	useImperativeHandle(ref, (): MessageBoxFeatures => {
		// Returns final result.
		return {isVisible: (): boolean => open, close: onClosed, show: onOpen};
	});

	// Builds tsx code.
	return message.length > 0 && <Dialog.Root
		motionPreset = "slide-in-top"
		onOpenChange = {onClosed}
		closeOnInteractOutside
		placement = "center"
		open = {open}
		closeOnEscape
	>
		{/** Main container */}
		<Portal>
			{/** Draws black overlay container */}
			<Dialog.Backdrop/>
			{/** Dialog position */}
			<Dialog.Positioner>
				{/** Content */}
				<Dialog.Content
					width = {{base: 256, sm: 350, md: 450, lg: 550}}
					fontSize = {{base: 12, sm: 13, md: 14}}
					fontFamily = {SF_REGULAR}
					transition = "all .2s"
					color = "neutral.10"
					userSelect = "none"
				>
					{/** Header */}
					{title.length > 0 && <Dialog.Header
						display = "inline-flex"
						alignItems = "center"
						columnGap = {2}
					>
						{/** Gets right icon regardless message type */}
						{buildIcon(type)}
						{/** Title */}
						<Dialog.Title
							fontSize = {{base: 14, sm: 15, md: 16}}
							transition = "all .2s"
							fontFamily = {SF_BOLD}
						>{title}</Dialog.Title>
					</Dialog.Header>}
					{/** Closer button */}
					{closable && <Dialog.CloseTrigger asChild>
						<CloseButton
							size = {{base: "sm", md: "md"}}
							onClick = {onClosed}
							outline = "none"
						/>
					</Dialog.CloseTrigger>}
					{/** Body */}
					<Dialog.Body>
						{/** Message */}
						<Text dangerouslySetInnerHTML = {{__html: message}}/>
						{/** Details section */}
						{details.length > 0 && <Box marginTop = {3}>
							{/** Details content */}
							<details>
								{/** Title */}
								<summary style = {{outline: "none"}}>
									<Text as = "span">{t("moreDetails")}</Text>
								</summary>
								{/** Details */}
								<Text dangerouslySetInnerHTML = {{__html: details}}/>
							</details>
						</Box>}
					</Dialog.Body>
					{/** Footer */}
					{Array.isArray(options) && <Dialog.Footer
						flexDirection = {{base: "column", sm: "row"}}
						paddingBottom = {6}
						display = "flex"
						gap = {4}
					>
						{/** Drawing options */}
						{options.map((
							{
								buttonStyle,
								rightIcon,
								leftIcon,
								disabled,
								primary,
								onClick,
								text
							}: ButtonOption,
							index: number
						): ReactElement => <Dialog.ActionTrigger key = {index} asChild>
							{/** Trigger button */}
							<Button
								cursor = {disabled ? "not-allowed" : "pointer"}
								fontSize = {{base: 12, sm: 13, md: 14}}
								width = {{base: "100%", sm: "auto"}}
								fontFamily = {SF_MEDIUM}
								transition = "all .2s"
								disabled = {disabled}
								borderRadius = {3}
								borderWidth = {1}
								outline = "none"
								onClick = {(): void => onOptionClicked(
									onClick, disabled, index
								)}
								backgroundColor = {
									disabled ? "neutral.4" :
									(primary ? "primary.900" : "neutral.1")
								}
								borderColor = { 
									primary ? "transparent" :
									(disabled ? "neutral.6" : "neutral.9")
								}
								color = {
									disabled ? "neutral.6" :
									(primary ? "neutral.1" : "neutral.9")
								}
								padding = {{
									base: "14px 10px 14px 10px",
									sm: "16px 12px 16px 12px",
									md: "18px 14px 18px 14px"
								}}
								_hover = {{
									borderColor: (
										primary ? "transparent" :
										(disabled ? "neutral.6" : "primary.600")
									),
									color: (
										disabled ? "neutral.6" :
										(primary ? "neutral.1" : "primary.600")
									),
									backgroundColor: (
										disabled ? "neutral.4" :
										(primary ? "primary.600" : "neutral.2")
									)
								}}
								{...function () {
									return (
										typeof buttonStyle === "function" ?
										buttonStyle({
											buttonStyle, rightIcon,
											leftIcon, disabled,
											primary, onClick,
											text
										}) : {}
									);
								}()}
							>{leftIcon}{text}{rightIcon}</Button>
						</Dialog.ActionTrigger>)}
					</Dialog.Footer>}
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog.Root>;
});
