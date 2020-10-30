import React from 'react'
import { Platform, SafeAreaView, Button, View, Text, StyleSheet } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CardScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductScreen from '../screens/user/UserProductScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'
import Colors from '../constants/Colors'
import * as authActions from '../store/actions/auth'

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetail: ProductDetailScreen,
		CardScreen: CartScreen,
		OrdersScreen: OrdersScreen,
	},
	{
		navigationOptions: {
			drawerIcon: drawerConfig => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultStackNavOptions,
	},
)

const OrdersNavigator = createStackNavigator(
	{
		Orders: OrdersScreen,
	},
	{
		navigationOptions: {
			drawerIcon: drawerConfig => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultStackNavOptions,
	},
)
const AdminNavigator = createStackNavigator(
	{
		UserProducts: UserProductScreen,
		EditProduct: EditProductScreen,
	},
	{
		navigationOptions: {
			drawerIcon: drawerConfig => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultStackNavOptions,
	},
)

const ShopNavigator = createDrawerNavigator(
	{
		Shop: {
			screen: ProductsNavigator,
			navigationOptions: {
				drawerLabel: 'Shop',
			},
		},
		Orders: OrdersNavigator,
		Admin: AdminNavigator,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
		contentOptions: {
			activeTintColor: Colors.primary,
			itemStyle: { marginVertical: 5 },
		},
		contentComponent: props => {
			const dispatch = useDispatch()
			return (
				<View style={{ flex: 1, paddingTop: 20 }}>
					<SafeAreaView forseInsert={{ top: 'always', horizontal: 'never' }}>
						<DrawerNavigatorItems {...props} />
						<Button
							title='Logout'
							color={Colors.primary}
							onPress={() => {
								dispatch(authActions.logaut())
								// props.navigation.navigate('Auth')
							}}
						/>
					</SafeAreaView>
				</View>
			)
		},
	},
)

const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	},
)

const MainNavigator = createSwitchNavigator({
	Startup: StartupScreen,
	Auth: AuthNavigator,
	Shop: ShopNavigator,
})

const styles = StyleSheet.create({
	number: {},
})

export default createAppContainer(MainNavigator) // главным делаем табы
