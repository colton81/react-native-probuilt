"use strict";

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import _assign from "lodash/assign";
import _differenceWith from "lodash/differenceWith";
import _findIndex from "lodash/findIndex";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, I18nManager, Keyboard, Modal, StatusBar, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from "../TextInput/index.js";
import { styles } from "./styles.js";
import { useDetectDevice } from "../../hooks/useDetectDevice.js";
import { useDeviceOrientation } from "../../hooks/useDeviceOrientation.js";
import { ChevronDown } from "../../icons/ChevronDown.js";
import { Button } from "@expo/ui/swift-ui";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const {
  isTablet
} = useDetectDevice;
const statusBarHeight = StatusBar.currentHeight ?? 0;
export const DropDown = /*#__PURE__*/React.forwardRef((props, currentRef) => {
  const orientation = useDeviceOrientation();
  const {
    testID,
    itemTestIDField,
    onChange,
    style = {},
    containerStyle,
    placeholderStyle,
    selectedTextStyle,
    itemContainerStyle,
    itemTextStyle,
    inputSearchStyle,
    iconStyle,
    selectedTextProps = {},
    data = [],
    labelField,
    valueField,
    searchField,
    value,
    activeColor = "#F6F7F8",
    iconColor = "gray",
    searchPlaceholder,
    searchPlaceholderTextColor = "gray",
    placeholder = "Select item",
    search = false,
    maxHeight = 340,
    minHeight = 0,
    disable = false,
    keyboardAvoiding = true,
    inverted = true,
    renderLeftIcon,
    renderRightIcon,
    renderItem,
    renderInputSearch,
    onFocus,
    onBlur,
    autoScroll = true,
    showsVerticalScrollIndicator = true,
    dropdownPosition = "auto",
    flatListProps,
    searchQuery,
    backgroundColor,
    onChangeText,
    confirmSelectItem,
    onConfirmSelectItem,
    accessibilityLabel,
    itemAccessibilityLabelField,
    mode = "default",
    closeModalWhenSelectedItem = true,
    excludeItems = [],
    excludeSearchItems = []
  } = props;
  const ref = useRef(null);
  const refList = useRef(null);
  const [visible, setVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  const [listData, setListData] = useState(data);
  const [position, setPosition] = useState();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const {
    width: W,
    height: H
  } = Dimensions.get("window");
  const styleContainerVertical = useMemo(() => {
    return {
      backgroundColor: "rgba(0,0,0,0.1)",
      alignItems: "center"
    };
  }, []);
  const styleHorizontal = useMemo(() => {
    return {
      width: orientation === "LANDSCAPE" ? W / 2 : "100%",
      alignSelf: "center"
    };
  }, [W, orientation]);
  useImperativeHandle(currentRef, () => {
    return {
      open: eventOpen,
      close: eventClose
    };
  });
  useEffect(() => {
    return eventClose;
  }, []);
  const excludeData = useCallback(data => {
    if (excludeItems.length > 0) {
      const getData = _differenceWith(data, excludeItems, (obj1, obj2) => _get(obj1, valueField) === _get(obj2, valueField));
      return getData || [];
    } else {
      return data || [];
    }
  }, [excludeItems, valueField]);
  useEffect(() => {
    if (data && searchText.length === 0) {
      const filterData = excludeData(data);
      setListData([...filterData]);
    }
    if (searchText) {
      onSearch(searchText);
    }
  }, [data, searchText]);
  const eventOpen = () => {
    if (!disable) {
      _measure();
      setVisible(true);
      if (onFocus) {
        onFocus();
      }
      if (searchText.length > 0) {
        onSearch(searchText);
      }
    }
  };
  const eventClose = useCallback(() => {
    if (!disable) {
      setVisible(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [disable, onBlur]);
  const _measure = useCallback(() => {
    if (ref?.current) {
      ref.current.measureInWindow((pageX, pageY, width, height) => {
        let isFull = isTablet ? false : mode === "modal" || orientation === "LANDSCAPE";
        if (mode === "auto") {
          isFull = false;
        }
        const top = isFull ? 20 : height + pageY + 2;
        const bottom = H - top + height;
        const left = I18nManager.isRTL ? W - width - pageX : pageX;
        setPosition({
          isFull,
          width: Math.floor(width),
          top: Math.floor(top + statusBarHeight),
          bottom: Math.floor(bottom - statusBarHeight),
          left: Math.floor(left),
          height: Math.floor(height)
        });
      });
    }
  }, [H, W, orientation, mode]);
  const onKeyboardDidShow = useCallback(e => {
    _measure();
    setKeyboardHeight(e.endCoordinates.height);
  }, [_measure]);
  const onKeyboardDidHide = useCallback(() => {
    setKeyboardHeight(0);
    _measure();
  }, [_measure]);
  useEffect(() => {
    const susbcriptionKeyboardDidShow = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    const susbcriptionKeyboardDidHide = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    return () => {
      if (typeof susbcriptionKeyboardDidShow?.remove === "function") {
        susbcriptionKeyboardDidShow.remove();
      }
      if (typeof susbcriptionKeyboardDidHide?.remove === "function") {
        susbcriptionKeyboardDidHide.remove();
      }
    };
  }, [onKeyboardDidHide, onKeyboardDidShow]);
  const getValue = useCallback(() => {
    const defaultValue = typeof value === "object" ? _get(value, valueField) : value;
    const getItem = data.filter(e => _isEqual(defaultValue, _get(e, valueField)));
    if (getItem.length > 0) {
      setCurrentValue(getItem[0]);
    } else {
      setCurrentValue(null);
    }
  }, [data, value, valueField]);
  useEffect(() => {
    getValue();
  }, [value, data, getValue]);
  const scrollIndex = debounce(useCallback(() => {
    if (autoScroll && data?.length > 0 && listData?.length === data?.length) {
      if (refList?.current) {
        const defaultValue = typeof value === "object" ? _get(value, valueField) : value;
        const index = _findIndex(listData, e => _isEqual(defaultValue, _get(e, valueField)));
        if (listData?.length > 0 && index > -1 && index <= listData?.length - 1) {
          try {
            refList.current.scrollToIndex({
              index,
              animated: false
            });
          } catch (error) {
            console.warn(`scrollToIndex error: ${error}`);
          }
        }
      }
    }
  }, [autoScroll, data.length, listData, value, valueField]), 200);
  const showOrClose = useCallback(() => {
    if (!disable) {
      const visibleStatus = !visible;
      _measure();
      if (value) {
        const defaultValue = typeof value === "object" ? _get(value, valueField) : value;
        const index = _findIndex(data, e => _isEqual(defaultValue, _get(e, valueField)));
        if (index > -1) {
          // Store the scroll index to use it once the dropdown is opened
          setScrollToIndex(index);
        }
      }
      if (keyboardHeight > 0 && !visibleStatus) {
        return Keyboard.dismiss();
      }
      if (!visibleStatus) {
        if (onChangeText) {
          onChangeText("");
        }
        setSearchText("");
        onSearch("");
      }
      setVisible(visibleStatus);
      if (data) {
        const filterData = excludeData(data);
        setListData(filterData);
      }
      if (visibleStatus) {
        if (onFocus) {
          onFocus();
        }
      } else if (onBlur) {
        onBlur();
      }
      if (searchText.length > 0) {
        onSearch(searchText);
      }
    }
  }, [disable, keyboardHeight, visible, _measure, data, searchText, onFocus, onBlur]);
  const onSearch = useCallback(text => {
    if (text.length > 0) {
      const defaultFilterFunction = e => {
        const item = _get(e, searchField ?? labelField)?.toLowerCase().replace(/\s/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const key = text.toLowerCase().replace(/\s/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return item.indexOf(key) >= 0;
      };
      const propSearchFunction = e => {
        const labelText = _get(e, searchField ?? labelField);
        return searchQuery?.(text, labelText);
      };
      const dataSearch = data.filter(searchQuery ? propSearchFunction : defaultFilterFunction);
      if (excludeSearchItems.length > 0 || excludeItems.length > 0) {
        const excludeSearchData = _differenceWith(dataSearch, excludeSearchItems, (obj1, obj2) => _get(obj1, valueField) === _get(obj2, valueField));
        const filterData = excludeData(excludeSearchData);
        setListData(filterData);
      } else {
        setListData(dataSearch);
      }
    } else {
      const filterData = excludeData(data);
      setListData(filterData);
    }
  }, [data, searchQuery, excludeSearchItems, excludeItems, searchField, labelField, valueField, excludeData]);
  const onSelect = useCallback(item => {
    if (confirmSelectItem && onConfirmSelectItem) {
      return onConfirmSelectItem(item);
    }
    setCurrentValue(item);
    onChange(item);
    if (closeModalWhenSelectedItem) {
      if (onChangeText) {
        onChangeText("");
      }
      setSearchText("");
      onSearch("");
      eventClose();
    }
  }, [confirmSelectItem, eventClose, onChange, onChangeText, onConfirmSelectItem, onSearch, closeModalWhenSelectedItem]);
  const _renderDropdown = () => {
    const isSelected = currentValue && _get(currentValue, valueField);
    return /*#__PURE__*/_jsx(Button, {
      variant: "plain"
      //ref={ref}
      //onLayout={_measure}
      //testID={testID}
      //accessible={!!accessibilityLabel}
      //accessibilityLabel={accessibilityLabel}
      ,
      onPress: () => {
        ref?.current?.measureLayout;
        showOrClose();
      },
      style: [styles.mainWrap, style],
      children: /*#__PURE__*/_jsxs(View, {
        ref: ref,
        style: styles.dropdown,
        children: [renderLeftIcon?.(visible), /*#__PURE__*/_jsx(Text, {
          style: [styles.textItem, isSelected !== null ? selectedTextStyle : placeholderStyle],
          ...selectedTextProps,
          children: isSelected !== null ? _get(currentValue, labelField) : placeholder
        }), renderRightIcon ? renderRightIcon(visible) : /*#__PURE__*/_jsx(ChevronDown, {
          style: StyleSheet.flatten([styles.icon, {
            tintColor: iconColor
          }, iconStyle])
        })]
      })
    });
  };
  const _renderItem = useCallback(({
    item,
    index
  }) => {
    const isSelected = currentValue && _get(currentValue, valueField);
    const selected = _isEqual(_get(item, valueField), isSelected);
    _assign(item, {
      _index: index
    });
    return /*#__PURE__*/_jsx(TouchableHighlight, {
      testID: _get(item, itemTestIDField ?? labelField),
      accessible: !!accessibilityLabel,
      accessibilityLabel: _get(item, itemAccessibilityLabelField ?? labelField),
      underlayColor: activeColor,
      onPress: () => onSelect(item),
      children: /*#__PURE__*/_jsx(View, {
        style: StyleSheet.flatten([itemContainerStyle, selected && {
          backgroundColor: activeColor
        }, {
          borderBottomWidth: index === listData.length - 1 ? 0 : 0.5
        }]),
        children: renderItem ? renderItem(item, selected) : /*#__PURE__*/_jsx(View, {
          style: styles.item,
          children: /*#__PURE__*/_jsx(Text, {
            style: StyleSheet.flatten([styles.textItem, itemTextStyle]),
            children: _get(item, labelField)
          })
        })
      })
    }, index.toString());
  }, [accessibilityLabel, activeColor, currentValue, itemAccessibilityLabelField, itemContainerStyle, itemTestIDField, itemTextStyle, labelField, onSelect, renderItem, valueField]);
  const renderSearch = useCallback(() => {
    if (search) {
      if (renderInputSearch) {
        return renderInputSearch(text => {
          if (onChangeText) {
            setSearchText(text);
            onChangeText(text);
          }
          onSearch(text);
        });
      } else {
        return /*#__PURE__*/_jsx(TextInput, {
          testID: `${testID} input`,
          accessibilityLabel: `${accessibilityLabel} input`,
          style: [styles.input, inputSearchStyle],
          inputStyle: [inputSearchStyle],
          value: searchText,
          autoCorrect: false,
          placeholder: searchPlaceholder,
          onChangeText: e => {
            if (onChangeText) {
              setSearchText(e);
              onChangeText(e);
            }
            onSearch(e);
          },
          placeholderTextColor: searchPlaceholderTextColor,
          showIcon: true,
          iconStyle: [{
            tintColor: iconColor
          }, iconStyle]
        });
      }
    }
    return null;
  }, [accessibilityLabel, iconColor, iconStyle, inputSearchStyle, onChangeText, onSearch, renderInputSearch, search, searchPlaceholder, searchPlaceholderTextColor, testID, searchText]);
  const _renderList = useCallback(isTopPosition => {
    const isInverted = !inverted ? false : isTopPosition;
    const _renderListHelper = () => {
      return /*#__PURE__*/_jsx(FlatList, {
        testID: `${testID} flatlist`,
        accessibilityLabel: `${accessibilityLabel} flatlist`,
        ...flatListProps,
        keyboardShouldPersistTaps: "handled",
        ref: refList,
        initialScrollIndex: scrollToIndex > -1 && listData?.length > 5 ? scrollToIndex : undefined,
        getItemLayout: (_, index) => ({
          length: 55,
          // Make sure this matches the actual item height
          offset: 55 * index,
          index
        }),
        onContentSizeChange: scrollIndex,
        onScrollToIndexFailed: scrollIndex,
        data: listData
        // inverted={isTopPosition ? inverted : false}
        ,
        renderItem: _renderItem,
        keyExtractor: (_item, index) => index.toString(),
        showsVerticalScrollIndicator: showsVerticalScrollIndicator,
        windowSize: 10 // Increase rendering window
        ,
        maxToRenderPerBatch: 10 // Increase items rendered per batch
        ,
        removeClippedSubviews: false // Keep items in memory
        ,
        initialNumToRender: listData.length // Render all items initially
      });
    };
    return /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
      children: /*#__PURE__*/_jsxs(View, {
        style: (styles.flexShrink, {
          backgroundColor: itemContainerStyle?.backgroundColor
        }),
        children: [isInverted && _renderListHelper(), renderSearch(), !isInverted && _renderListHelper()]
      })
    });
  }, [_renderItem, accessibilityLabel, flatListProps, listData, inverted, renderSearch, scrollIndex, showsVerticalScrollIndicator, testID]);
  const _renderModal = useCallback(() => {
    if (visible && position) {
      const {
        isFull,
        width,
        height,
        top,
        bottom,
        left
      } = position;
      const onAutoPosition = () => {
        if (keyboardHeight > 0) {
          return bottom < keyboardHeight + height;
        }
        return bottom < H * 0.35;
      };
      if (width && top && bottom) {
        const styleVertical = {
          left,
          maxHeight,
          minHeight
        };
        const isTopPosition = dropdownPosition === "auto" ? onAutoPosition() : dropdownPosition === "top";
        const keyboardStyle = {};
        let extendHeight = !isTopPosition ? top : bottom;
        if (keyboardAvoiding && keyboardHeight > 0 && isTopPosition && dropdownPosition === "auto") {
          extendHeight = keyboardHeight;
        }
        return /*#__PURE__*/_jsx(Modal, {
          transparent: true,
          statusBarTranslucent: true,
          visible: visible,
          supportedOrientations: ["landscape", "portrait"],
          onRequestClose: showOrClose,
          children: /*#__PURE__*/_jsx(TouchableWithoutFeedback, {
            onPress: showOrClose,
            children: /*#__PURE__*/_jsx(View, {
              style: StyleSheet.flatten([styles.flex1, isFull && styleContainerVertical, backgroundColor && {
                backgroundColor
              }, keyboardStyle]),
              children: /*#__PURE__*/_jsx(View, {
                style: StyleSheet.flatten([styles.flex1, !isTopPosition ? {
                  paddingTop: extendHeight
                } : {
                  justifyContent: "flex-end",
                  paddingBottom: extendHeight
                }, isFull && styles.fullScreen]),
                children: /*#__PURE__*/_jsx(View, {
                  style: {
                    shadowColor: "#000000ff",
                    shadowOffset: {
                      width: 0,
                      height: 1
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 3.41,
                    elevation: 2
                  },
                  children: /*#__PURE__*/_jsx(View, {
                    style: StyleSheet.flatten([{
                      flexShrink: 1,
                      marginTop: 8,
                      borderRadius: 5,
                      overflow: "hidden"
                    }, isFull ? styleHorizontal : styleVertical, {
                      width
                    }, containerStyle]),
                    children: _renderList(isTopPosition)
                  })
                })
              })
            })
          })
        });
      }
      return null;
    }
    return null;
  }, [visible, search, position, keyboardHeight, maxHeight, minHeight, dropdownPosition, keyboardAvoiding, showOrClose, styleContainerVertical, backgroundColor, containerStyle, styleHorizontal, _renderList]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [_renderDropdown(), _renderModal()]
  });
});
//# sourceMappingURL=index.js.map