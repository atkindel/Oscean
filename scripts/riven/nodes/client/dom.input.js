'use strict'

RIVEN.lib.Input = function InputNode (id, rect, ...params) {
  RIVEN.lib.Dom.call(this, id, rect, ...params)

  this.el = document.createElement('input')
  this.el.id = this.id
  this.is_installed = false
  this.el.setAttribute('spellcheck', false)

  this.el.addEventListener('keydown', (e) => { this.on_input(e) })
  this.el.addEventListener('focus', () => { this.txt = this.el.value; this.el.value = '' })
  this.el.addEventListener('blur', () => { this.el.value = this.txt ? this.txt : window.location.hash.replace('#', '').trim() })

  this.on_input = function (e) {
    const value = this.el.value.trim().toLowerCase()

    if (value.substr(0, 1) === '~') {
      if (!Ø('terminal').hasClass('active')) {
        Ø('terminal').push('maeve', 'Idle.', 500)
      }
      Ø('terminal').addClass('active')
    } else {
      Ø('terminal').removeClass('active')
    }

    this.test(value)

    if (e.key === 'Enter') {
      this.validate(value)
    }
  }

  this.test = function (value) {
    const result = Ø('database').index[value.toUpperCase()]
    if (result) {
      this.addClass('known')
    } else {
      this.removeClass('known')
    }
  }

  this.validate = function (value) {
    if (value.substr(0, 1) === '~') {
      Ø('terminal').bang(value)
    } else {
      Ø('query').bang(value)
    }
  }

  this.update = function (content) {
    if (typeof content === 'string') {
      this.el.value = content.toCapitalCase()
    }
  }
}
