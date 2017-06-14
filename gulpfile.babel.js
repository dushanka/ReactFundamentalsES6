import gulp from 'gulp';
import inject from 'gulp-inject';
import wiredep from 'wiredep';

gulp.task('inject', function() {

  const wiredepOpts = {
    bowerJson: require('./bower.json'),
    directory: './src/lib'
  };

  const injectSrc = gulp.src(['./src/js/*.js', './src/css/*.css'], {read: false});
  const injectOpts = {
    ignorePath: '/src/',
    relative: true,
    transform: function(filepath) {
      if (filepath.slice(-9) === '.babel.js') {
        // Add the text/babel type for browser ES6/JSX conversions
        return '<script src="' + filepath + '" type="text/babel"></script>';
      }
      // Use the default transform as fallback
      return inject.transform.apply(inject.transform, arguments);
    }
  };

  return gulp.src('./src/*.html')
    .pipe(wiredep.stream(wiredepOpts))
    .pipe(inject(injectSrc, injectOpts))
    .pipe(gulp.dest('./src'));
});
