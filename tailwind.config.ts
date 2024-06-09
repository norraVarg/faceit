import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'background-pulse': 'background-pulse 1s cubic-bezier(.25, .1, .25, 1) 3',
        'scale': 'scale 1s cubic-bezier(0, 0, 1, 1) 3',
      },
      keyframes: {
        'background-pulse': {
          'to': { backgroundColor: '#99f6e4' }
        },
        'scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    }
  },
  plugins: [],
}
export default config
