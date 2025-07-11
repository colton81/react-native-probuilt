"use strict";

/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from "react";
import { TextInput as RNTextInput, TouchableOpacity, View, TouchableWithoutFeedback, StyleSheet, I18nManager } from "react-native";
import { CircleX } from "../../icons/CircleX.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TextInput = props => {
  const {
    fontFamily,
    style,
    value,
    placeholderTextColor = "#000",
    placeholder = "",
    showIcon,
    inputStyle,
    iconStyle,
    onChangeText = _value => {},
    renderLeftIcon,
    renderRightIcon
  } = props;
  const [text, setText] = useState("");
  useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);
  const onChange = text => {
    setText(text);
    onChangeText(text);
  };
  const _renderRightIcon = () => {
    if (showIcon) {
      if (renderRightIcon) {
        return renderRightIcon();
      }
      if (text.length > 0) {
        return /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: () => onChange(""),
          children: /*#__PURE__*/_jsx(CircleX, {
            width: 20,
            height: 20,
            style: [{
              width: 20,
              height: 20
            }, iconStyle]
          })
        });
      }
      return null;
    }
    return null;
  };
  const font = () => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily
      };
    } else {
      return {};
    }
  };
  return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
    children: /*#__PURE__*/_jsx(View, {
      style: [style],
      children: /*#__PURE__*/_jsxs(View, {
        style: {
          flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
          alignItems: "center",
          flex: 1
        },
        children: [renderLeftIcon?.(), /*#__PURE__*/_jsx(RNTextInput, {
          ...props,
          style: StyleSheet.flatten([{
            fontSize: 16,
            flex: 1,
            textAlign: I18nManager.isRTL ? "right" : "left"
          }, inputStyle, font()]),
          value: text,
          placeholder: placeholder,
          placeholderTextColor: placeholderTextColor,
          onChangeText: onChange
        }), _renderRightIcon()]
      })
    })
  });
};
//# sourceMappingURL=index.js.map