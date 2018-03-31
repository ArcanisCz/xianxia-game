const https = require('https');
const querystring = require('querystring');
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

gulp.task('upload', ["clean"], () => {
    const conn = ftp.create(ftpConfig);
    gulp.src(['./dist/index.html', './dist/*.js', './public/**/*'])
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
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
    access_token: args.accessToken,
    environment: "production",
    revision,
    local_username: "Circle CI",
});

gulp.task('deploy', ["upload"], () => new Promise((resolve, reject) => {
    const req = https.request(options, resolve, reject);
    req.write(postData);
    req.end();
}));
