import ColorPalette from '@Constants/colors';
import layout from '@Constants/layout';
import { useState } from 'react';

const style = {
  content: {
    flex: 1,
    backgroundColor: ColorPalette.white,
  },
};

const useHeaderScroll = (headerHeight = 0.5) => {
  const [headerScrollProps, setHeaderScrollProps] = useState({ height: 0, pct: 0 });
  const backgroundHeight = layout.window.height * headerHeight;

  const handleScroll = ({
    nativeEvent: {
      contentOffset: { y },
    },
  }: {
    nativeEvent: {
      contentOffset: {
        y: number;
      };
    };
  }) => {
    setHeaderScrollProps({
      height: y < 0 ? -y : 0,
      pct: y / backgroundHeight,
    });
  };

  return {
    style: {
      container: {
        flex: 1,
        backgroundColor: ColorPalette.white,
      },
      content: {
        ...style.content,
        marginTop: backgroundHeight,
      },
      header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: ColorPalette.black,
        height: backgroundHeight + headerScrollProps.height,
        overflow: 'hidden',
      },
      overlay: {
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        top: backgroundHeight,
      },
      background: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
    } as const,
    layoutHeight: layout.window.height,
    backgroundHeight,
    headerScrollPct: headerScrollProps.pct,
    handleScroll,
  };
};

export default useHeaderScroll;
