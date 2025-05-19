"use strict";

/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import { jsx as _jsx } from "react/jsx-runtime";
export const DropdownItem = ({
  item,
  index,
  currentValue,
  valueField,
  labelField,
  activeColor,
  itemContainerStyle,
  itemTextStyle,
  renderItem,
  onSelect,
  itemTestIDField,
  accessibilityLabel,
  itemAccessibilityLabelField,
  itemTextProps
}) => {
  const isSelected = currentValue && _get(currentValue, valueField);
  const selected = _isEqual(_get(item, valueField), isSelected);
  return /*#__PURE__*/_jsx(TouchableHighlight, {
    testID: _get(item, itemTestIDField || labelField),
    accessible: !!accessibilityLabel,
    accessibilityLabel: _get(item, itemAccessibilityLabelField || labelField),
    underlayColor: activeColor,
    onPress: () => onSelect(item),
    children: /*#__PURE__*/_jsx(View, {
      style: StyleSheet.flatten([{
        borderBottomWidth: 0.5,
        borderBottomColor: "#676767",
        height: 60,
        backgroundColor: selected ? activeColor : itemContainerStyle?.backgroundColor
      }]),
      children: renderItem ? renderItem(item, selected) : /*#__PURE__*/_jsx(View, {
        style: {
          padding: 17,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: /*#__PURE__*/_jsx(Text, {
          style: StyleSheet.flatten([{
            flex: 1,
            fontSize: 15,
            color: "#000"
          }, itemTextStyle]),
          ...itemTextProps,
          children: _get(item, labelField)
        })
      })
    })
  }, index.toString());
};
//# sourceMappingURL=DropDownItem.js.map