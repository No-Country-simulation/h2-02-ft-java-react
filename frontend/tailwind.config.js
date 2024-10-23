module.exports = {
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
        'medium-39': [
          '39.45px',
          { lineHeight: '59.17px', letterSpacing: '0.65px' },
        ],
        'semibold-22': [
          '22px',
          { lineHeight: '33px', letterSpacing: '0.36px' },
        ],
        'semibold-26': [
          '26px',
          { lineHeight: '39px', letterSpacing: '0.36px' },
        ],
        'black-44': [
          '44.5px',
          { lineHeight: '14.6px', letterSpacing: '-0.22px' },
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
        grayCard: '#F3F4F5',
        grayLineWaki: '#353535',
        grayLightWaki: '#8D8D8D',
        greenWaki: '#06BD06',
        redWaki: '#C61C1E',
      },
      backgroundImage: {
        gradientWaki: 'linear-gradient(90deg, #317EF4 -0.04%, #8E2BFF 99.96%)',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        blink: {
          '0%, 100%': { opacity: 1 }, // 100% visible al principio y al final
          '50%': { opacity: 0 }, // 50% de opacidad en la mitad del ciclo
        },
      },
      animation: {
        blink: 'blink 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        slideIn: 'slideIn 0.5s forwards',
        slideOut: 'slideOut 0.5s forwards',
        fadeIn: 'fadeIn 0.5s forwards',
        fadeOut: 'fadeOut 0.5s forwards',
      },
      boxShadow: {
        custom: '0 0 14.6px rgba(0, 0, 0, 0.2)',
      },
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '7px',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '9px',
      xl: '11px',
    },
  },
  plugins: [],
};
