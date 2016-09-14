export const modelsUsers = {
	"Users": {
		"models": [{
			"model_name": "Users",
			"id_unique": "id",
			"columns": "name, username, email, website",
			"columns_name": "Name, Username, E-mail, Website",
			"fields": {
				"name": {
					"name": "Name",
					"max_length": "250",
					"type": "text",
					"required": true
				},
				"username": {
					"name": "Username",
					"max_length": "50",
					"type": "text",
					"required": true
				},
				"email": {
					"name": "E-mail",
					"max_length": "80",
					"type": "email",
					"required": true
				},
				"website": {
					"name": "Website",
					"max_length": "250",
					"type": "text",
					"required": false
				}
			}
		}]
	}
}
