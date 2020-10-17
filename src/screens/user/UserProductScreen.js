import React from 'react'
import { FlatList, Platform } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

const UserProductScreen = (props) => {
	const userProducts = useSelector((state) => state.produsts.userProducts)

	return (
		<FlatList
			data={userProducts}
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					uri={itemData.item.imageUrl}
					price={itemData.item.price}
					onViewDetail={() =>
						props.navigation.navigate('ProductDetail', {
							productId: itemData.item.id,
							productTitle: itemData.item.title,
						})
					}
					onAddToCart={() => {}}
				/>
			)}
		/>
	)
}
UserProductScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Products',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title='Menu'
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					iconSize={27}
					onPress={() => {
						navData.navigation.toggleDrawer()
					}}
				/>
			</HeaderButtons>
		),
	}
}
export default UserProductScreen
