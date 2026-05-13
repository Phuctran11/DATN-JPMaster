/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "#f39461",
        "inverse-surface": "#2f3036",
        "surface-container-lowest": "#ffffff",
        "secondary-fixed-dim": "#f9bd22",
        "on-secondary": "#ffffff",
        "inverse-primary": "#b6c4ff",
        "on-background": "#1a1b21",
        "tertiary-fixed": "#ffdbcb",
        "outline": "#757682",
        "primary-container": "#1e3a8a",
        "on-secondary-container": "#6f5100",
        "on-secondary-fixed": "#261a00",
        "primary-fixed": "#dce1ff",
        "primary-fixed-dim": "#b6c4ff",
        "error": "#ba1a1a",
        "secondary-container": "#ffc329",
        "tertiary-fixed-dim": "#ffb691",
        "on-error-container": "#93000a",
        "on-secondary-fixed-variant": "#5c4300",
        "on-primary-container": "#90a8ff",
        "surface-bright": "#faf8ff",
        "surface-dim": "#dad9e1",
        "surface": "#faf8ff",
        "error-container": "#ffdad6",
        "on-primary": "#ffffff",
        "surface-variant": "#e3e1e9",
        "secondary": "#795900",
        "surface-container": "#eeedf4",
        "on-primary-fixed-variant": "#264191",
        "surface-container-low": "#f4f3fa",
        "on-surface": "#1a1b21",
        "tertiary-container": "#6e2c00",
        "on-primary-fixed": "#00164e",
        "outline-variant": "#c5c5d3",
        "on-surface-variant": "#444651",
        "background": "#faf8ff",
        "surface-tint": "#4059aa",
        "on-tertiary-fixed-variant": "#773205",
        "inverse-on-surface": "#f1f0f7",
        "primary": "#00236f",
        "secondary-fixed": "#ffdf9f",
        "surface-container-high": "#e9e7ef",
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed": "#341100",
        "surface-container-highest": "#e3e1e9",
        "tertiary": "#4b1c00",
        "on-error": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-desktop": "64px",
        "gutter": "24px",
        "stack-lg": "32px",
        "unit": "8px",
        "margin-mobile": "20px",
        "stack-md": "16px",
        "stack-sm": "8px",
        "section-gap": "100px",
        "container-max-width": "1280px"
      },
      fontFamily: {
        "headline-lg": ["Manrope"],
        "label-md": ["Inter"],
        "headline-sm": ["Manrope"],
        "headline-md": ["Manrope"],
        "display-lg": ["Manrope"],
        "body-lg": ["Inter"],
        "body-md": ["Inter"],
        "headline-lg-mobile": ["Manrope"]
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.03em", fontWeight: "800" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "700" }]
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "bounce-subtle": "bounceSubtle 4s ease-in-out infinite",
        "pulse-slow": "pulseSlow 3s ease-in-out infinite"
      },
      keyframes: {
        fadeInUp: {
          "from": { opacity: "0", transform: "translateY(20px)" },
          "to": { opacity: "1", transform: "translateY(0)" }
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.9", transform: "scale(0.99)" }
        }
      }
    },
  },
  plugins: [],
}

