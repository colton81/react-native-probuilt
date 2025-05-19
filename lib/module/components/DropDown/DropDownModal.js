"use strict";

import React, { useCallback, useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

/**
 * A separate modal component for the Dropdown
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const DropdownModal = /*#__PURE__*/React.memo(({
  visible,
  position,
  onClose,
  renderContent,
  containerStyle,
  keyboardHeight,
  keyboardAvoiding,
  dropdownPosition,
  maxHeight,
  minHeight,
  backgroundColor,
  listData,
  styleContainerVertical,
  styleHorizontal,
  opacity
}) => {
  // Add local state to track modal closing state
  const [isClosing, setIsClosing] = useState(false);
  const [cachedPosition, setCachedPosition] = useState(null);

  // When position changes and we're visible, cache it
  useEffect(() => {
    if (visible && position && !isClosing) {
      setCachedPosition(position);
    }
  }, [visible, position, isClosing]);

  // Use cached position or current position
  const positionToUse = isClosing ? cachedPosition : position;

  // Handle modal close with animation protection
  const handleClose = useCallback(() => {
    if (!isClosing) {
      setIsClosing(true);
      // Use timeout matching the fade animation duration
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 150);
    }
  }, [onClose, isClosing]);
  if (!visible && !isClosing || !positionToUse) {
    return null;
  }
  const {
    isFull,
    width,
    height,
    top,
    bottom,
    left
  } = positionToUse;
  const onAutoPosition = () => {
    if (keyboardHeight > 0) {
      return bottom < keyboardHeight + height;
    }
    return bottom < 150; // Simplified from (search ? 150 : 100)
  };
  const styleVertical = {
    left: left,
    maxHeight: maxHeight,
    minHeight: Math.min(
    // Ensure we have space for at least 3 items or set minimum height
    Math.max(minHeight, Math.min(listData.length, 3) * 50), maxHeight)
  };
  const isTopPosition = dropdownPosition === "auto" ? onAutoPosition() : dropdownPosition === "top";
  let keyboardStyle = {};
  let extendHeight = !isTopPosition ? top : bottom;
  if (keyboardAvoiding && keyboardHeight > 0 && isTopPosition && dropdownPosition === "auto") {
    extendHeight = keyboardHeight;
  }
  console.log("top position", isTopPosition);
  return /*#__PURE__*/_jsx(Modal, {
    transparent: true,
    statusBarTranslucent: true,
    visible: true,
    animationType: "fade",
    supportedOrientations: ["landscape", "portrait"],
    onRequestClose: handleClose,
    children: /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
      onPress: handleClose,
      children: /*#__PURE__*/_jsx(View, {
        style: StyleSheet.flatten([{
          opacity: opacity,
          flex: 1
        }, isFull && styleContainerVertical, backgroundColor && {
          backgroundColor: backgroundColor
        }, keyboardStyle]),
        children: /*#__PURE__*/_jsx(View, {
          style: StyleSheet.flatten([{
            flex: 1
          }, !isTopPosition ? {
            paddingTop: extendHeight
          } : {
            justifyContent: "flex-end",
            paddingBottom: extendHeight
          }, isFull && {
            alignItems: "center",
            justifyContent: "center"
          }]),
          children: /*#__PURE__*/_jsx(View, {
            style: StyleSheet.flatten([isFull ? styleHorizontal : styleVertical, {
              width,
              flexShrink: 1,
              marginTop: 8,
              borderRadius: 10,
              overflow: "hidden",
              borderColor: "#676767",
              backgroundColor: "#fff",
              borderWidth: 1,
              // iOS shadow properties
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.9,
              shadowRadius: 3,
              // Required for Android shadow
              elevation: 4
            }, containerStyle]),
            children: renderContent(isTopPosition)
          })
        })
      })
    })
  });
});

// Usage in your Dropdown component:
/*
const renderModalContent = useCallback((isTopPosition) => {
  return _renderList(isTopPosition);
}, [_renderList]);

// Replace your _renderModal code with:
{visible && (
  <DropdownModal
    visible={visible}
    position={position}
    onClose={eventClose}
    renderContent={renderModalContent}
    containerStyle={containerStyle}
    keyboardHeight={keyboardHeight}
    keyboardAvoiding={keyboardAvoiding}
    dropdownPosition={dropdownPosition}
    maxHeight={maxHeight}
    minHeight={minHeight}
    backgroundColor={backgroundColor}
    listData={listData}
    styleContainerVertical={styleContainerVertical}
    styleHorizontal={styleHorizontal}
    opacity={opacity}
  />
)}
*/
//# sourceMappingURL=DropDownModal.js.map