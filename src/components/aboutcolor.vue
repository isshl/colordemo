<template>
  <div id="colormenu">
    <article id="aboutcolor" v-if="colorObject.CMYK">
      <dl>
        <img src="../img/bdr_w_50.png" />
        <dt>{{ a[0] }}</dt>
        <dt>
          <el-progress
            :stroke-width="2"
            type="circle"
            :color="CMYK[0]"
            :width="50"
            stroke-linecap="butt"
            :percentage="colorObject.CMYK[0]"
            show-text:true
          ></el-progress>
        </dt>

        <img src="../img/bdr_w_50.png" />
        <dt>{{ a[1] }}</dt>
        <dt>
          <el-progress
            :stroke-width="2"
            type="circle"
            :color="CMYK[1]"
            :width="50"
            stroke-linecap="butt"
            :percentage="colorObject.CMYK[1]"
            show-text:true
          ></el-progress>
        </dt>

        <img src="../img/bdr_w_50.png" />
        <dt>{{ a[2] }}</dt>
        <dt>
          <el-progress
            :stroke-width="2"
            type="circle"
            :color="CMYK[2]"
            :width="50"
            stroke-linecap="butt"
            :percentage="colorObject.CMYK[2]"
            show-text:true
          ></el-progress>
        </dt>

        <img src="../img/bdr_w_50.png" />
        <dt>{{ a[3] }}</dt>
        <dt>
          <el-progress
            :stroke-width="2"
            type="circle"
            :color="CMYK[3]"
            :width="50"
            stroke-linecap="butt"
            :percentage="colorObject.CMYK[3]"
            show-text:true
          ></el-progress>
        </dt>
      </dl>

      <el-tooltip
        class="item"
        effect="dark"
        :content="colorObject.HEX"
        placement="right"
        :open-delay="1"
        offset="10"
      >
        <dl>
          <img src="../img/bdr_w_50.png" />
          <dt>{{ b[0] }}</dt>
          <dd>{{ colorObject.RGB[0] }}</dd>
          <img src="../img/bdr_w_50.png" />
          <dt>{{ b[1] }}</dt>
          <dd>{{ colorObject.RGB[1] }}</dd>
          <img src="../img/bdr_w_50.png" />
          <dt>{{ b[2] }}</dt>
          <dd>{{ colorObject.RGB[2] }}</dd>
          <img src="../img/bdr_w_50.png" />
        </dl>
      </el-tooltip>
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Color from 'color-js'
import TWEEN from '@tweenjs/tween.js'

export default {
  props: { colorname: String },
  data() {
    return {
      colorObject: Object,
      percentage: 0,
      CMYK: [
        'rgb(0, 160, 233)',
        'rgb(228,0,127)',
        'rgb(255,241,0)',
        'rgb(34,24,21)'
      ],
      a: ['C', 'M', 'Y', 'K'],
      b: ['R', 'G', 'B'],
      i: Number,
      color: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
      },
      tweenedColor: {}
    }
  },
  created: function() {
    this.tweenedColor = Object.assign({}, this.color)
  },
  computed: {
    ...mapGetters(['colors']),
    tweenedCSSColor: function() {
      return new Color({
        red: this.tweenedColor.red,
        green: this.tweenedColor.green,
        blue: this.tweenedColor.blue,
        alpha: this.tweenedColor.alpha
      }).toCSS()
    }
  },
  mounted() {
    // 随机选取颜色
    let i = Math.floor(Math.random() * this.colors.length)
    this.colorObject = this.colors[i]
    this.i = i
    document.body.setAttribute(
      'style',
      'background-color:' + this.colorObject.HEX
    )
  },
  watch: {
    colorname: function(val) {
      for (let i = 0; i < this.colors.length; i++) {
        if (this.colors[i].name[0] === val) {
          this.colorObject = this.colors[i]
          this.i = i
        }
      }
    },
    colorObject: function(val) {
      this.color = new Color(val.HEX).toRGB()
    },
    color: function() {
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween(this.tweenedColor)
        .to(this.color, 1500)
        .onUpdate(() => {
          document.body.setAttribute(
            'style',
            'background-color:' + this.tweenedCSSColor
          )
        })
        .start()
      animate()
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
dd {
  text-align: end;
}
</style>
