export default {
  name: 'ellipsis',
  directive: (el, binding) => {
    el.style.overflow = 'hidden'
    el.style.textOverflow = 'ellipsis'
    el.style.display = '-webkit-box'
    el.style['-webkit-line-clamp'] = binding.value || 1
    el.style['-webkit-box-orient'] = 'vertical'
  }
}
