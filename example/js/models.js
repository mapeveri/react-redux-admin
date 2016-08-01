
export const models = {
	"data": [{
		"model_name": "users",
		"columns": "username, email, website",
		"fields": [{
			"name": {
				"max_length": "250",
				"type": "char",
				"required": true
			},
			"username": {
				"max_length": "50",
				"type": "char",
				"required": true
			},
			"email": {
				"max_length": "80",
				"type": "email",
				"required": true
			},
			"website": {
				"max_length": "250",
				"type": "char",
				"required": false
			}
		}]
	}]
}
