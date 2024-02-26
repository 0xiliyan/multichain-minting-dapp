const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
    if (phase == PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            swcMinify: true,
            env: {
                isConfigurable: true
            }
        }
    }

    return {
        reactStrictMode: true,
        swcMinify: true,
        env: {
            isConfigurable: false
        }
    }
}

module.exports = nextConfig
