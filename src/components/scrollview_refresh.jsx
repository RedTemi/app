import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  RefreshControl,
  Keyboard,
  Platform,
} from 'react-native';
import style from '../style/flex';

const keyboardEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';

function ScrollViewRefresh({
  children,
  loading,
  refetch,
  scrollToEnd,
}) {
  const element = useRef(null);
  function onRefresh() {
    refetch();
  }
  function scrollToBottom(animated = false) {
    if (scrollToEnd === true) {
      element.current.scrollToEnd({ animated });
    }
  }
  const scrollToBottomCallback = useCallback(scrollToBottom, [scrollToBottom]);
  const refreshControl = (
    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
  );
  useEffect(scrollToBottomCallback);
  useEffect(() => {
    const listener = Keyboard.addListener(keyboardEvent, () => scrollToBottomCallback(true));
    return () => listener.remove();
  }, [scrollToBottomCallback]);
  return (
    <ScrollView
      ref={element}
      refreshControl={refreshControl}
      onContentSizeChange={scrollToBottom}
      style={style}
    >
      {children}
    </ScrollView>
  );
}

ScrollViewRefresh.defaultProps = {
  scrollToEnd: false,
};

ScrollViewRefresh.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
  scrollToEnd: PropTypes.bool,
};

export default ScrollViewRefresh;
