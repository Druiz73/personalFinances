import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, getCategoryById, startGetCategory, startRemoveCategory } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';
//components
import Header from '../../components/Header';
import ItemList from '../../components/ItemList';
import IconAdd from '../../components/IconAdd';


type CategoriesScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.Categories>;

interface CategoriesScreenProps {
    navigation: CategoriesScreenNavigationProps;
    categories: [];
    category: Object;
    delete: Function
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

    //funcion para eliminar categoria
    const deleteCategory = (id: string) => {
        dispatch(startRemoveCategory(id));
    }

    const editCategory = (id: string, name: string) => {
        dispatch(getCategoryById(id, name));
        navigation.navigate(AppScreens.EditCategory)
    }

    //muestra las categorias
    const renderItem = () => {
        return (
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <ItemList
                        title={item.name}
                        onRemove={() => deleteCategory(item.id)}
                        onEdit={() => editCategory(item.id, item.name)}
                    />
                )}
                keyExtractor={categories => (categories.id).toString()}
            />
        )
    };


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Header title="Category" />
            </View>
            <View style={styles.body}>
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
            </View>
            <TouchableOpacity style={styles.iconAdd}>
                <IconAdd size={30} name="plus" color="blue" linkTo={() => navigation.navigate(AppScreens.NewCategory)} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    body: {
        flex: 9,
        backgroundColor: 'white'
    },
    iconAdd: {
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        right: 30,
        bottom: 60,
    }

})
export default Categories;