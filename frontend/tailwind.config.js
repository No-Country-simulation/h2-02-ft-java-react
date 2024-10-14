const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '390px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'regular-12': ['12px', { lineHeight: '18px' }],
        'regular-13': ['13px', { lineHeight: '19.5px' }],
        'regular-14': ['14px', { lineHeight: '21px' }],
        'regular-15': ['15px', { lineHeight: '20px' }],
        'regular-16': ['16px', { lineHeight: '19.2px' }],
        'regularNav-16': ['16px', { lineHeight: '24px' }],
        'medium-18': ['18px', { lineHeight: '21.6px' }],
        'semibold-22': [
          '22px',
          { lineHeight: '33px', letterSpacing: '0.36px' },
        ],
        'semibold-26': [
          '26px',
          { lineHeight: '39px', letterSpacing: '0.36px' },
        ],
      },
      colors: {
        purpleWaki: '#8E2BFF',
        purpleWakiHover: '#6516BF',
        inputBorder: '#7676801F',
        inputBackground: '#EFEFF0',
        label: '#181818',
        blueWaki: '#317EF4',
        grayWaki: '#555555',
        grayLineWaki: '#353535',
        grayLightWaki: '#8D8D8D',
        greenWaki: '#06BD06',
        redWaki: '#C61C1E',
      },
      backgroundImage: {
        gradientWaki: 'linear-gradient(90deg, #317EF4 -0.04%, #8E2BFF 99.96%)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '7px',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '9px',
    },
  },
  plugins: [],
});
