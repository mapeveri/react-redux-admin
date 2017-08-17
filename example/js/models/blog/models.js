export const modelsPosts = {
	'Blog': {
		'models': [{
			'model_name': 'posts',
			'id_unique': '_id',
			'columns': ['title', 'body', 'hidden'],
			'fields': {
				'title': {
					'name': 'Title',
					'max_length': '50',
					'type': 'text',
					'required': true,
				},
				'body': {
					'name': 'Body',
					'type': 'textarea',
					'required': true,
				},
				'hidden': {
					'name': 'Hidden',
					'type': 'checkbox',
					'required': false,
				}
			}
		},{
			'model_name': 'categories',
			'id_unique': '_id',
			'columns': ['name'],
			'fields': {
				'name': {
					'name': 'Name',
					'max_length': '50',
					'type': 'text',
					'required': true,
				}
			}
		}]
	}
}
