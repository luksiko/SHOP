import React from 'react'
import { FlatList, Platform, Button } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const UserProductScreen = (props) => {
	const userProducts = useSelector((state) => state.produsts.userProducts)
	const  dispatch = useDispatch()

	return (
		<FlatList
			data={userProducts}
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					uri={itemData.item.imageUrl}
					price={itemData.item.price}
					onSelectItem={() => {}}>
					<Button color={Colors.primary} s title='Edit' onPress={() => {}} />
					<Button color={Colors.primary} title='Delete' onPress={() => {
						dispatch(productsActions.deleteProduct(itemData.item.id))
					}} />
				</ProductItem>
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
