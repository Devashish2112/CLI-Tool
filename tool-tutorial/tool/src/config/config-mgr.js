const path = require('path');
const fs = require('fs');

function getConfig() {
    // Look for tool.config.js in the current working directory
    const configPath = path.resolve(process.cwd(), 'tool.config.js');
    
    // Clear require cache to allow config reloading
    if (require.cache[configPath]) {
        delete require.cache[configPath];
    }
    
    try {
        // Check if file exists
        if (!fs.existsSync(configPath)) {
            throw new Error(`Configuration file not found at ${configPath}`);
        }
        
        return require(configPath);
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            throw new Error(`Configuration file not found at ${configPath}`);
        }
        throw error;
    }
}

module.exports = { getConfig };