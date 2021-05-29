<script>
import { ref, watch, reactive, toRefs } from '@nuxtjs/composition-api'
import useTouchClose from './useTouchClose.ts'

export default {
  name: 'BaseModal',

  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },

  setup (props, { listeners }) {
    const { isShow } = toRefs(props)
    const { init, close } = useTouchClose()

    const wrappers = reactive({
      container: ref(null),
      content: ref(null),
      handler: ref(null),
      overlay: ref(null),
      wrap: ref(null)
    })

    watch(isShow, (value) => {
      value && setTimeout(() => {
        init({
          ...toRefs(wrappers),
          onClose: listeners.onClose
        })
      }, 10)
    }, { immediate: true })

    return {
      ...toRefs(wrappers),
      close
    }
  }
}
</script>

<template lang="pug">
.baseModal(
  v-show="isShow"
  ref="container"
)
  .baseModal__overlay(
    ref="overlay"
    v-show="isShow"
    @click="close"
  )

  .baseModal__wrap(
    v-show="isShow"
    ref="wrap"
  )
    .baseModal__handler(@click="close" ref="handler")
    .baseModal__closure(@click="close"): .i.i_close

    .baseModal__inside(ref="content")
      .baseModal__content
        slot(name="content")
</template>

<style lang="stylus" scoped>
@import "../assets/stylus/base"

$base = 16px
$colorOpacity1 = red
$colorBase4 = blue
$colorBaseWhite = yellow

.baseModal
  overflow hidden
  z-index 110
  position absolute
  top 0
  left 0
  width 100%
  height 100%

  &__overlay
    z-index 1
    cursor s-resize
    opacity 0
    position absolute
    left 0
    bottom 0
    width 100%
    height 100%
    background $colorOpacity1

  &__wrap
    z-index 2
    opacity 0
    position absolute
    left 0
    bottom 0
    display flex
    flex-flow column
    width 100%
    max-height 96%
    padding-top 0
    border-radius $base $base 0 0

  &__handler
    z-index 3
    position absolute
    top -16px
    right 0
    display flex
    align-items center
    justify-content center
    width 100%
    height 16px
    user-select none

    &:after
      content ""
      width 36px
      height 4px
      margin 8px 0
      background $colorBase4
      border-radius 4px

  &__closure
    z-index 3
    cursor pointer
    position absolute
    top 10px
    right 10px
    display flex
    align-items center
    justify-content center
    width 24px
    height 24px
    color $colorBase3
    background #bebebe
    border-radius 50%

  &__inside
    overflow hidden
    overflowScrollY()
    position relative
    height 100%
    padding 0
    padding-top $base
    padding-bottom $base
    background $colorBaseWhite
    border-radius $base $base 0 0
    user-select none

  &__content
    display flex
    flex-flow column
    flex-grow 1
</style>
