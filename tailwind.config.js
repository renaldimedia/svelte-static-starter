const production = !process.env.ROLLUP_WATCH;

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  plugins: [],
  purge: {
    content: ["./src/**/*.svelte"],
    enabled: production,
  },
  theme: {
    extend : {
      colors: {
        biru: '#877DFE',
        hitam: '#222222',
        putih: '#FFFFFF',
        hijau: '#40F447',
        merah: '#FC3F3F',
        transparent: 'transparent',
        current: 'currentColor',
  
        black: '#000',
        white: '#fff',
      }
    }
  }
};