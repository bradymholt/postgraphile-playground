// apollo.config.js
// Used for the Apollo GraphQL for VS Code extension
module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: 'http://localhost:8081/graphql',
      
    },
    // Files processed by the extension
    includes: [
      'web/src/**/*.vue',
      'web/src/**/*.js',
    ],
  },
}