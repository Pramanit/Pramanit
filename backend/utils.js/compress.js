const zlib = require('zlib');

// Compress the input with maximum compression
const compress = (input) => {
    return zlib.deflateSync(input, {
        level: 9,       // Maximum compression level
        memLevel: 9,    // Maximum memory usage for compression
        strategy: zlib.constants.Z_DEFAULT_STRATEGY, // Default compression strategy
    });
};

// Decompress the input
const decompress = (input) => {
    return zlib.inflateSync(input).toString(); // Decompress and return original string
};

module.exports = { compress, decompress };
