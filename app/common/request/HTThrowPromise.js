
function HTThrowPromise(executor) {
	const resolve = (value) => {
		this.then(value)
		this.finally(value, null)
	}
	const reject = (error) => {
		this.catch(error)
		this.finally(null, error)
	}
	executor(resolve, reject)
}

['then', 'catch', 'finally'].map(key => {
	HTThrowPromise.prototype[key] = function(f) {
		this[key] = f
		return this
	}
})

HTThrowPromise.all = function(promiseList) {
	return new HTThrowPromise((resolve, reject) => {
		var doneCount = 0
		let valueList = promiseList.map(promise => null)
		let errorList = promiseList.map(promise => null)
		promiseList.map((promise, index) => {
			promise.then(value => {
				valueList[index] = value
			}).catch(error => {
				errorList[index] = error
			}).finally(() => {
				doneCount += 1
				if (doneCount == promiseList.length) {
					resolve(valueList)
				}
			})
		})
	})
}

export default HTThrowPromise