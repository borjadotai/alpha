module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      width: {
        ee: '690px',
        md: '780px',
      },
      screens: {
        xs: '500px',
        ee: '680px',
      },
      maxWidth: {
        xs: '21rem',
      },
      colors: {
        dark: {
          1: '#0f0f0f',
        },
      },
    },
  },
  variants: {
    extend: {
      gradientColorStops: ['active', 'group-hover'],
    },
  },
  plugins: [],
};
