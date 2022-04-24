
function HTThrowPromise(executor) {
	const resolve = (value) => {
		this.then(value)
		this.finally()
	}
	const reject = (error) => {
		this.catch(error)
		this.finally()
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
		promiseList.map((promise, index) => {
			promise.then(value => {
				if (doneCount < 0) {
					return
				}
				valueList[index] = value
				doneCount += 1
				if (doneCount >= promiseList.length) {
					resolve(valueList)
					doneCount = -1
				}
			}).catch(error => {
				doneCount = -1
				reject(error)
			})
		})
	})
}

export default HTThrowPromise