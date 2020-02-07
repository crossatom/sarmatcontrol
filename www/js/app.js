let app = new Framework7({ // Init F7
  root: '#app',
  theme: 'ios',
  touch: {
    fastClicks: true
  },
  routes: routes
})

var $$ = Dom7 // init Dom7
var mV = app.views.create('.view-main')