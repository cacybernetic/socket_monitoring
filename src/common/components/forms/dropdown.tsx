/**
 * @organization Console Art Cybernetic - https://cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview The dropdown component.
 * @stack Vite + React + Typescript
 * @supported DESKTOP, MOBILE
 * @created 2025-11-13
 * @updated 2025-11-14
 * @file dropdown.tsx
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement, RefObject, Fragment, useRef} from "react";
import {IoIosHelpCircleOutline} from "react-icons/io";

// Plugin dependencies.
import {useSelector} from "react-redux";

// Chakra dependencies.
import {
	SelectClearTriggerProps,
	SelectPositionerProps,
	createListCollection,
	SelectValueTextProps,
	SelectIndicatorProps,
	SelectContentProps,
	SelectTriggerProps,
	SelectLabelProps,
	SelectRootProps,
	SelectItemProps,
	ListCollection,
	IconProps,
	TextProps,
	Select,
	Text,
	Icon
} from "@chakra-ui/react";

// Custom dependencies.
import {correctString} from "@/common/libraries/string.ts";
import {SF_REGULAR} from "@/common/constants/variables.ts";
import {RootState} from "@/common/states/store.ts";
import Tooltip, {
	TooltipProps
} from "@/common/components/feedbacks/tooltip.tsx";

// Component properties.
interface DropdownProps<T> {
	rootSelectStyle?: (options: ListCollection) => (SelectRootProps | null),
	optionCheckIconStyle?: (SelectIndicatorProps | null),
	optionsContainerStyle?: (SelectContentProps | null),
	indicatorGroupStyle?: (SelectIndicatorProps | null),
	downArrowIconStyle?: (SelectIndicatorProps | null),
	selectedTextStyle?: (SelectValueTextProps | null),
	clearIconStyle?: (SelectClearTriggerProps | null),
	positionerStyle?: (SelectPositionerProps | null),
	triggerStyle?: (SelectTriggerProps | null),
	onChange?: (data: DropdownData<T>) => void,
	headerStyle?: (SelectLabelProps | null),
	tooltipStyle?: (TooltipProps | null),
	itemStyle?: (SelectItemProps | null),
	labelTextStyle?: (TextProps | null),
	helpIconStyle?: (IconProps | null),
	placeholderText?: (string | null),
	options: Array<DropdownData<T>>,
	helpText?: (string | null),
	label?: (string | null),
	value?: (string | null),
	clearable?: boolean,
	disabled?: boolean
}

// Component types.
export type DropdownData<T> = {
	value?: (string | null),
	key?: (string | null),
	payload?: (null | T)
};

// The dropdown component.
export default function Dropdown<T> ({
	optionsContainerStyle,
	optionCheckIconStyle,
	indicatorGroupStyle,
	downArrowIconStyle,
	selectedTextStyle,
	rootSelectStyle,
	positionerStyle,
	placeholderText,
	clearIconStyle,
	labelTextStyle,
	helpIconStyle,
	triggerStyle,
	tooltipStyle,
	headerStyle,
	itemStyle,
	clearable,
	onChange,
	helpText,
	disabled,
	options,
	value,
	label
}: DropdownProps<T>) {
	// Attributes.
	placeholderText = correctString<string>({input: placeholderText});
	const select: RefObject<HTMLSelectElement> = useRef(null);
	helpText = correctString<string>({input: helpText});
	label = correctString<string>({input: label});
	value = correctString<string>({input: value});
	const isOnGoing: boolean = useSelector(
		(state: RootState): boolean => state.app.isOnGoing
	);
	
	// Whether button is really disabled.
	const isDisabled = ((): boolean => (disabled || isOnGoing));

	// Called when any value has been change on dropdown.
	const onValueChanged = (worth: string): void => {
		// Throws `change` event with right option.
		if (typeof onChange === "function") onChange({
			key: (searchOption(worth)?.textContent ?? ''),
			value: worth,
			...(
				(select.current != null && select.current.selectedIndex > -1) ?
				{payload: options[select.current.selectedIndex].payload} : {}
			)
		});
	};

	// Searches right option that has given value.
	const searchOption = (worth?: (string | null)): (HTMLElement | null) => {
		// The found html element.
		let foundHTMLElement: (HTMLElement | null) = null;
		// Overrides input value.
		if (typeof worth === "string" && select.current != null) {
			// Searching right option to select.
			for (const child of select.current.children) {
				// Whether we found that option.
				if (
					child.getAttribute("value") === worth ||
					child.textContent === worth ||
					child.innerHTML === worth
				) {
					// Gets it.
					foundHTMLElement = (child as HTMLElement);
					// Selects found option.
					child.setAttribute("selected", "true");
				// Otherwise.
				} else child.removeAttribute("selected");
			}
		}
		// Nothing found.
		return foundHTMLElement;
	};

	// Builds tsx code.
	return <Select.Root
		_hover = {{borderColor: "primary.500", color: "primary.500"}}
		defaultValue = {value.length > 0 ? [value] : undefined}
		collection = {createListCollection({items: options})}
		id = {Math.floor(Math.random() * 1000000).toString()}
		fontSize = {{base: 12, sm: 13, md: 14}}
		backgroundColor = "neutral.1"
		fontFamily = {SF_REGULAR}
		disabled = {isDisabled()}
		transition = "all .2s"
		color = "neutral.10"
		userSelect = "none"
		borderRadius = {0}
		width = "100%"
		_focus = {{
			boxShadow: "0 0 3px var(--chakra-colors-primary-500)",
			borderColor: "primary.500",
			color: "primary.500"
		}}
		_disabled = {{
			backgroundColor: "neutral.2",
			borderColor: "neutral.6",
			cursor: "not-allowed",
			color: "neutral.7",
			boxShadow: "none"
		}}
		{...rootSelectStyle?.(createListCollection({items: options}))}
	>
		{/** Native select markup */}
		<Select.HiddenSelect
			onChange = {(e): void => onValueChanged(e.target.value)}
			ref = {select}
		/>
		{/** Header */}
		{
			label.length > 0 &&
			<Select.Label
				display = "inline-flex"
				alignItems = "center"
				columnGap = "4px"
				{...headerStyle}
			>
				{/** Label */}
				<Text {...labelTextStyle}>{label}</Text>
				{/** Helper */}
				{helpText.length > 0 && <Tooltip
					positioning = {{placement: "top"}}
					contentProps = {{padding: 3}}
					content = {helpText}
					showArrow
					{...tooltipStyle}
				>
					{/** Help icon */}
					<Icon
						as = {IoIosHelpCircleOutline}
						height = {{base: 4, md: 5}}
						width = {{base: 4, md: 5}}
						transition = "all .2s"
						color = "primary.400"
						{...helpIconStyle}
					/>
				</Tooltip>}
			</Select.Label>
		}
		{/** Controllers */}
		<Select.Control>
			{/** Simple text */}
			<Select.Trigger cursor = "pointer" {...triggerStyle}>
				{/** Selected option */}
				<Select.ValueText
					fontSize = {{base: 12, sm: 13, md: 14}}
					placeholder = {placeholderText}
					transition = "all .2s"
					{...selectedTextStyle}
				/>
			</Select.Trigger>
			{/** Indicators */}
			<Select.IndicatorGroup {...indicatorGroupStyle}>
				{/** Down arrow icon */}
				<Select.Indicator {...downArrowIconStyle}/>
				{/** Clear icon */}
				{clearable && <Select.ClearTrigger
					cursor = "pointer" {...clearIconStyle}
				/>}
    	</Select.IndicatorGroup>
		</Select.Control>
		{/** Available options */}
		<Select.Positioner {...positionerStyle}>
			{/** Main content */}
			<Select.Content {...optionsContainerStyle}>
				{/** Drawing passed options */}
				{options.map(
					({value, key}: DropdownData<T>, index: number): ReactElement => (
						<Select.Item
							cursor = "pointer"
							{...itemStyle}
							item = {value}
							key = {index}
						>
							{/** Textual content */}
							<Fragment>{key}</Fragment>
							{/** Checked icon */}
							<Select.ItemIndicator {...optionCheckIconStyle}/>
						</Select.Item>
					)
				)}
			</Select.Content>
		</Select.Positioner>
	</Select.Root>;
}
