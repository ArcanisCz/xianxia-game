const gulp = require('gulp');
const ftp = require('vinyl-ftp');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

const remotePath = '/';
const ftpConfig = {
    host: 'ftp.gransy.com',
    user: args.user,
    password: args.password,
};

gulp.task('clean', () => {
    const conn = ftp.create(ftpConfig);
    return conn.clean("*", ".", {base: '/'});
});

gulp.task('deploy', ["clean"], () => {
    const conn = ftp.create(ftpConfig);
    gulp.src(['./dist/index.html', './dist/*.js', './public/**.*'])
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
});
