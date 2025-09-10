# CLI Tool

A flexible and configurable command-line interface tool built with Node.js that allows you to create custom project-specific commands through configuration files.

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Configuration](#configuration)
- [Available Commands](#available-commands)
- [Examples](#examples)
- [Development](#development)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Configurable Commands**: Define custom commands through `tool.config.js` files
- **JSON Schema Validation**: Automatic validation of configuration files
- **Workspace Support**: Built with npm workspaces for modular development
- **Colorful Output**: Enhanced terminal output using chalk
- **Debug Logging**: Built-in debug logging system
- **Flexible Architecture**: Easy to extend with new commands and features

## 🚀 Installation

### Prerequisites

- Node.js (version 12 or higher)
- npm or yarn

### Install Dependencies

```bash
# Clone the repository
git clone https://github.com/Devashish2112/CLI-tool.git
cd CLI-tool

# Navigate to the tool-tutorial directory
cd tool-tutorial

# Install dependencies
npm install
```

## 🏁 Quick Start

1. Navigate to the test project:
```bash
cd testProject
```

2. Run the start command:
```bash
node ../tool/bin/index.js --start
```

You should see:
```
Starting the app  
🚀 Starting the development server...
Server will run on port 9999
```

## 🔧 Usage

The CLI tool looks for a `tool.config.js` file in your current directory and executes commands based on your configuration.

### Basic Command Syntax

```bash
node path/to/tool/bin/index.js [COMMAND]
```

### Available Commands

- `--start` - Executes the start function from your configuration
- `--build` - Executes the build function from your configuration (if implemented)

## ⚙️ Configuration

Create a `tool.config.js` file in your project root:

```javascript
module.exports = {
  port: 3000,  // Required: Port number (1-65535)
  
  // Optional: Custom start function
  start: function() {
    console.log('🚀 Starting the development server...');
    console.log(`Server will run on port ${this.port}`);
    // Your custom start logic here
  },
  
  // Optional: Custom build function  
  build: function() {
    console.log('🔨 Building the project...');
    // Your custom build logic here
  },
  
  // Optional: Custom publish function
  publish: function() {
    console.log('📦 Publishing the project...');
    // Your custom publish logic here
  }
};
```

### Configuration Schema

The configuration file must include:

- **port** (required): A number between 1 and 65535
- Additional properties are allowed for custom functionality

### Configuration Validation

The tool automatically validates your configuration against a JSON schema. If validation fails, you'll see detailed error messages explaining what needs to be fixed.

## 📚 Examples

### Example 1: Basic Web Server Configuration

```javascript
// tool.config.js
module.exports = {
  port: 8080,
  start: function() {
    const http = require('http');
    const server = http.createServer((req, res) => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World!');
    });
    
    server.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}/`);
    });
  }
};
```

### Example 2: Build Process Configuration

```javascript
// tool.config.js
const fs = require('fs');
const path = require('path');

module.exports = {
  port: 3000,
  outputDir: 'dist',
  
  start: function() {
    console.log(`🚀 Development server starting on port ${this.port}`);
    // Start development server logic
  },
  
  build: function() {
    console.log('🔨 Building project...');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }
    console.log(`✅ Build completed! Output: ${this.outputDir}`);
  }
};
```

## 🛠️ Development

### Project Structure

```
CLI-tool/
├── tool-tutorial/          # Main project directory
│   ├── tool/              # CLI tool implementation
│   │   ├── bin/           # Executable files
│   │   │   └── index.js   # Main CLI entry point
│   │   ├── src/           # Source code
│   │   │   ├── commands/  # Command implementations
│   │   │   ├── config/    # Configuration management
│   │   │   └── logger.js  # Logging utilities
│   │   └── package.json   # Tool package configuration
│   ├── testProject/       # Example project using the tool
│   └── package.json       # Workspace root configuration
└── README.md             # This file
```

### Key Components

#### Logger (`src/logger.js`)
Provides colored logging functionality:
- `log()` - Gray text for general info
- `warning()` - Yellow text for warnings  
- `highlight()` - Cyan background for important messages
- `debug()` - Debug messages (requires DEBUG environment variable)

#### Configuration Manager (`src/config/config-mgr.js`)
- Uses cosmiconfig to locate configuration files
- Validates configuration against JSON schema
- Provides helpful error messages for invalid configurations

#### Commands (`src/commands/`)
- `start.js` - Implements the --start command functionality
- Easily extensible for new commands

### Adding New Commands

1. Create a new command file in `src/commands/`
2. Add the command-line argument in `bin/index.js`
3. Update the usage function to document the new command

### Debug Mode

Enable debug logging by setting the DEBUG environment variable:

```bash
DEBUG=* node tool/bin/index.js --start
```

Or target specific modules:
```bash
DEBUG=config:mgr,commands:start node tool/bin/index.js --start
```

## 📦 Dependencies

### Runtime Dependencies
- **ajv**: JSON schema validator
- **arg**: Command-line argument parsing
- **better-ajv-errors**: Enhanced error messages for schema validation
- **chalk**: Terminal styling and colors
- **cosmiconfig**: Configuration file discovery
- **debug**: Debug logging utility
- **package-up**: Find package.json files

### Development Dependencies
- npm workspaces for monorepo management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add appropriate debug logging for new features
- Update the schema.json if adding new configuration options
- Test with the testProject to ensure compatibility
- Update this README if adding new features or commands

## 📄 License

ISC License - see the individual package.json files for details.

## 🔍 Troubleshooting

### Common Issues

**Configuration not found:**
```
Could not find configuration, using default
```
- Ensure you have a `tool.config.js` file in your current directory
- Check that the file exports a valid configuration object

**Invalid configuration:**
```
Invalid configuration was supplied
```
- Verify your configuration includes the required `port` field
- Ensure the port number is between 1 and 65535
- Check the detailed error message for specific issues

**Command not recognized:**
- Use `node path/to/tool/bin/index.js` without arguments to see available commands
- Currently supported: `--start`, `--build`

---

Built with ❤️ using Node.js