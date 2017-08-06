/* Imports h5p static into chunks */
const __static = ('./static')

exports.H5PMainLib = {
  name: 'H5PMainLib',
  filename: 'H5PMainLib.js',
  minChunks: Infinity,
  files: [
    `${__static}/h5p-standalone/src/js/h5p-jquery.js`,
    `${__static}/h5p-standalone/src/js/h5pintegration.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p-content-type.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p-event-dispatcher.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p-x-api-event.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p-x-api.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p.js`,
    `${__static}/h5p-standalone/src/js/h5p-overwrite.js`
  ]
}

exports.H5PFrameLib = {
  name: 'H5PFrameLib',
  filename: 'H5PFrameLib.js',
  minChunks: Infinity,
  files: [
    `${__static}/h5p-standalone/src/js/h5p-jquery.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p-content-type.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p-event-dispatcher.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p-x-api-event.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p-x-api.js`,
    `${__static}/h5p-standalone/bower_components/h5p-php-library/js/h5p.js`,
    `${__static}/h5p-standalone/src/js/h5p-overwrite.js`
  ]
}