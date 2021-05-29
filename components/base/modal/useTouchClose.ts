import gsap from 'gsap'

export default function useOnTouch () {
  let containerHeight = 0
  let isDragging = false
  let isDragByHandler = false
  let initialY = 0
  let currentY = 0

  let config = {
    dragOffset: 16,
    whaitForScrollClassName: 'waitForScroll',
    doNotTouchClassName: 'doNotclose'
  }

  let container: (null | any) = null
  let overlay: (null | any) = null
  let wrap: (null | any) = null
  let content: (null | any) = null
  let onClose: (null | any) = null
  let handler: (null | any) = null
  let isInit: Boolean = false

  /**
   * Get Opacity
   */
  function getOpacity (): number {
    const diff = (containerHeight - currentY) / (containerHeight / 100)
    const diffTrunc = Math.trunc(diff)
    const opacity = diffTrunc === 100 ? 1 : diffTrunc >= 10 ? `0.${diffTrunc}` : `0.0${diffTrunc}`
    return Number(opacity)
  }

  /**
     * Modal Animation
     */
  async function openAnimation () {
    const tl = gsap.timeline()
    tl.to(overlay.value, {
      opacity: 1,
      duration: 0.2
    })

    tl.fromTo(wrap.value, {
      transform: 'translateY(10px)',
      opacity: 0
    }, {
      opacity: 1,
      transform: 'translateY(0)',
      duration: 0.1,
      ease: 'power1.inOut'
    }, '-=0.15')

    return await tl
  }

  /**
   * Moving Animation
   */
  function movingAnimation () {
    gsap.to(wrap.value, {
      transform: `translateY(${currentY}px)`,
      duration: 0
    })
    gsap.to(overlay.value, {
      opacity: getOpacity(),
      duration: 0
    })
  }

  /**
   * Closing Animation
   */
  async function closingAnimation () {
    await gsap.to(wrap.value, {
      opacity: 0,
      scale: 0.99,
      transform: `translateY(${currentY + 100}px)`,
      duration: 0.15
    })
    return await gsap.to(overlay.value, {
      opacity: 0,
      duration: 0.2
    })
  }

  /**
   * Opening Animation
   */
  function openingAnimation () {
    gsap.to(wrap.value, {
      transform: 'translateY(0)',
      duration: 0.2
    })
    gsap.to(overlay.value, {
      opacity: 1,
      duration: 0.2
    })
  }

  /**
   * Init
   * @param props
   */
  async function init (props: any) {
    container = props.container
    overlay = props.overlay
    wrap = props.wrap
    content = props.content
    onClose = props.onClose
    handler = props.handler

    if (props.config) {
      config = {
        ...config,
        ...props.config.value
      }
    }

    if (!isInit) {
      isInit = true
      containerHeight = wrap.value.clientHeight
      await openAnimation()

      // touch events
      container.value.addEventListener('touchstart', onDragStart)
      container.value.addEventListener('touchmove', onDragging)
      container.value.addEventListener('touchend', onDragEnd)

      // mouse events
      container.value.addEventListener('mousedown', onDragStart)
      container.value.addEventListener('mousemove', onDragging)
      container.value.addEventListener('mouseup', onDragEnd)
      container.value.addEventListener('mouseleave', onDragEnd)
    }
  }

  /**
   * Drag start handler
   * @param event
   */
  function onDragStart (event: any): void {
    isDragging = false

    // Always use pan with handler
    isDragByHandler = handler.value && event.target.classList.contains(handler.value.className)
    if (isDragByHandler) {
      isDragByHandler = true
      isDragging = true
    }
    // Check if should drag modal
    else {
      // Do not close modal inside this div
      if (event.target.closest(`.${config.doNotTouchClassName}`)) { return }

      // Stop drag when content has scroll
      // wait until content scroll up to top
      if (content.value) {
        if (content.value.scrollTop > 0) { return }

        // wait until content scroll up inside
        const waitForScroll = content.value.querySelector(`.${config.whaitForScrollClassName}`)
        if (waitForScroll && waitForScroll.scrollTop > 0) { return }

        // wait until content scroll up inside Swiper
        const waitForScrollSlider = content.value.querySelector(`.swiper-slide-active .${config.whaitForScrollClassName}`)
        if (waitForScrollSlider && waitForScrollSlider.scrollTop > 0) { return }
      }
    }

    // Drag inside wrap
    if (event.target.closest(`.${wrap.value.className}`)) {
      isDragging = true
    }

    if (isDragging) {
      initialY = getDelta(event)
    }
  }

  function getDelta (event: any): number {
    return event.type.includes('touch')
      ? event.touches[0].clientY - initialY
      : event.clientY - initialY
  }

  /**
   * Dragging handler
   * @param event
   */
  async function onDragging (event: any, isFinal?: Boolean): Promise<void> {
    if (isDragging && !isFinal) {
      currentY = getDelta(event)
      const offset = isDragByHandler ? 0 : config.dragOffset
      if (currentY > offset) movingAnimation()
    }

    if (isFinal) {
      console.log('isFinal')

      if (currentY >= 80) {
        await closingAnimation()
        removeEvents()
        isInit = false
        if (onClose) { onClose() }
      }
      else {
        openingAnimation()
      }

      resetState()
    }
  }

  /**
   * Drag end handler
   */
  function onDragEnd (event: any) {
    onDragging(event, true)
  }

  function resetState () {
    currentY = 0
    initialY = 0
    isDragging = false
    isDragByHandler = false
  }

  /**
   * Remove Events
   */
  function removeEvents () {
    // touch events
    container.value.removeEventListener('touchstart', onDragStart)
    container.value.removeEventListener('touchmove', onDragging)
    container.value.removeEventListener('touchend', onDragEnd)

    // mouse events
    container.value.removeEventListener('mousedown', onDragStart)
    container.value.removeEventListener('mousemove', onDragging)
    container.value.removeEventListener('mouseup', onDragEnd)
    container.value.removeEventListener('mouseleave', onDragEnd)
  }

  /**
   * Close Modal
   */
  async function close () {
    await closingAnimation()
    removeEvents()
    resetState()
    isInit = false
    if (onClose) onClose()
  }

  return {
    init,
    close
  }
}
