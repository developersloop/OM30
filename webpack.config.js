module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      $: "jquery",
    }
  },
    module: {
      rules: [
        // ... other rules omitted
  
        // this will apply to both plain `.scss` files
        // AND `<style lang="scss">` blocks in `.vue` files
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    // plugin omitted
}  