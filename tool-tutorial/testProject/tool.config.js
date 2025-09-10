module.exports = {
  port: 9999,
  start: function() {
    console.log('🚀 Starting the development server...');
    console.log(`Server will run on port ${this.port}`);
    // Your custom start logic here
  },
  build: function() {
    console.log('🔨 Building the project...');
    // Custom build logic here  
  },
  publish: function() {
    console.log('📦 Publishing the project...');
    // Custom publish logic here
  }
}