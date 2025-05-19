import React from "react";
import { type TextProps } from "react-native";
interface DropdownItemProps {
    item: any;
    index: number;
    currentValue: any;
    valueField: string | number | symbol;
    labelField: string | number | symbol;
    activeColor: string;
    itemContainerStyle?: any;
    itemTextStyle?: any;
    renderItem?: (item: any, selected: boolean) => React.ReactElement;
    onSelect: (item: any) => void;
    itemTestIDField?: string;
    accessibilityLabel?: string;
    itemAccessibilityLabelField?: string;
    itemTextProps?: TextProps;
}
export declare const DropdownItem: ({ item, index, currentValue, valueField, labelField, activeColor, itemContainerStyle, itemTextStyle, renderItem, onSelect, itemTestIDField, accessibilityLabel, itemAccessibilityLabelField, itemTextProps }: DropdownItemProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DropDownItem.d.ts.map