/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Defines input component.
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-24
 * @file input.tsx
 * @version 0.0.2
 */

// React dependencies.
import {
	KeyboardEventHandler,
	ChangeEventHandler,
	useEffect,
	RefObject,
	useState,
	useRef
} from "react";

// Chakra dependencies.
import {
	InputProps,
	TextProps,
	BoxProps,
	Text,
	Flex,
	Box
} from "@chakra-ui/react";

// Custom dependencies.
import {correctString} from "@/common/libraries/string.ts";
import {SF_REGULAR} from "@/common/constants/variables.ts";

// Component property.
export interface TextFieldProps {
	onKeyDown?: (event?: KeyboardEvent) => void,
	onChange?: (value: string) => void,
	containerStyle?: (BoxProps | null),
	fieldStyle?: (InputProps | null),
	errorStyle?: (TextProps | null),
	labelStyle?: (BoxProps | null),
	label?: (string | null),
	value?: (string | null),
	error?: (string | null),
	mandatory?: boolean,
	disabled?: boolean
}

// Builds input component.
export default function TextField ({
	containerStyle,
	labelStyle,
	errorStyle,
	fieldStyle,
	mandatory,
	onKeyDown,
	onChange,
	disabled,
	value,
	error,
	label
}: TextFieldProps) {
	// Attributes.
	const input: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
	const [isFocused, focus] = useState<boolean>(false);
	label = correctString<string>({input: label});
	value = correctString<string>({input: value});
	error = correctString<string>({input: error});

	// Called all time when input value gets changed.
	const handleChange: ChangeEventHandler<HTMLInputElement> = (
		(event): void => {
			// Called when `change` event is listening.
			if (typeof onChange === "function") onChange(event.target.value);
		}
	);

	// Called when a key is pressed while input has focus.
	const onKeyPressed: KeyboardEventHandler<HTMLElement> = (
		(event): void => {
			// Whether `keydown` event is listening on input.
			if (typeof onKeyDown === "function") onKeyDown(
				event as unknown as KeyboardEvent
			);
		}
	);

	// Generates common style for main input properties.
	const generateCommonStyle = (
		color: string = "primary.800"
	): BoxProps => ({
		backgroundColor: (disabled ? "neutral.4" : "neutral.1"),
		color: (
			disabled ? "neutral.7" :
			(error.length ? "error.500" : (isFocused ? color : "neutral.10"))
		),
		borderColor: (
			disabled ? "neutral.5" :
			(
				error.length ? "error.500" :
				(isFocused ? "primary.600" : "neutral.6")
			)
		)
	});

	// When component is rendered.
	useEffect((): void => {
		// Overrides input value.
		if (input.current != null) input.current.value = value;
	// Dependencies.
	}, [value]);

	// Builds tsx code.
	return <Box
		fontSize = {{base: 12, sm: 13, md: 14}}
		fontFamily = {SF_REGULAR}
		transition = "all .2s"
		color = "neutral.10"
		userSelect = "none"
		width = "100%"
		{...containerStyle}
	>
		{/** Field */}
		<Flex
			transform = "translate3d(0, 0, 0)"
			backgroundColor = "neutral.1"
			width = "100%"
		>
			{/** Input */}
			<Box
				boxShadow = "inset 0 3px 6px var(--chakra-colors-neutral-5)"
				_hover = {{color: generateCommonStyle("primary.800").color}}
				paddingInline = {{base: ".6rem", sm: ".7rem", md: ".8rem"}}
				id = {Math.floor(Math.random() * 1000000).toString()}
				paddingTop = {label.length > 0 ? ".8rem" : ".4rem"}
				cursor = {disabled ? "not-allowed" : "auto"}
				userSelect = {disabled ? "none" : "auto"}
				onFocus = {(): void => focus(true)}
				onBlur = {(): void => focus(false)}
				{...generateCommonStyle()}
				onKeyDown = {onKeyPressed}
				onChange = {handleChange}
				paddingBottom = ".4rem"
				transition = "all .2s"
				disabled = {disabled}
				borderRadius = {6}
				borderWidth = {1}
				outline = "none"
				resize = "none"
				width = "100%"
				ref = {input}
				as = "input"
				{...fieldStyle}
			/>
			{/** Label */}
			{label.length > 0 && <Box
				left = {{base: ".6rem", sm: ".7rem", md: ".8rem"}}
				paddingBlock = {{base: .4, sm: .8, md: "1.5px"}}
				paddingInline = {{base: 1, sm: 1.5}}
				transform = "translateY(-60%)"
				{...generateCommonStyle()}
				pointerEvents = "none"
				transition = "all .2s"
				position = "absolute"
				borderRadius = {4}
				borderWidth = {1}
				zIndex = {1}
				{...labelStyle}
			>
				{/** Content */}
				{label}
				{mandatory && <Text color = "error.500" as = "span">*</Text>}
			</Box>}
		</Flex>
		{/** Error message */}
		{error.length > 0 && <Text
			dangerouslySetInnerHTML = {{__html: error}}
			fontSize = {{base: 12, sm: 13, md: 14}}
			transition = "all .2s"
			color = "error.500"
			marginLeft = {4}
			marginTop = {3}
			{...errorStyle}
		/>}
	</Box>;
}
