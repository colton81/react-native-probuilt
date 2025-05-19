import React from "react";
import { type StyleProp, type ViewStyle } from "react-native";
type DropDownPosition = {
    isFull: boolean;
    width: number;
    height: number;
    top: number;
    bottom: number;
    left: number;
};
/**
 * A separate modal component for the Dropdown
 */
type DropdownModalProps = {
    visible: boolean;
    position: DropDownPosition | null;
    onClose: () => void;
    renderContent: (isTopPosition: boolean) => React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    keyboardHeight: number;
    keyboardAvoiding: boolean;
    dropdownPosition: "auto" | "top" | "bottom";
    maxHeight: number;
    minHeight: number;
    backgroundColor?: string;
    listData: any[];
    styleContainerVertical?: ViewStyle;
    styleHorizontal?: ViewStyle;
    opacity?: number;
};
export declare const DropdownModal: React.MemoExoticComponent<({ visible, position, onClose, renderContent, containerStyle, keyboardHeight, keyboardAvoiding, dropdownPosition, maxHeight, minHeight, backgroundColor, listData, styleContainerVertical, styleHorizontal, opacity }: DropdownModalProps) => import("react/jsx-runtime").JSX.Element | null>;
export {};
//# sourceMappingURL=DropDownModal.d.ts.map