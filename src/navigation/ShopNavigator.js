import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
// import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
// import { Ionicons } from '@expo/vector-icons'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CardScreen from '../screens/shop/CardScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
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
		ProductsOverview: {
			screen: ProductsOverviewScreen,
			// navigationOptions: {
			// 	headerTitle: 'Meal Categories',
			// },
		},
		ProductDetail: {
			screen: ProductDetailScreen,
		},
		CardScreen: {
			screen: CardScreen,
		},
		OrdersScreen: {
			screen: OrdersScreen,
		},
	},
	{ defaultNavigationOptions: defaultStackNavOptions },
)

const MainNavigator = createDrawerNavigator(
	{
		Shop: {
			screen: ProductsNavigator,
			navigationOptions: {
				drawerLabel: 'Shop',
			},
		},
		Orders: OrdersScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
		contentOptions: {
			activeTintColor: Colors.accent,
			itemStyle: { marginVertical: 10 },
		},
	},
)

export default createAppContainer(MainNavigator) // главным делаем табы
