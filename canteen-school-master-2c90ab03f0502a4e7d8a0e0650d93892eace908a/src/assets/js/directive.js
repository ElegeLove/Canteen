import Vue from 'vue'  //
Vue.directive('debounce', {
  inserted: function (el, binding) {
    let timer
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 300)
    })
  }
})
