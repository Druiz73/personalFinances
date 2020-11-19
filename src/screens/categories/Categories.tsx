import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList
} from 'react-native';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, categoryState, startGetCategory } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';
//components
import Header from '../../components/Header'
import ItemList from '../../components/ItemList';
import IconAdd from '../../components/IconAdd';


type CategoriesScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.Categories>;

interface CategoriesScreenProps {
    navigation: CategoriesScreenNavigationProps;
    categories: [];
    categorie: Object;

}

const Categories: React.FC<CategoriesScreenProps> = (props) => {
    const { navigation } = props;

    const dispatch = useDispatch();

    const { categories } = useSelector(
        (state: ApplicationState) => state.categoryReducer
    );

    useEffect(() => {
        if (categories.length == 0) {
            dispatch(startGetCategory());
        }
    }, [categories])


    const renderItem = () => {

        return (
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <ItemList
                        title={item.name}
                    />
                )}
                keyExtractor={categories => (categories.id).toString()}
            />
        )
    };


    return (
        <View >
            <View >
                <View >
                    <Header title="Category" Navigation={() => navigation.navigate(AppScreens.Home)} />
                </View>
                <SafeAreaView >
                    {
                        categories.length > 0 ?
                            <View >
                                {
                                    renderItem()
                                }
                            </View>
                            :
                            <Text >no existen categorias</Text>
                    }
                </SafeAreaView>

            </View>
            <View style={styles.iconBack}>
                <IconAdd size={30} name="plus" color="blue" linkTo={() => navigation.navigate(AppScreens.NewCategory)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconBack: {
        flex: 1,
        flexDirection:"column-reverse",
        padding: 30,
    }

})
export default Categories;