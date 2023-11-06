import { DevicePlatform } from '@Constants/global';
import React, { useRef, useCallback, useEffect } from 'react';
import { ScrollView, RefreshControl, Keyboard, Platform } from 'react-native';

const keyboardEvent = Platform.OS === DevicePlatform.ios ? 'keyboardWillShow' : 'keyboardDidShow';

interface ScrollViewRefreshProps {
  children: React.ReactNode;
  loading: boolean;
  refetch: () => void;
  scrollToEnd?: boolean;
}

const ScrollViewRefresh = ({ children, loading, refetch, scrollToEnd }: ScrollViewRefreshProps) => {
  const element = useRef<ScrollView>(null);

  const scrollToBottom = (animated = false) => {
    if (scrollToEnd) {
      element.current?.scrollToEnd({ animated });
    }
  };

  const scrollToBottomCallback = useCallback(scrollToBottom, [scrollToBottom]);

  const refreshControl = <RefreshControl refreshing={loading} onRefresh={refetch} />;

  useEffect(scrollToBottomCallback);

  useEffect(() => {
    const listener = Keyboard.addListener(keyboardEvent, () => scrollToBottomCallback(true));
    return () => listener.remove();
  }, [scrollToBottomCallback]);

  return (
    <ScrollView
      ref={element}
      refreshControl={refreshControl}
      onContentSizeChange={() => scrollToBottom}
      style={{ flex: 1 }}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewRefresh;
