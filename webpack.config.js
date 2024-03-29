const fs = require('fs');
const path = require('path');
const ConcatPlugin = require('webpack-concat-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { InsertConcatAssetsWebpackPlugin, NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
        // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
        const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
        const minimizeOptions = {
            autoprefixer: false,
            safe: true,
            mergeLonghand: false,
            discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
        };
        return [
            postcssUrl({
                url: (URL) => {
                    const { url } = URL;
                    // Only convert root relative URLs, which CSS-Loader won't process into require().
                    if (!url.startsWith('/') || url.startsWith('//')) {
                        return URL.url;
                    }
                    if (deployUrl.match(/:\/\//)) {
                        // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                        return `${deployUrl.replace(/\/$/, '')}${url}`;
                    }
                    else if (baseHref.match(/:\/\//)) {
                        // If baseHref contains a scheme, include it as is.
                        return baseHref.replace(/\/$/, '') +
                            `/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
                    }
                    else {
                        // Join together base-href, deploy-url and the original URL.
                        // Also dedupe multiple slashes into single ones.
                        return `/${baseHref}/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
                    }
                }
            }),
            autoprefixer(),
            customProperties({ preserve: true })
        ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
    };




module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "symlinks": true,
    "alias": rxPaths(),
    "mainFields": [
      "browser",
      "module",
      "main"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "alias": rxPaths()
  },
  "entry": {
    "main": [
      "./src\\main.ts"
    ],
    "polyfills": [
      "./src\\polyfills.ts"
    ],
    "styles": [
      "./node_modules\\bootstrap\\dist\\css\\bootstrap.min.css",
      "./node_modules\\bootstrap\\dist\\css\\bootstrap.css",
      "./node_modules\\font-awesome\\css\\font-awesome.css",
      "./node_modules\\snazzy-info-window\\dist\\snazzy-info-window.css",
      "./src\\styles.css",
      "./src\\assets\\css\\main.css",
      "./src\\assets\\css\\custom.css",
      "./src\\assets\\css\\icon.css"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js",
    "crossOriginLoading": false
  },
  "module": {
    "rules": [
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader",
        "options": {
          "name": "[name].[hash:20].[ext]",
          "limit": 10000
        }
      },
      {
        "exclude": [
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.min.css"),
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.css"),
          path.join(process.cwd(), "node_modules\\font-awesome\\css\\font-awesome.css"),
          path.join(process.cwd(), "node_modules\\snazzy-info-window\\dist\\snazzy-info-window.css"),
          path.join(process.cwd(), "src\\styles.css"),
          path.join(process.cwd(), "src\\assets\\css\\main.css"),
          path.join(process.cwd(), "src\\assets\\css\\custom.css"),
          path.join(process.cwd(), "src\\assets\\css\\icon.css")
        ],
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins,
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.min.css"),
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.css"),
          path.join(process.cwd(), "node_modules\\font-awesome\\css\\font-awesome.css"),
          path.join(process.cwd(), "node_modules\\snazzy-info-window\\dist\\snazzy-info-window.css"),
          path.join(process.cwd(), "src\\styles.css"),
          path.join(process.cwd(), "src\\assets\\css\\main.css"),
          path.join(process.cwd(), "src\\assets\\css\\custom.css"),
          path.join(process.cwd(), "src\\assets\\css\\icon.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins,
              "sourceMap": false
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.min.css"),
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.css"),
          path.join(process.cwd(), "node_modules\\font-awesome\\css\\font-awesome.css"),
          path.join(process.cwd(), "node_modules\\snazzy-info-window\\dist\\snazzy-info-window.css"),
          path.join(process.cwd(), "src\\styles.css"),
          path.join(process.cwd(), "src\\assets\\css\\main.css"),
          path.join(process.cwd(), "src\\assets\\css\\custom.css"),
          path.join(process.cwd(), "src\\assets\\css\\icon.css")
        ],
        "test": /\.less$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins,
              "sourceMap": false
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.min.css"),
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.css"),
          path.join(process.cwd(), "node_modules\\font-awesome\\css\\font-awesome.css"),
          path.join(process.cwd(), "node_modules\\snazzy-info-window\\dist\\snazzy-info-window.css"),
          path.join(process.cwd(), "src\\styles.css"),
          path.join(process.cwd(), "src\\assets\\css\\main.css"),
          path.join(process.cwd(), "src\\assets\\css\\custom.css"),
          path.join(process.cwd(), "src\\assets\\css\\icon.css")
        ],
        "test": /\.styl$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins,
              "sourceMap": false
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.min.css"),
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.css"),
          path.join(process.cwd(), "node_modules\\font-awesome\\css\\font-awesome.css"),
          path.join(process.cwd(), "node_modules\\snazzy-info-window\\dist\\snazzy-info-window.css"),
          path.join(process.cwd(), "src\\styles.css"),
          path.join(process.cwd(), "src\\assets\\css\\main.css"),
          path.join(process.cwd(), "src\\assets\\css\\custom.css"),
          path.join(process.cwd(), "src\\assets\\css\\icon.css")
        ],
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins,
              "sourceMap": false
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.min.css"),
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.css"),
          path.join(process.cwd(), "node_modules\\font-awesome\\css\\font-awesome.css"),
          path.join(process.cwd(), "node_modules\\snazzy-info-window\\dist\\snazzy-info-window.css"),
          path.join(process.cwd(), "src\\styles.css"),
          path.join(process.cwd(), "src\\assets\\css\\main.css"),
          path.join(process.cwd(), "src\\assets\\css\\custom.css"),
          path.join(process.cwd(), "src\\assets\\css\\icon.css")
        ],
        "test": /\.scss$|\.sass$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins,
              "sourceMap": false
            }
          },
          {
            "loader": "sass-loader",
            "options": {
              "sourceMap": false,
              "precision": 8,
              "includePaths": []
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.min.css"),
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.css"),
          path.join(process.cwd(), "node_modules\\font-awesome\\css\\font-awesome.css"),
          path.join(process.cwd(), "node_modules\\snazzy-info-window\\dist\\snazzy-info-window.css"),
          path.join(process.cwd(), "src\\styles.css"),
          path.join(process.cwd(), "src\\assets\\css\\main.css"),
          path.join(process.cwd(), "src\\assets\\css\\custom.css"),
          path.join(process.cwd(), "src\\assets\\css\\icon.css")
        ],
        "test": /\.less$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins,
              "sourceMap": false
            }
          },
          {
            "loader": "less-loader",
            "options": {
              "sourceMap": false
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.min.css"),
          path.join(process.cwd(), "node_modules\\bootstrap\\dist\\css\\bootstrap.css"),
          path.join(process.cwd(), "node_modules\\font-awesome\\css\\font-awesome.css"),
          path.join(process.cwd(), "node_modules\\snazzy-info-window\\dist\\snazzy-info-window.css"),
          path.join(process.cwd(), "src\\styles.css"),
          path.join(process.cwd(), "src\\assets\\css\\main.css"),
          path.join(process.cwd(), "src\\assets\\css\\custom.css"),
          path.join(process.cwd(), "src\\assets\\css\\icon.css")
        ],
        "test": /\.styl$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins,
              "sourceMap": false
            }
          },
          {
            "loader": "stylus-loader",
            "options": {
              "sourceMap": false,
              "paths": []
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new ConcatPlugin({
      "uglify": false,
      "sourceMap": true,
      "name": "scripts",
      "fileName": "[name].bundle.js",
      "filesToConcat": [
        "node_modules\\jquery\\dist\\jquery.min.js",
        "node_modules\\tether\\dist\\js\\tether.min.js",
        "src\\assets\\js\\jquery.dropotron.min.js",
        "src\\assets\\js\\jquery.scrolly.min.js",
        "src\\assets\\js\\jquery.onvisible.min.js",
        "src\\assets\\js\\skel.min.js",
        "src\\assets\\js\\util.js",
        "src\\assets\\js\\main.js"
      ]
    }),
    new InsertConcatAssetsWebpackPlugin([
      "scripts"
    ]),
    new CopyWebpackPlugin([
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      },
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "data/**/*",
          "dot": true
        }
      },
      {
        "context": "src",
        "to": "",
        "from": {
          "glob": "favicon.ico",
          "dot": true
        }
      }
    ], {
      "ignore": [
        ".gitkeep",
        "**/.DS_Store",
        "**/Thumbs.db"
      ],
      "debug": "warning"
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": false
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src\\index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
      "chunks": [
        "main"
      ]
    }),
    new SourceMapDevToolPlugin({
      "filename": "[file].map[query]",
      "moduleFilenameTemplate": "[resource-path]",
      "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
      "sourceRoot": "webpack:///"
    }),
    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    }),
    new NamedModulesPlugin({}),
    new AotPlugin({
      "mainPath": "main.ts",
      "replaceExport": false,
      "hostReplacementPaths": {
        "environments\\environment.ts": "environments\\environment.ts"
      },
      "sourceMap": true,
      "exclude": [],
      "tsConfigPath": "src\\tsconfig.app.json",
      "skipCodeGeneration": true,
      "compilerOptions": {}
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": true
  }
};
