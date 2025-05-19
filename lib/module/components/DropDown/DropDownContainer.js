"use strict"

import _get from "lodash/get"
import { TouchableOpacity, View, Text, I18nManager } from "react-native"
import { ChevronDown } from "../../icons/ChevronDown.js"
import React, { forwardRef } from "react"
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime"
export const DropDownContainer = /*#__PURE__*/ forwardRef((props, ref) => {
  const isSelected =
    props.currentValue && _get(props.currentValue, props.valueField)
  return /*#__PURE__*/ _jsx(TouchableOpacity, {
    ref: ref,
    testID: props.testID,
    accessible: !!props.accessibilityLabel,
    accessibilityLabel: props.accessibilityLabel,
    onPress: props.showOrClose,
    children: /*#__PURE__*/ _jsxs(View, {
      ...props,
      style: [
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 45,
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 8,
          paddingLeft: 10,
          borderColor: "#676767",
          ...(props.style && typeof props.style === "object" ? props.style : {})
        },
        props.style
      ],
      children: [
        props.renderLeftIcon?.(props.visible),
        /*#__PURE__*/ _jsx(Text, {
          style: [
            {
              flex: 1,
              fontSize: 16,
              writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
              color: "#000"
            },
            isSelected !== null
              ? props.selectedTextStyle
              : props.placeholderStyle
          ],
          ...props.selectedTextProps,
          children:
            isSelected !== null
              ? _get(props.currentValue, props.labelField)
              : props.placeholder
        }),
        props.renderRightIcon
          ? props.renderRightIcon(props.visible)
          : /*#__PURE__*/ _jsx(ChevronDown, {
              color: props.iconColor,
              width: 20,
              height: 20
            })
      ]
    })
  })
})
//# sourceMappingURL=DropDownContainer.js.map
