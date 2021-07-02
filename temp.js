const { override, overrideDevServer, addLessLoader, addPostcssPlugins, fixBabelImports } = require('customize-cra');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        config.devtool = false;

        config.output.path = __dirname + '../build/';
        config.output.publicPath = './build';

        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js$|\.css$/,
                threshold: 1024,
            }),
        )
    }
    return config;
}
const devServerConfig = () => config => {
    return {
        ...config,
        compress: true,
        proxy: {
            '/api': {
                target: 'http://47.89.186.79:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            }
        }
    }
}
module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd-mobile',
            style: 'css',
        }),
        addLessLoader(),
        addPostcssPlugins([require('postcss-pxtorem')({ rootValue: 75, propList: ['*'], minPixelValue: 2, selectorBlackList: ['am-'] })]),
        addCustomize(),
    ),
    devServer: overrideDevServer(
        devServerConfig()
    )
}
