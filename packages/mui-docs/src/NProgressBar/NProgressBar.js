import * as React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { withStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import NoSsr from '@mui/core/NoSsr';
import { exactProp } from '@mui/utils';

NProgress.configure({
  barSelector: '.nprogress-bar',
  template: `
    <div class="nprogress-bar">
      <div></div>
      <div></div>
    </div>
  `,
});

const styles = (theme) => {
  if (!theme.nprogress.color) {
    throw new Error(
      'Material-UI: You need to provide a `theme.nprogress.color` property' +
        ' for using the `NProgressBar` component.',
    );
  }

  return {
    '@global': {
      '#nprogress': {
        direction: 'ltr',
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: theme.zIndex.tooltip,
        backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.primary[700] : theme.palette.primary[200],
        '& .nprogress-bar': {
          position: 'fixed',
          backgroundColor: theme.nprogress.color,
          top: 0,
          left: 0,
          right: 0,
          height: 2,
        },
        '& .nprogress-bar > div': {
          position: 'absolute',
          top: 0,
          height: 2,
          boxShadow: `${theme.nprogress.color} 1px 0 6px 1px`,
          borderRadius: '100%',
          animation: 'mui-nprogress-pulse 2s ease-out 0s infinite',
        },
        '& .nprogress-bar > div:first-child': {
          opacity: 0.6,
          width: 20,
          right: 0,
          clip: 'rect(-6px,22px,14px,10px)',
        },
        '& .nprogress-bar > div:last-child': {
          opacity: 0.6,
          width: 180,
          right: -80,
          clip: 'rect(-6px,90px,14px,-6px)',
        },
      },
      '@keyframes mui-nprogress-pulse': {
        '30%': {
          opacity: 0.6,
        },
        '60%': {
          opacity: 0,
        },
        to: {
          opacity: 0.6,
        },
      },
    },
  };
};

const defaultTheme = createTheme();
const GlobalStyles = withStyles(styles, { defaultTheme, flip: false, name: 'MuiNProgressBar' })(
  () => null,
);

/**
 * Elegant and ready to use wrapper on top of https://github.com/rstacruz/nprogress/.
 * The implementation is highly inspired by the YouTube one.
 */
function NProgressBar(props) {
  return (
    <NoSsr>
      {props.children}
      <GlobalStyles />
    </NoSsr>
  );
}

NProgressBar.propTypes = {
  children: PropTypes.node,
};

if (process.env.NODE_ENV !== 'production') {
  NProgressBar.propTypes = exactProp(NProgressBar.propTypes);
}

export default NProgressBar;
