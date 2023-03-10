const dotenv = require('dotenv')

dotenv.config()

const gulp = require('gulp')

const { src, series, dest, task, parallel } = gulp

const shell = require('gulp-shell')
const eslint = require('gulp-eslint')
const clean = require('gulp-rimraf')
const jest = require('gulp-jest').default;
const ts = require('gulp-typescript')
const merge = require('merge-stream')
const nodemon = require('gulp-nodemon')

task('clean-dist', () => {
  return src('dist', { read: false, allowEmpty: true })
    .pipe(clean())
})

task('clean-logs', () => {
  return src('logs', { read: false, allowEmpty: true })
    .pipe(clean())
})

task('clean-build', () => {
  return src('src/build/*.*', { read: false, allowEmpty: true })
    .pipe(clean())
})

task('clean-coverage', () => {
  return src('coverage', { read: false, allowEmpty: true })
    .pipe(clean())
})

task('clean', parallel(['clean-dist', 'clean-logs', 'clean-build', 'clean-coverage']))

task('lint', () => {
  return src(['**/*.js', '**/*.ts', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.formatEach('compact', process.stderr))
})

// builds the routes and swagger.json file
task('tsoa', shell.task('tsoa spec-and-routes'))

task('jest', () => {
  process.env.NODE_ENV = 'test'

  return gulp.src('tests')
    .pipe(jest({
      'automock': false,
      'passWithNoTests': true
    }))
})

task('test', series(['tsoa', 'jest']))

task('install', shell.task('npm install --omit-dev --quiet', { cwd: 'dist'}))

task('compile', async () => {
  const tsProject = ts.createProject('./tsconfig.json')

  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(dest('dist'))
})

task('copy-resources', () => {
  return merge([
    gulp.src('./.env').pipe(dest('dist')),
    gulp.src('./src/build/swagger.json').pipe(dest('dist/build')),
    gulp.src('./package*.json').pipe(dest('dist'))
  ])
})

task('build', series(['tsoa', 'copy-resources', 'compile']))

task('mstop', shell.task('docker stop mongo_dev && docker container rm mongo_dev'))
task('mstart', shell.task([
  'docker stop mongo_dev && docker container rm mongo_dev',
  'docker run -d --name mongo_dev -v ~/data/db:/data/db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo'
]))

task('bdd', shell.task('npx cucumber-js'))

task('watch', (done) => {
  let stream = nodemon({
    nodemon: require('nodemon'),
    ext: 'ts json',
    env: { 'NODE_ENV': 'development'},
    tasks: ['tsoa'],
    done: done
  })

  stream
    .on('restart', () => {
      console.log('restarted!')
    })
    .on('crash', () => {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10) // restart the server in 10 seconds
    })
})

task('check', series(['lint', 'test']))

task('default', series(['clean', 'lint', 'test', 'build', 'install']))
