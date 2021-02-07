import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import contentWebpackConfig from './content/webpack.config';
import apiWebpackConfig from './API/webpack.config';

gulp.task('popup-js', (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    console.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('event-js', (cb) => {
  webpack(eventWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    console.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('content-js', (cb) => {
  webpack(contentWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    console.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('api-js', (cb) => {
  webpack(apiWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    console.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('popup-html', () => {
  return gulp.src('popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', () => {
  return gulp.src('manifest.json')
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', gulp.parallel('copy-manifest', 'popup-js', 'popup-html', 'event-js', 'content-js', 'api-js'));

gulp.task('watch', () => {
  gulp.watch('popup/**/*', gulp.parallel('popup-js', 'popup-html'));
  gulp.watch('content/**/*', gulp.parallel('content-js'));
  gulp.watch('event/**/*', gulp.parallel('event-js'));
  gulp.watch('API/**/*', gulp.parallel('api-js'));
  gulp.watch('manifest.json', gulp.parallel('copy-manifest'));
});

gulp.task('default', gulp.series('build', 'watch'));
