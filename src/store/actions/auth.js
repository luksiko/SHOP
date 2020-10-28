import { AsyncStorage } from 'react-native'

// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

export const authenticate = (userId, token, expiryTime) => {
	return dispatch => {
		dispatch(setLogoutTimer(expiryTime))
		dispatch({ type: AUTHENTICATE, userId: userId, token: token })
	}
}

export const signup = (email, password) => {
	return async dispatch => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBiZgSipHRFBmMIENvnfF2_7pyqbGQRedE',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			},
		)

		if (!response.ok) {
			const errorResData = await response.json()
			const errorId = errorResData.error.message
			let message = 'Something went wrong!'
			if (errorId === 'EMAIL_EXISTS') {
				message = 'This email exist already!'
			}
			throw new Error(message)
		}

		const resData = await response.json()
		console.log(resData)
		dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))

		const exporationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
		saveDataToStorage(resData.idToken, resData.localId, exporationDate)
	}
}
export const login = (email, password) => {
	return async dispatch => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBiZgSipHRFBmMIENvnfF2_7pyqbGQRedE',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			},
		)

		if (!response.ok) {
			const errorResData = await response.json()
			const errorId = errorResData.error.message
			let message = 'Something went wrong!'
			if (errorId === 'EMAIL_NOT_FOUND') {
				message = 'This email could not be found!'
			} else if (errorId === 'INVALID_PASSWORD') {
				message = 'This password is not valid!'
			}
			throw new Error(message)
		}

		const resData = await response.json()
		console.log(resData)
		dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))

		const exporationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
		saveDataToStorage(resData.idToken, resData.localId, exporationDate)
	}
}

export const logaut = () => {
	clearLogoutTimer()
	AsyncStorage.removeItem('userData') // очищаем сторадж при логауте
	return { type: LOGOUT }
}

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer)
	}
}

const setLogoutTimer = exporationTime => {
	return dispatch => {
		timer = setTimeout(() => {
			dispatch(logaut)
		}, exporationTime)
	}
}

const saveDataToStorage = (token, userId, exporationDate) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token: token,
			userId: userId,
			expiryDate: exporationDate.toISOString(),
		}),
	)
}
