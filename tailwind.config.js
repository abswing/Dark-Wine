tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans:  ['Inter', 'sans-serif'],
      },
      colors: {
        /* ── Core palette ── */
        'gold':     '#c9923a',
        'gold-l': '#daa855',
        'gold-d': '#7a5220',
        'dw':       '#0d0b09',
        'fw':       '#080706',
        'sa':       '#141414',
        'sb':       '#0f0210',

        /* ── Text shades ── */
        'wgray':    '#a0978e',
        'soft':     '#e0e0e0',
        'cream':    '#e2d9e2',
        'linen':    '#e4ddd5',

        /* ── UI surfaces ── */
        'modal':    '#0e0b0e',
        'menu':     '#0a0808',
        'divider':  '#444444',
      },
      transitionDuration: { '400': '400ms' },
    }
  }
}
