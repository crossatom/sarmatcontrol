console.log('a')

let lst;

function agentsListRequest() {
	app.request.json('https://sc-backend.000webhostapp.com/api2/contragents.json', {}, agentsListOk, agentsListErr)
	app.dialog.close()
}

function agentsListOk(e) {
	if(!(e instanceof Object))
		app.dialog.confirm('Некорректный ответ от сервера. Повторить попытку?', agentsListRequest, () => {})
	else {

		let list = []
		for(var i = 0; i < Object.keys(e).length; i++) {
			list.push({
				id  : e[i].id,
				name: e[i].fio
			})
		}
		lst = list

		var vList = app.virtualList.create({
			el: '.virtual-list',
			items: list,
			searchAll: (q, items) => {
				var found = []
				for(var i = 0; i < items.length; i++) {
					if(items[i].name.toLowerCase().indexOf(q.toLowerCase()) >= 0 || q.trim() === '') found.push(i)
				}
				return found
			},
			itemTemplate: 
				'<li>' +
					'<a href="#" class="item-link item-content">' +
						'<div class="item-inner">' +
							'<div class="item-title-row">' +
								'<div class="item-title">{{name}}</div>' +
							'</div>' +
						'</div>' +
					'</a>' +
				'</li>',
			height: 63
		})
	}
} 

function agentsListErr() {
	app.dialog.confirm('Ошибка при подключении к серверу. Повторить попытку?', agentsListRequest, () => {})
}