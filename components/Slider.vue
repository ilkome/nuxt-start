<script lang="ts">
import { ref, onMounted, defineComponent } from '@nuxtjs/composition-api'

import SwiperCore, { Pagination, Navigation } from 'swiper'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Pagination, Navigation])

export default defineComponent({
  name: 'Slider',

  setup () {
    const sliderRef = ref()
    const sliderObj = ref({})

    function initSlider () {
      sliderObj.value = new SwiperCore(sliderRef.value, {
        // observer: true,
        // observeParents: true,
        autoHeight: true,
        spaceBetween: 30,
        touchStartPreventDefault: false,

        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        navigation: false
      })
    }

    onMounted(initSlider)

    return {
      sliderRef
    }
  }
})
</script>

<template lang="pug">
.swiper-container(ref="sliderRef")
  .swiper-wrapper
    .swiper-slide
      .content
        h1 1
        p Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio hic placeat nostrum, commodi quaerat, explicabo unde ducimus deleniti officia magni exercitationem blanditiis sed aut architecto dolor obcaecati nobis sapiente eos doloremque vitae. Nostrum necessitatibus repellendus neque ipsam. Cum autem praesentium blanditiis itaque ipsum, nam odit aliquid exercitationem maxime fugiat dolore.
    .swiper-slide
      .content
        h1 2
        p Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio hic placeat nostrum, commodi quaerat, explicabo unde ducimus deleniti officia magni exercitationem blanditiis sed aut architecto dolor obcaecati nobis sapiente eos doloremque vitae. Nostrum necessitatibus repellendus neque ipsam. Cum autem praesentium blanditiis itaque ipsum, nam odit aliquid exercitationem maxime fugiat dolore.
    .swiper-slide
      .content
        h1 3
        p Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio hic placeat nostrum, commodi quaerat, explicabo unde ducimus deleniti officia magni exercitationem blanditiis sed aut architecto dolor obcaecati nobis sapiente eos doloremque vitae. Nostrum necessitatibus repellendus neque ipsam. Cum autem praesentium blanditiis itaque ipsum, nam odit aliquid exercitationem maxime fugiat dolore.
</template>

<style lang="stylus" scoped>
</style>
