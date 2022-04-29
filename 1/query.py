import json
import requests

data = requests.post('http://be.chenzaozhao.com:4000/graphql', headers={'content-type': 'application/json'}, data=json.dumps({
	"operationName": "IntrospectionQuery",
	"variables": {},
	"query": "query IntrospectionQuery {\n  __schema {\n    queryType {\n      name\n    }\n    mutationType {\n      name\n    }\n    subscriptionType {\n      name\n    }\n    types {\n      ...FullType\n    }\n    directives {\n      name\n      description\n      locations\n      args {\n        ...InputValue\n      }\n    }\n  }\n}\n\nfragment FullType on __Type {\n  kind\n  name\n  description\n  fields(includeDeprecated: true) {\n    name\n    description\n    args {\n      ...InputValue\n    }\n    type {\n      ...TypeRef\n    }\n    isDeprecated\n    deprecationReason\n  }\n  inputFields {\n    ...InputValue\n  }\n  interfaces {\n    ...TypeRef\n  }\n  enumValues(includeDeprecated: true) {\n    name\n    description\n    isDeprecated\n    deprecationReason\n  }\n  possibleTypes {\n    ...TypeRef\n  }\n}\n\nfragment InputValue on __InputValue {\n  name\n  description\n  type {\n    ...TypeRef\n  }\n  defaultValue\n}\n\nfragment TypeRef on __Type {\n  kind\n  name\n  ofType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
}))
data = data.text
data = json.loads(data)
data = data['data']['__schema']['types']
data = filter(lambda x: x['kind'] in ['OBJECT', 'INPUT_OBJECT'], data)

apiList = open('../app/common/request/HTAPI.js').read()

for section in data:
	if section['name'] in ['Query', 'Mutation', 'Subscription']:
		pass
		# for item in section['fields']:
		# 	name = item['name']
		# 	if name in apiList or 'Admin' in name:
		# 		continue
		# 	if name in ['StaticGetProvinces', 'StaticGetCities', 'StaticGetCounties', 'StaticGetHotJobs', 'TestShowDatas']:
		# 		continue
		# 	if name in ['CommonGetResume']:
		# 		continue
		# 	print('%s %s' % (section['name'], item['name']))
	else:
		if section['name'] == 'TalentListFilter':
			for item in section['inputFields']:
				name = item['type']['name']
				if name == None:
					name = '[' + item['type']['ofType']['name'] + ']'
				print('%s %s' % (item['name'], name))