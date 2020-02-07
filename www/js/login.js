// Login
$$('#l_go').on('click', loginGo)

function loginGo() {
	var login = $$('#l_lgn').val(),
			passw = $$('#l_psw').val()

	if(login.length < 3) {
		app.dialog.alert('Слишком короткий логин', 'Внимание')
		return
	}

	if(passw.length < 3) {
		app.dialog.alert('Слишком короткий пароль', 'Внимание')
		return
	}

	app.dialog.preloader('Подключение')

	app.request.json('https://sc-backend.000webhostapp.com/api2/users.json', {}, loginOk, loginErr)
}

function loginOk(e) {
	if(!(e instanceof Object)) {
		app.dialog.close()
		app.dialog.confirm('Некорректный ответ от сервера. Повторить поптыку?', 'Ошибка', loginGo, () => {})
	}
	else {
		for(var i = 0; i < Object.keys(e).length; i++) {
			if(e[i].login === $$('#l_lgn').val()) {
				if($$('#l_psw').val() === e[i].password) {
					app.dialog.close()
					app.views.main.router.navigate('/agents/list/')
					return
				}
			}
		}
		app.dialog.close()
		app.dialog.alert('Пользователь не найден')
	}
}

function loginErr() {
	app.dialog.close()
	app.dialog.confirm('Ошибка при подключении к серверу. Повторить?', 'Ошибка', loginGo, () => {})
}