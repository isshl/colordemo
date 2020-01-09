<template>
  <div id="colorlist">
    <nav id="nav">
      <ul>
        <li v-for="(color, index) in colors" :key="index">
          <router-link
            :to="{ name: '颜色详情', params: { colorname: color.name[0] } }"
          >
            <div @mouseenter="change" @mouseleave="reset">
              <canvas :id="'canvas' + index" width="50" height="278"></canvas>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'colorlist',
  props: { colors: Array },
  mounted() {
    // 默认显示
    for (let i = 0; i < this.colors.length; i++) {
      let canvas = document.getElementById('canvas' + i)
      let ctx = canvas.getContext('2d')
      ctx.fillStyle =
        'rgb(' +
        this.colors[i].RGB[0] +
        ',' +
        this.colors[i].RGB[1] +
        ',' +
        this.colors[i].RGB[2] +
        ')'
      // 矩形
      ctx.beginPath()
      ctx.fillRect(0, 0, 58, 6)

      // 数字编号
      ctx.rotate((90 * Math.PI) / 180)
      ctx.beginPath()
      ctx.font = '12px Futura'
      ctx.fillText(this.colors[i].number, 20, -38, 139)
      // HEX值
      ctx.beginPath()
      ctx.font = '12px Futura'
      ctx.fillStyle = 'rgb(255,255,255)'
      ctx.fillText(this.colors[i].HEX, 150, -1, 139)
      // 日文名称
      ctx.beginPath()
      ctx.font = '18px Futura'
      ctx.fillText(this.colors[i].name[1], 150, -35, 128)
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      // 中文名称
      let text = [...this.colors[i].name[0]]
      ctx.fillStyle = 'rgb(255,255,255)'
      ctx.font = '15px STSong'
      for (let j = text.length - 1; j >= 0; j--) {
        ctx.beginPath()
        ctx.fillText(text[text.length - 1 - j], 35, 136 - 16 * j, 136)
      }

      // CMYK的圆环
      for (let k = 0; k < this.colors[i].CMYK.length; k++) {
        ctx.beginPath()
        ctx.arc(13, 16 * (2 * k + 1) + 15, 9, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,.2)'
        ctx.lineWidth = 6.5
        ctx.stroke()

        if (this.colors[i].CMYK[k] !== 0) {
          ctx.beginPath()
          ctx.arc(
            13,
            16 * (2 * k + 1) + 15,
            9,
            (3 * Math.PI) / 2,
            (this.colors[i].CMYK[k] * 2 * Math.PI) / 100 - Math.PI / 2
          )
          ctx.strokeStyle = 'rgb(255,255,255)'
          ctx.lineWidth = 6.5
          ctx.stroke()
        }
      }
      // RGB
      for (let n = this.colors[i].RGB.length - 1; n >= 0; n--) {
        ctx.beginPath()
        ctx.fillStyle = 'rgba(255,255,255,.2)'
        ctx.fillRect(17 + (this.colors[i].RGB.length - 1 - n) * 3, 150, 1, 128)

        if (this.colors[i].RGB[n] !== 0) {
          ctx.beginPath()
          ctx.fillStyle = 'rgb(255,255,255)'
          ctx.fillRect(
            17 + (this.colors[i].RGB.length - 1 - n) * 3,
            150,
            1,
            (this.colors[i].RGB[n] * 128) / 255
          )
        }
      }
    }
  },
  methods: {
    change(event) {
      if (event.currentTarget.tagName === 'DIV') {
        let canvasid = event.currentTarget.firstElementChild.getAttribute('id')
        let i = parseInt(canvasid.slice(6))
        let canvas = document.getElementById(canvasid)
        let ctx = canvas.getContext('2d')
        // 清空
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle =
          'rgb(' +
          this.colors[i].RGB[0] +
          ',' +
          this.colors[i].RGB[1] +
          ',' +
          this.colors[i].RGB[2] +
          ')'
        // 矩形
        ctx.beginPath()
        ctx.fillRect(0, 0, 58, 6)
        // 数字编号
        ctx.rotate((90 * Math.PI) / 180)
        ctx.beginPath()
        ctx.font = '12px Futura'
        ctx.fillText(this.colors[i].number, 20, -38, 139)
        // HEX
        ctx.beginPath()
        ctx.font = '12px Futura'
        ctx.fillText(this.colors[i].HEX, 150, -1, 139)
        // 日文名称
        ctx.beginPath()
        ctx.font = '18px Futura'
        ctx.fillText(this.colors[i].name[1], 150, -35, 128)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        // 中文名称
        let text = [...this.colors[i].name[0]]
        ctx.font = '15px STSong'
        for (let j = text.length - 1; j >= 0; j--) {
          ctx.beginPath()
          ctx.fillText(text[text.length - 1 - j], 35, 136 - 16 * j, 136)
        }
        // CMYK圆环
        for (let k = 0; k < this.colors[i].CMYK.length; k++) {
          ctx.beginPath()
          ctx.arc(13, 16 * (2 * k + 1) + 15, 9, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(255,255,255,.2)'
          ctx.lineWidth = 6.5
          ctx.stroke()

          if (this.colors[i].CMYK[k] !== 0) {
            ctx.beginPath()
            ctx.arc(
              13,
              16 * (2 * k + 1) + 15,
              9,
              (3 * Math.PI) / 2,
              (this.colors[i].CMYK[k] * 2 * Math.PI) / 100 - Math.PI / 2
            )
            ctx.strokeStyle =
              'rgb(' +
              this.colors[i].RGB[0] +
              ',' +
              this.colors[i].RGB[1] +
              ',' +
              this.colors[i].RGB[2] +
              ')'
            ctx.lineWidth = 6.5
            ctx.stroke()
          }
        }
        // RGB
        for (let n = this.colors[i].RGB.length - 1; n >= 0; n--) {
          ctx.beginPath()
          ctx.fillStyle = 'rgba(255,255,255,.2)'
          ctx.fillRect(
            17 + (this.colors[i].RGB.length - 1 - n) * 3,
            150,
            1,
            128
          )

          if (this.colors[i].RGB[n] !== 0) {
            ctx.beginPath()
            ctx.fillStyle =
              'rgb(' +
              this.colors[i].RGB[0] +
              ',' +
              this.colors[i].RGB[1] +
              ',' +
              this.colors[i].RGB[2] +
              ')'
            ctx.fillRect(
              17 + (this.colors[i].RGB.length - 1 - n) * 3,
              150,
              1,
              (this.colors[i].RGB[n] * 128) / 255
            )
          }
        }
      }
    },
    reset(event) {
      if (event.currentTarget.tagName === 'DIV') {
        let canvasid = event.currentTarget.firstElementChild.getAttribute('id')
        let i = parseInt(canvasid.slice(6))
        let canvas = document.getElementById(canvasid)
        let ctx = canvas.getContext('2d')
        // 清空
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle =
          'rgb(' +
          this.colors[i].RGB[0] +
          ',' +
          this.colors[i].RGB[1] +
          ',' +
          this.colors[i].RGB[2] +
          ')'
        // 矩形
        ctx.beginPath()
        ctx.fillRect(0, 0, 58, 6)
        // 数字编号
        ctx.rotate((90 * Math.PI) / 180)
        ctx.beginPath()
        ctx.font = '12px Futura'
        ctx.fillText(this.colors[i].number, 20, -38, 139)
        // HEX
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.beginPath()
        ctx.font = '12px Futura'
        ctx.fillText(this.colors[i].HEX, 150, -1, 139)
        //日文名称
        ctx.beginPath()
        ctx.font = '18px Futura'
        ctx.fillText(this.colors[i].name[1], 150, -35, 128)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        // 中文名
        let text = [...this.colors[i].name[0]]
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.font = '15px STSong'
        for (let j = 0; j < text.length; j++) {
          ctx.beginPath()
          ctx.fillText(text[text.length - 1 - j], 35, 136 - 16 * j, 136)
        }

        // CMYK圆环
        for (let k = 0; k < this.colors[i].CMYK.length; k++) {
          ctx.beginPath()
          ctx.arc(13, 16 * (2 * k + 1) + 15, 9, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(255,255,255,.2)'
          ctx.lineWidth = 6.5
          ctx.stroke()

          if (this.colors[i].CMYK[k] !== 0) {
            ctx.beginPath()
            ctx.arc(
              13,
              16 * (2 * k + 1) + 15,
              9,
              (3 * Math.PI) / 2,
              (this.colors[i].CMYK[k] * 2 * Math.PI) / 100 - Math.PI / 2
            )
            ctx.strokeStyle = 'rgb(255,255,255)'
            ctx.lineWidth = 6.5
            ctx.stroke()
          }
        }
        // RGB
        for (let n = this.colors[i].RGB.length - 1; n >= 0; n--) {
          ctx.beginPath()
          ctx.fillStyle = 'rgba(255,255,255,.2)'
          ctx.fillRect(
            17 + (this.colors[i].RGB.length - 1 - n) * 3,
            150,
            1,
            128
          )

          if (this.colors[i].RGB[n] !== 0) {
            ctx.beginPath()
            ctx.fillStyle = 'rgb(255,255,255)'
            ctx.fillRect(
              17 + (this.colors[i].RGB.length - 1 - n) * 3,
              150,
              1,
              (this.colors[i].RGB[n] * 128) / 255
            )
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
