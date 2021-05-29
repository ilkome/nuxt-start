<script>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
  components: {
    Cropper,
    CircleStencil
  },
  data () {
    return {
      img: 'https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
      stencilProps: {
        handlers: {},
        movable: false,
        resizable: false,
        aspectRatio: 1
      },
      resizeImage: {
        adjustStencil: false
      },
      stencilSize: {
        width: 600,
        height: 600
      },
      imageRestriction: 'stencil'
    }
  },
  methods: {
    onChange ({ coordinates, canvas }) {
      console.log(coordinates, canvas)
    }
  }
}
</script>

<template lang="pug">
  Cropper(
    class="cropper"
    :auto-zoom="true"
    :image-restriction="imageRestriction"
    :resize-image="resizeImage"
    :src="img"
    :stencil-component="$options.components.CircleStencil"
    :stencil-props="stencilProps"
    :stencil-size="stencilSize"
    @change="onChange"
  )
</template>

<style scoped>
.cropper {
  width: 600px;
	height: 600px;
	background: #DDD;
}
</style>
