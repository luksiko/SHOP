import React, { useEffect, useCallback, useReducer } from 'react'
import {
	View,
	ScrollView,
	Text,
	TextInput,
	StyleSheet,
	Platform,
	Alert,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import * as productsActions from '../../store/actions/products'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Input from '../../components/UI/Input'

const FORM_INPUT_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		}
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		}
		let updatedFormIsValid = true
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
		}
		return {
			inputValues: updatedValues,
			inputValidities: updatedValidities,
			formIsValid: updatedFormIsValid,
		}
	}
	return state
}

const EditProductScreen = (props) => {
	const prodId = props.navigation.getParam('productId')
	const editedProduct = useSelector((state) =>
		state.products.userProducts.find((prod) => prod.id === prodId),
	)

	const dispatch = useDispatch()

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct ? editedProduct.title : '',
			imageUrl: editedProduct ? editedProduct.imageUrl : '',
			description: editedProduct ? editedProduct.description : '',
			price: '',
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false,
		},
		formIsValid: editedProduct ? true : false,
	})

	const submitHandler = useCallback(() => {
		if (!formState.formIsValid) {
			Alert.alert('Wrong input!', 'Please check the errors in the form', [
				{ text: 'Ok' },
			])
			return
		}
		if (editedProduct) {
			dispatch(
				productsActions.updateProduct(
					prodId,
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl,
				),
			)
		} else {
			dispatch(
				productsActions.createProduct(
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl,
					+formState.inputValues.price,
				),
			)
		}
		props.navigation.goBack()
	}, [dispatch, prodId, formState])

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler })
	}, [submitHandler])

	const textChangeHandler = (inputIdentifier, text) => {
		// text - автоматически передается как аргумент textInput
		let isValid = false
		// проверяем, чтобы чтото было введено
		if (text.trim().length > 0) {
			isValid = true
		}
		dispatchFormState({
			type: FORM_INPUT_UPDATE,
			value: text,
			isValid: isValid,
			input: inputIdentifier,
		})
	}

	return (
		<ScrollView>
			<View style={styles.form}>
				<Input
					label='Title'
					errorText='Please enter a valide title'
					keyboardType='default'
					autoCapitalize='sentences'
					autoCorrect
					returnKeyType='next' // контролирует иконку в правом углу
				/>
				<Input
					label='Image URL'
					errorText='Please enter a valide Image URL'
					keyboardType='default'
					returnKeyType='next' // контролирует иконку в правом углу
				/>
				<Input
					label='Price'
					errorText='Please enter a valide Price'
					keyboardType='decimal-pad'
					returnKeyType='next' // контролирует иконку в правом углу
				/>
				<Input
					label='Description'
					errorText='Please enter a valide Description'
					keyboardType='default'
					autoCorrect
					multiline
					numberOfLines={3}
				/>
			</View>
		</ScrollView>
	)
}

EditProductScreen.navigationOptions = (navData) => {
	const submitFn = navData.navigation.getParam('submit')
	return {
		// если передали id товара для редактирования, то выдаем Edit, иначе Add
		headerTitle: navData.navigation.getParam('productId')
			? 'Edit Product'
			: 'Add Product',
		headerRight: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title='Save'
					iconName={
						Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
					}
					onPress={submitFn}
				/>
			</HeaderButtons>
		),
	}
}

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	formControl: {
		width: '100%',
	},
	label: {
		fontFamily: 'open-sans-bold',
		marginVertical: 8,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
})

export default EditProductScreen
