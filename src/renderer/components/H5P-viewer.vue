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
        H5P: this.$root.H5P,
        jQuery: this.$root.H5P.jQuery,
        playing: false,
        loaded: false
      }
    },
    methods: {
      loadH5PPath (filePath) {
        var vm = this
        console.log(`loadH5PPath [${filePath}]`);
        (function ($) {
          $(function () {
            $('.h5p-container').empty()
            $('.h5p-container').h5p({
              frameJs: 'static/libs/h5p-standalone/js/h5p-standalone-frame.js',
              frameCss: `static/libs/h5p-standalone/styles/h5p.css`,
              h5pContent: `http://localhost:9081/workspace/${filePath}`
            })
            vm.loaded = true
          })
        })(vm.jQuery)
      },
      loadH5PFile (file) {
        var vm = this
        console.log(`loadH5PFile [${file}]`);
        (function ($) {
          $(function () {
            $('.h5p-container').empty()
            $('.h5p-container').h5p({
              frameJs: 'static/libs/h5p-standalone/js/h5p-standalone-frame.js',
              frameCss: `static/libs/h5p-standalone/styles/h5p.css`,
              h5pContent: `http://localhost:9081/workspace/${file}`
            })
            vm.loaded = true
          })
        })(vm.jQuery)
      },
      playH5P () {
        var vm = this
        if (vm.loaded) {
          var iframe = vm.jQuery('.h5p-iframe')[0]
          iframe.contentDocument.getElementsByClassName('h5p-play')[0].click()
          vm.playing = !vm.playing
          vm.$emit('h5p-play', vm.playing)
        }
      }
    },
    mounted () {
    }
  }
</script>
<style>
</style>
