const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "productName":"Audit-rpa",//项目名，也是生成的安装文件名，即aDemo.exe
        "directories":{
          "output":"./dist"//输出文件路径
        },
        "win":{//win相关配置
          //"icon":"./shanqis.ico",//图标，当前图标在根目录下，注意这里有两个坑
          "target": [
            {
              "target": "nsis",//利用nsis制作安装程序
              "arch": [
                "x64",//64位
                "ia32"//32位
              ]
            }
          ],
          "icon": "./public/icon.ico"
        }
      }
    }
  },
  chainWebpack: config => {
    // 添加别名
  //   config.resolve.alias
  //     .set("@", resolve("src"))
  //     .set("@scss", resolve("src/assets/sass"))
  //     // .set("@assets", resolve("src/assets"))
  //     // .set("@components", resolve("src/components"))
  //     // .set("@helper", resolve("src/helper"))
  //     // .set("@views", resolve("src/views"))
  //     // .set("@router", resolve("src/router"))
  //     // .set("@store", resolve("src/store"))
  //     // .set("@utils", resolve("src/utils"))
  // },
  // css: {
  //   extract: process.env.NODE_ENV === 'production',
  //   sourceMap: false,
  //   loaderOptions: {
  //     scss: {
  //       // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
  //       // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
  //       prependData: `
  //       @import "@scss/_theme.scss";
  //       `
  //     }
  //   }
  }
}