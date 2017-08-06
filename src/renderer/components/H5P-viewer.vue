<template>
  <div>
    <div class="h5p-container">     
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      loadH5PPath (filePath) {
        console.log(`loadH5PPath [${filePath}]`);
        (function ($) {
          $(function () {
            $('.h5p-container').empty()
            $('.h5p-container').h5p({
              frameJs: 'static/libs/h5p-standalone/js/h5p-standalone-frame.js',
              frameCss: `static/libs/h5p-standalone/styles/h5p.css`,
              h5pContent: `http://localhost:9081/workspace/${filePath}`
            })
          })
        })(this.$root.H5P.jQuery)
      },
      loadH5PFile (file) {
        console.log(`loadH5PFile [${file}]`);
        (function ($) {
          $(function () {
            $('.h5p-container').empty()
            $('.h5p-container').h5p({
              frameJs: 'static/libs/h5p-standalone/js/h5p-standalone-frame.js',
              frameCss: `static/libs/h5p-standalone/styles/h5p.css`,
              h5pContent: `http://localhost:9081/workspace/${file}`
            })
          })
        })(this.$root.H5P.jQuery)
      },
      loadH5P () {
        (function ($) {
          $(function () {
            $('.h5p-container').empty()
            $('.h5p-container').h5p({
              frameJs: 'static/h5p-standalone/dist/js/h5p-standalone-frame.js',
              frameCss: `static/h5p-standalone/dist/styles/h5p.css`,
              h5pContent: `http://localhost:9081/workspace`
            })
          })
        })(this.$root.H5P.jQuery)
      }
    },
    mounted () {
    }
  }
</script>
<style>
</style>
