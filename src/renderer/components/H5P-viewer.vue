<template>
  <div>
    <div class="h5p-container">     
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      filePath: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        H5P: this.$root.H5P,
        jQuery: this.$root.H5P.jQuery,
        playing: false,
        loaded: false
      }
    },
    computed: {

    },
    methods: {
      rootPath () {
        return process.env.NODE_ENV === 'production'
          ? `h5p://${this.filePath}/`
          : 'http://localhost:9081/workspace/'
      },
      loadH5PPath (filePath) {
        var vm = this
        console.log(`loadH5PPath [${vm.rootPath()}${filePath}]`);
        (function ($) {
          var h5pcontent = `${vm.rootPath()}${filePath}`
          vm.$notify.info({
            title: 'Loading',
            message: h5pcontent
          })
          $(function () {
            $('.h5p-container').empty()
            vm.loaded = false
            $('.h5p-container').h5p({
              frameJs: 'static/libs/h5p-standalone/js/h5p-standalone-frame.js',
              frameCss: `static/libs/h5p-standalone/styles/h5p.css`,
              h5pContent: h5pcontent
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
      console.log(`H5P-viewer [process.env.NODE_ENV] > ${process.env.NODE_ENV}`)
      console.log(`H5P-viewer [rootPath] > ${this.rootPath()}`)
    }
  }
</script>
<style>
</style>
