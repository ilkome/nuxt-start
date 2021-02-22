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
    const { initTouchModal, closeModal } = useTouchClose()

    const wrappers = reactive({
      container: ref(null),
      content: ref(null),
      handler: ref(null),
      overflow: ref(null),
      wrap: ref(null)
    })

    watch(isShow, (value) => {
      value && setTimeout(() => {
        initTouchModal({
          ...toRefs(wrappers),
          onClose: listeners.onClose
        })
      }, 10)
    }, { immediate: true })

    return {
      ...toRefs(wrappers),
      closeModal
    }
  }
}
</script>

<template lang="pug">
.baseModal(
  v-show="isShow"
  ref="container"
)
  transition(name="baseModalOveflowAnim" appear)
    .baseModal__overflow(
      ref="overflow"
      v-show="isShow"
      @click="closeModal"
    )

  transition(name="baseModalWrapAnim" appear)
    .baseModal__wrap(
      v-show="isShow"
      ref="wrap"
    )
      .baseModal__handler(@click="closeModal" ref="handler")
      .baseModal__closure(@click="closeModal"): .i.i_close

      .baseModal__inside(ref="content")
        .baseModal__content
          slot(name="content")
</template>

<style lang="stylus" scoped>
@import "~assets/stylus/base"

.baseModalOveflowAnim
  &-enter-active
  &-leave-active
    transition all 250ms $transition-style

  &-enter
  &-leave-to
    opacity 0

.baseModalWrapAnim
  &-enter-active
  &-leave-active
    opacity 0
    transform translate3d(0, 50px, 0)
    transition opacity 300ms $transition-style, transform 250ms $transition-style

  &-enter-to
    transform translate3d(0, 0, 0)

  &-leave
  &-enter-to
  &-leave-to
    opacity 1

  &-leave-to
    transform translate3d(0, 100%, 0)
    transition opacity 400ms $transition-style, transform 400ms $transition-style

$base = 16px
$colorOpacity1 = red
$colorBase4 = blue
$colorBaseWhite = yellow

.baseModal
  z-index 110
  position absolute
  top 0
  left 0
  width 100%
  height 100%

  &__overflow
    z-index 1
    cursor s-resize
    position absolute
    left 0
    bottom 0
    width 100%
    height 100%
    background $colorOpacity1
    anim(500ms)

  &__wrap
    z-index 2
    position absolute
    left 0
    bottom 0
    display flex
    flex-flow column
    width 100%
    max-height 96%
    padding-top 0
    border-radius $base $base 0 0

    &._anim
      anim(200ms)

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

    .i
      color $colorBaseWhite
      font-size 10px

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

  &__content
    display flex
    flex-flow column
    flex-grow 1

  &__title
    display flex
    align-items center
    justify-content center
    min-height 30px
    padding 0 $base
    padding-bottom $base
    typoTitle()
    font-size 16px
    text-align center
</style>
