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
data = filter(lambda x: x['kind'] == 'OBJECT' and x['name'] in ['Query', 'Mutation', 'Subscription'], data)

apiList = open('../src/utils/postQuery.ts').read()

for section in data:
	for item in section['fields']:
		name = item['name']
		if name not in apiList and 'Admin' not in name:
			print('%s %s' % (section['name'], item['name']))