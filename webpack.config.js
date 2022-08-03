'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {                                                                   /* какие модули будем использовать */
    rules: [                                                                  /* правила для опред. файлов */
      {
        test: /\.m?js$/,                                                      /* находим js-файлы */
        exclude: /(node_modules|bower_components)/,                           /* перечень исключений из этой выборки */
        use: {                                                                /* описание процесса */
          loader: 'babel-loader',                                             /* будем использовать Loader (связывает webpack с babel) */
          options: {                                                          /* укажем нужные опции */
            presets: [['@babel/preset-env', {                                 /* используем самый распространённый пресет */
                debug: true,                                                  /* дебаг позволяет во время компиляции следить за происходящим */
                corejs: 3,                                                    /* corejs-библиотека содержит всевозможные полифиллы */
                useBuiltIns: "usage"                                          /* интелектуально выбирает полифиллы только те, которые нужны */
            }]]
          }
        }
      }
    ]
  }
};
