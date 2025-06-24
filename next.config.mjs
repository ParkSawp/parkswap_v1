/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer }) => {
        if (!isServer) {
            // Désactiver complètement la minification pour les workers
            config.module.rules.push({
                test: /HeartbeatWorker\..*\.js$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/media/[name][ext]',
                },
            });

            if (!dev) {
                // Désactiver SWC minify pour ce build
                config.optimization.minimize = false;
            }
        }
        return config;
    },

    swcMinify: false, // Désactiver SWC minify temporairement
};

export default nextConfig;
