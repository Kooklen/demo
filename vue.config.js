const path = require("path")

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 代码分析
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")

// 打包进度条，打包时间
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const chalk = require("chalk")

const isProd = process.env.NODE_ENV === "production"

module.exports = {
  outputDir: "dist",
  parallel: true,
  publicPath: "./",
  productionSourceMap: false, // 关闭productionSourceMap
  lintOnSave:false,
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("_c", resolve("src/components"))
      .set("_cc", resolve("src/components/common"))
      .set("_a", resolve("src/assets"))
      .set("_u", resolve("src/utils"))
      .set("_font", resolve("src/assets/font"))
      .set("_css", resolve("src/assets/css"))
      .set("_img", resolve("src/assets/img"))
      .set("_api", resolve("src/api"))
      .set("_d", resolve("src/datadict"))

    // vuecli 3默认开启 prefetch(预先加载模块)，提前获取用户未来可能会访问的内容
    // 在首屏会把这十几个路由文件，都一口气下载了,所以我们要关闭这个功能（移除prefetch插件）
    config.plugins.delete("prefetch")
    config.plugins.delete("preload")

    // // 压缩图片
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
    //   .end();
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin，默认false
    extract: isProd
      ? {
          ignoreOrder: true
        }
      : false,

    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            // 这里是配置项，详见官方文档
            rootValue: 16, // 换算的基数
            selectorBlackList: ["weui", "mu"], // 忽略转换正则匹配项
            propList: ["*"]
          })
        ]
      }
    }
  },
  devServer: {
    port: "8090",
    proxy: {
      '/api/auth': {
        target: 'https://h3c.8800.org:1700',
        changeOrigin: true
      },
      "/auth": {
        target: "http://h3c.8800.org:8180/",
        changeOrigin: true
      },
      "api/file-manager": {
        target: "http://h3c.8800.org:8401/",
        changeOrigin: true
      },
      "/api/aam": {
        target: "http://h3c.8800.org:8092/",
        changeOrigin: true
      },
      "/api": {
        target: "http://h3c.8800.org:8093/",
        changeOrigin: true
      },

    }

  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("src/assets/style/mixin.less")]
    }
  },
  configureWebpack: config => {
    // 打包进度条，打包时间统计
    config.plugins.push(
      new ProgressBarPlugin({
        format: " build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)",
        clear: false
      })
    )

    if (isProd) {
      // 打包后代码体积分析
      if (process.env.npm_config_report) {
        config.plugins.push(
          new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
            // analyzerPort: 6666
          })
        )
      }
    }
  }
}
