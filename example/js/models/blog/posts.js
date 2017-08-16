export const modelsPosts = {
	"Blog": {
		"models": [{
			"model_name": "Posts",
			"id_unique": "_id",
			"columns": "title, body",
			"columns_name": "Title, Body",
			"fields": {
				"title": {
					"name": "Title",
					"max_length": "50",
					"type": "text",
					"required": true,
				},
				"body": {
					"name": "Body",
					"type": "textarea",
					"required": true,
				}
			}
		}]
	}
}
