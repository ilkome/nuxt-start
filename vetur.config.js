module.exports = {
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true
  },

  projects: [{
    root: './',
    package: './package.json'
  }],

  globalComponents: [
    './components/**/*.vue'
  ]
}
