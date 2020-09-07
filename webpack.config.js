/*
 * @Author: Clloz
 * @Date: 2020-09-06 14:45:07
 * @LastEditTime: 2020-09-06 19:50:41
 * @LastEditors: Clloz
 * @Description:
 * @FilePath: /toy-react/webpack.config.js
 * @博观而约取，厚积而薄发，日拱一卒，日进一寸，学不可以已。
 */
module.exports = {
    entry: {
        main: './main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]],
                    },
                },
            },
        ],
    },
    mode: 'development',
    optimization: {
        minimize: false,
    },
};
