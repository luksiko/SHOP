import React from 'react'
import { Platform, SafeAreaView, Button, View, Text, StyleSheet } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerNavigatorItems } from '@react-navigation/drawer'
import { useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import ProductsOverviewScreen, { screenOptions } from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen, {
	screenOptions as ProductDetailScreenOptions,
} from '../screens/shop/ProductDetailScreen'
import CartScreen, { screenOptions as CartScreenOptions } from '../screens/shop/CardScreen'
import OrdersScreen, { screenOptions as OrdersScreenOptions } from '../screens/shop/OrdersScreen'
import UserProductScreen, {
	screenOptions as UserProductScreenOptions,
} from '../screens/user/UserProductScreen'
import EditProductScreen, {
	screenOptions as EditProductScreenOptions,
} from '../screens/user/EditProductScreen'
import AuthScreen, { screenOptions as AuthScreenOptions } from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'
import Colors from '../constants/Colors'
import * as authActions from '../store/actions/auth'

const defaultNavOptions = {
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

const ProductsStackNavigator = createStackNavigator()

export const ProductsNavigator = () => {
	return (
		<ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<ProductsStackNavigator.Screen
				name='ProductsOverview'
				component={ProductsOverviewScreen}
				options={screenOptions}
			/>
			<ProductsStackNavigator.Screen
				name='ProductDetail'
				component={ProductDetailScreen}
				options={ProductDetailScreenOptions}
			/>
			<ProductsStackNavigator.Screen name='Card' component={CartScreen} options={CartScreenOptions} />
		</ProductsStackNavigator.Navigator>
	)
}

// const ProductsNavigator = createStackNavigator(
// 	{
// 		ProductsOverview: ProductsOverviewScreen,
// 		ProductDetail: ProductDetailScreen,
// 		CardScreen: CartScreen,
// 		OrdersScreen: OrdersScreen,
// 	},
// 	{
// 		navigationOptions: {
// 			drawerIcon: drawerConfig => (
// 				<Ionicons
// 					name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
// 					size={23}
// 					color={drawerConfig.tintColor}
// 				/>
// 			),
// 		},
// 		defaultNavigationOptions: defaultStackNavOptions,
// 	},
// )
const OrdersStackNavigator = createStackNavigator()

export const OrdersNavigator = () => {
	return (
		<OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<OrdersStackNavigator.Screen name='Orders' component={OrdersScreen} options={OrdersScreenOptions} />
		</OrdersStackNavigator.Navigator>
	)
}

const AdminStackNavigator = createStackNavigator()

export const AdminNavigator = () => {
	return (
		<AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<AdminStackNavigator.Screen
				name='UserProducts'
				component={UserProductScreen}
				options={UserProductScreenOptions}
			/>
			<AdminStackNavigator.Screen
				name='EditProduct'
				component={EditProductScreen}
				options={EditProductScreenOptions}
			/>
		</AdminStackNavigator.Navigator>
	)
}
// const OrdersNavigator = createStackNavigator(
// 	{
// 		Orders: OrdersScreen,
// 	},
// 	{
// 		navigationOptions: {
// 			drawerIcon: drawerConfig => (
// 				<Ionicons
// 					name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
// 					size={23}
// 					color={drawerConfig.tintColor}
// 				/>
// 			),
// 		},
// 		defaultNavigationOptions: defaultNavOptions,
// 	},
// )
// const AdminNavigator = createStackNavigator(
// 	{
// 		UserProducts: UserProductScreen,
// 		EditProduct: EditProductScreen,
// 	},
// 	{
// 		navigationOptions: {
// 			drawerIcon: drawerConfig => (
// 				<Ionicons
// 					name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
// 					size={23}
// 					color={drawerConfig.tintColor}
// 				/>
// 			),
// 		},
// 		defaultNavigationOptions: defaultNavOptions,
// 	},
// )

// const ShopNavigator = createDrawerNavigator(
// 	{
// 		Shop: {
// 			screen: ProductsNavigator,
// 			navigationOptions: {
// 				drawerLabel: 'Shop',
// 			},
// 		},
// 		Orders: OrdersNavigator,
// 		Admin: AdminNavigator,
// 	},
// 	{
// 		defaultNavigationOptions: defaultNavOptions,
// 		contentOptions: {
// 			activeTintColor: Colors.primary,
// 			itemStyle: { marginVertical: 5 },
// 		},
// 		contentComponent: props => {
// 			const dispatch = useDispatch()
// 			return (
// 				<View style={{ flex: 1, paddingTop: 20 }}>
// 					<SafeAreaView forseInsert={{ top: 'always', horizontal: 'never' }}>
// 						<DrawerNavigatorItems {...props} />
// 						<Button
// 							title='Logout'
// 							color={Colors.primary}
// 							onPress={() => {
// 								dispatch(authActions.logaut())
// 								// props.navigation.navigate('Auth')
// 							}}
// 						/>
// 					</SafeAreaView>
// 				</View>
// 			)
// 		},
// 	},
// )
const AuthStackNavigator = createStackNavigator()

export const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<AuthStackNavigator.Screen name='Auth' component={AuthScreen} options={AuthScreenOptions} />
		</AuthStackNavigator.Navigator>
	)
}

// const AuthNavigator = createStackNavigator(
// 	{
// 		Auth: AuthScreen,
// 	},
// 	{
// 		defaultNavigationOptions: defaultNavOptions,
// 	},
// )

// const MainNavigator = createSwitchNavigator({
// 	Startup: StartupScreen,
// 	Auth: AuthNavigator,
// 	Shop: ShopNavigator,
// })

// const styles = StyleSheet.create({
// 	number: {},
// })

// export default createAppContainer(MainNavigator)
