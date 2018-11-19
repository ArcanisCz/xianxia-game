const https = require('https');
const querystring = require('querystring');
const gulp = require('gulp');
const ftp = require('vinyl-ftp');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

const remotePath = '/';
const storybookPath = '/storybook';
const storybookStaticPath = '/storybook/static';
const ftpConfig = {
    host: 'ftp.gransy.com',
    user: args.user,
    password: args.password,
};

gulp.task('clean', () => {
    const conn = ftp.create(ftpConfig);
    return conn.clean("*", ".", {base: '/'});
});

gulp.task('upload', ["clean"], () => {
    const conn = ftp.create(ftpConfig);
    gulp.src(['./dist/index.html', './dist/*.js', './dist/*.css', './public/*'])
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
    gulp.src(['./dist/storybook/*.html', './dist/storybook/*.ico', './dist/storybook/*.css'])
        .pipe(conn.newer(storybookPath))
        .pipe(conn.dest(storybookPath));
    gulp.src(['./dist/storybook/static/*.js'])
        .pipe(conn.newer(storybookStaticPath))
        .pipe(conn.dest(storybookStaticPath));
});

const options = {
    hostname: 'api.rollbar.com',
    path: '/api/1/deploy/',
    method: 'POST',
};
const revision = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString().trim();

const postData = querystring.stringify({
    access_token: args.rollbar,
    environment: "production",
    revision,
    local_username: "Circle CI",
});

gulp.task('deploy', ["upload"], () => new Promise((resolve, reject) => {
    const req = https.request(options, resolve, reject);
    req.write(postData);
    req.end();
}));
