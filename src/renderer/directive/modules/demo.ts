export default {
  name: 'demo',
  directive: {
    // 在绑定元素的 attribute 前调用
    // 或事件监听器应用前调用
    created(el, binding, vnode, prevVnode) {
      el.style.color = 'red'
      const { arg, modifiers, value } = binding
      console.log('created ', { el, binding, vnode, prevVnode })
      console.log('{ arg,modifiers,value }: ', { arg, modifiers, value })
      console.log(typeof value)
      console.log(value())
    },
    // 在元素被插入到 DOM 前调用
    beforeMount(el, binding, vnode, prevVnode) {
      // console.log('beforeMount ', { el, binding, vnode, prevVnode })
    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都 挂载 完成后调用
    mounted(el, binding, vnode, prevVnode) {
      // console.log('mounted ', { el, binding, vnode, prevVnode })
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate(el, binding, vnode, prevVnode) {
      // console.log('beforeUpdate ', { el, binding, vnode, prevVnode })
    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都 更新 完成后调用
    updated(el, binding, vnode, prevVnode) {
      // console.log('updated ', { el, binding, vnode, prevVnode })
    },
    // 绑定元素的父组件卸载之前调用
    beforeUnmount(el, binding, vnode, prevVnode) {
      // console.log('beforeUnmount ', { el, binding, vnode, prevVnode })
    },
    // 绑定元素的父组件卸载之后调用
    unmounted(el, binding, vnode, prevVnode) {
      // console.log('unmounted ', { el, binding, vnode, prevVnode })
    }
  }
}
