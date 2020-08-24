<template>
  <el-color-picker
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    v-model="theme"
    :size="size"
  ></el-color-picker>
</template>

<script>
const version = require("element-ui/package.json").version;
// 初始颜色选择器色值
const ORIGINAL_THEME = "#409EFF";

export default {
  name: "ThemePicker",
  props: {
    default: {
      type: String,
      default: ORIGINAL_THEME,
    },
    size: {
      // 初始化主题，可由外部传入
      type: String,
      default: "small",
    },
  },
  data() {
    return {
      chalk: "", // content of theme-chalk css
      theme: ORIGINAL_THEME,
      showSuccess: true, // 是否弹出换肤成功消息
    };
  },
  mounted() {
    if (this.default !== null) {
      this.theme = this.default;
      this.$emit("onThemeChange", this.theme);
      this.showSuccess = false;
    }
  },
  watch: {
    theme(val, oldVal) {
      if (typeof val !== "string") {
        return;
      }
      // 获取新的颜色组
      const themeCluster = this.getThemeCluster(val.replace("#", ""));
      // 旧的颜色组
      let originalCluster = this.getThemeCluster(oldVal.replace("#", ""));

      const getHandler = (variable, id) => {
        return () => {
          // 原始颜色组
          originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace("#", "")
          );
          // 替换后的css字符串
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          );
          // style标签
          let styleTag = document.getElementById(id);

          // 如果没有就新建
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", id);
            document.head.appendChild(styleTag);
          }
          // 赋值新样式
          styleTag.innerText = newStyle;
        };
      };

      const chalkHandler = getHandler("chalk", "chalk-style");

      // 如果没有this.chalk，通过获取文件的方式，将css文本赋值到this.chalk；如果有，对this.chalk进行替换赋值
      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;

        this.getCSSString(url, chalkHandler, "chalk");
      } else {
        chalkHandler();
      }
      // 筛选出文本中包含原主题字符串且不包含Chalk Variables字符串的style标签
      const styles = [].slice
        .call(document.querySelectorAll("style"))
        .filter((style) => {
          const text = style.innerText;

          return (
            new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
          );
        });
      // 对标签内的css文本进行更新
      styles.forEach((style) => {
        const { innerText } = style;

        if (typeof innerText !== "string") {
          return;
        }
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        );
      });

      // 响应外部操作
      this.$emit("onThemeChange", val);
      if (this.showSuccess) {
        this.$message({
          message: "换肤成功",
          type: "success",
        });
      } else {
        this.showSuccess = true;
      }
    },
  },
  methods: {
    /**
     * @param style {string} - css字符串
     * @param oldCluster {array} - 旧颜色群
     * @param newCluster {array} - 新颜色群
     */
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;

      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },

    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
          callback();
        }
      };
      xhr.open("GET", url);
      xhr.send();
    },
    // 获取颜色组
    getThemeCluster(theme) {
      // 淡色
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };
      // 暗色
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      let clusters = [theme];

      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    },
  },
};
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>