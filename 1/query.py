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

METHOD_NAME_LIST = ['Query', 'Mutation', 'Subscription']

# apiList = open('../app/common/request/HTAPI.js').read()

def argTypeName(x):
	if x['kind'] == 'NON_NULL':
		return '%s!' % (argTypeName(x['ofType']))
	if x['kind'] == 'LIST':
		return '[%s]' % (argTypeName(x['ofType']))
	return x['name']

def insideType(x):
	if x['kind'] == 'NON_NULL' or x['kind'] == 'LIST':
		return insideType(x['ofType'])
	return x

def returnList(x, tabIndex = 2, showComment = False):
	insideName = insideType(x)['name']
	for section in data:
		if insideName != section['name']:
			continue
		def returnItemList(itemList):
			valueList = ("\n%s" % ("\t" * tabIndex)).join(list(map(lambda x: '%s %s' % (x['name'], returnList(x['type'], tabIndex + 1, showComment)), itemList)))
			return '{\n%s%s\n%s}' % ("\t" * tabIndex, valueList, "\t" * (tabIndex - 1))
		if 'fields' in section and section['fields'] != None:
			return returnItemList(section['fields'])
		elif 'inputFields' in section and section['inputFields'] != None:
			return returnItemList(section['inputFields'])
		elif 'possibleTypes' in section and section['possibleTypes'] != None:
			valueList = ("\n%s" % ("\t" * tabIndex)).join(list(map(lambda x: '... on %s %s' % (x['name'], returnList(x, tabIndex + 1)), section['possibleTypes'])))
			return '{\n%s%s\n%s}' % ("\t" * tabIndex, valueList, "\t" * (tabIndex - 1))
		elif section['description'] != None and section['description'].startswith('enum') and showComment:
			return section['description']
	return argTypeName(x) if showComment else ''

def printMethodList():
	for section in data:
		if section['name'] not in METHOD_NAME_LIST:
			continue
		for item in section['fields']:
			value = '''
/* 

%s%s

*/ 
`
%s %s(%s) {
	%s(%s) %s
}
`,''' % (
		item['description'] if item['description'] != None else item['name'], 
		'\n\n{\n\t%s\n}' % (', \n\t'.join(list(map(lambda x: '%s: %s' % (x['name'], returnList(x['type'], 2, True)), item['args'])))) if len(item['args']) > 0 else '',
		section['name'].lower(), 
		item['name'],
		', '.join(list(map(lambda x: '$%s: %s' % (x['name'], argTypeName(x['type'])), item['args']))),
		item['name'],
		', '.join(list(map(lambda x: '%s: $%s' % (x['name'], x['name']), item['args']))),
		returnList(item['type'])
	)
			value = value.replace('()', '')
			print(value)


if __name__ == '__main__':
	printMethodList()



