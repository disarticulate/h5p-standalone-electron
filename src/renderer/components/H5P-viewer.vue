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
      loadH5P () {
        (function ($) {
          $(function () {
            $('.h5p-container').empty()
            $('.h5p-container').h5p({
              frameJs: 'static/h5p-standalone/dist/js/h5p-standalone-frame.js',
              frameCss: `static/h5p-standalone/dist/styles/h5p.css`,
              h5pContent: `http://localhost:9081/static/workspace`
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
