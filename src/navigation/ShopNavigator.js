import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CardScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductScreen from '../screens/user/UserProductScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import Colors from '../constants/Colors'

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
			itemStyle: { marginVertical: 10 },
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
	Auth: AuthNavigator,
	Shop: ShopNavigator,
})

export default createAppContainer(MainNavigator) // главным делаем табы
