const gulp = require('gulp')

const { src, series, dest, watch, task, parallel } = gulp

const shell = require('gulp-shell')
const eslint = require('gulp-eslint')
const clean = require('gulp-rimraf')
const jest = require('gulp-jest').default
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')
const merge = require('merge-stream')

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
    .pipe(eslint({
      rules: {},
      globals: [],
      envs: []
    }))
    .pipe(eslint.formatEach('compact', process.stderr))
})

task('test', () => {
  process.env.NODE_ENV = 'test'

  return gulp.src('tests')
    .pipe(jest({
      'automock': false,
      'passWithNoTests': true
    }))
})

// builds the routes and swagger.json file
task('tsoa', shell.task('tsoa spec-and-routes'))

task('install', shell.task('npm install --omit-dev --quiet', { cwd: 'dist'}))

task('transpile', async () => {
  const tsProject = ts.createProject('./tsconfig.json')

  return tsProject.src()
    .pipe(tsProject())
    .pipe(dest('dist'))
})

task('copy-resources', () => {
  return merge([
    gulp.src('./.env').pipe(dest('dist')),
    gulp.src('./src/build/swagger.json').pipe(dest('dist/build')),
    gulp.src('./package*.json').pipe(dest('dist'))
  ])
})

task('dev', () => {
  const stream = nodemon({
    exec: 'ts-node src/server.ts',
    ext: 'ts js json',
    verbose: true,
    ignore: [
      '.git',
      'node_modules/**/node_modules',
      'src/build/swagger.json',
      'src/build/routes.ts'
    ],
    tasks: ['build'], // compile synchronously onChange
  })

  stream
    .on('restart', () => {
      console.log('restarted!')
    })
    .on('crash', () => {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10) // restart the server in 10 seconds
    })

  return stream
})

task('build', series(['tsoa', 'copy-resources', 'transpile']))

task('mstop', shell.task('docker stop mongo_dev && docker container rm mongo_dev'))

task('mstart', shell.task('docker run -d --name mongo_dev -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo'))


task('default', series(['clean', 'lint', 'test', 'build', 'install']))
