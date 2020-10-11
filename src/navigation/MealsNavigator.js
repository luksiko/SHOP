import React from 'react'
import { Platform, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'
import Colors from '../constants/Colors'

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
}

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
			// navigationOptions: {
			// 	headerTitle: 'Meal Categories',
			// },
		},
		CategoryMeals: {
			screen: CategoryMealsScreen,
		},
		MealDetail: MealDetailScreen,
	},
	{ defaultNavigationOptions: defaultStackNavOptions },
)

const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetail: MealDetailScreen,
	},
	{ defaultNavigationOptions: defaultStackNavOptions },
)

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
				)
			},
			tabBarColor: Colors.primaryColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
				) : (
					'Meals'
				),
		},
	}, // вкладываем Стак навигатор в табы
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarLabel: 'Избранное!',
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
				) : (
					'Favorites'
				),
		},
	},
}

const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: 'white',
				shifting: true,
				barStyle: { backgroundColor: Colors.primaryColor },
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					activeTintColor: Colors.accentColor,
					labelStyle: {
						fontFamily: 'open-sans',
					},
				},
		  })

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen,
	},
	{
		navigationOptions: {
			drawerLabel: 'Filters!!!',
		},
		defaultNavigationOptions: defaultStackNavOptions,
	},
)

const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: 'Meals',
			},
		},
		Filters: FiltersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.accentColor,
			itemStyle: { marginVertical: 10 },
			labelStyle: { fontFamily: 'open-sans-bold' },
		},
	},
)

export default createAppContainer(MainNavigator) // главным делаем табы
