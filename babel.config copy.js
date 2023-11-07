 module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'transform-inline-environment-variables',

    'import-graphql',
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
        root: ['./src'],
        alias: {
          '@Components': './src/components',
          '@Constants': './src/constants',
          '@Context': './src/context',
          '@Screens': './src/screens',
          '@Services': './src/services',
          '@Hooks': './src/hooks',
          '@Utils': './src/utils',
          '@Config': './src/config',
          '@Images': './src/assets/images',
          '@Icons': './src/assets/icons',
          '@Fonts': './src/assets/images',
          '@Navigation': './src/navigation',
          '@Styles': './src/style',
          '@Lib': './src/lib',
          '@Assets': './src/assets',
          '@Graphql': './src/graphql',
        },
      },
    ],
    ],
  };
