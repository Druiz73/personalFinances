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
import { ApplicationState, getCategoryById, startGetCategory, startGetCurrency, startGetMovement, startRemoveCategory } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';
//components
import Header from '../../components/Header';
import MovementsList from '../../components/MovementsList';
import IconAdd from '../../components/IconAdd';


type MovementsScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.Movements>;

interface MovementsScreenProps {
    navigation: MovementsScreenNavigationProps;
    movements: [];
    movement: Object;
    delete: Function,
    transactions: []
}

const Movements: React.FC<MovementsScreenProps> = (props) => {
    const { navigation } = props;

    const dispatch = useDispatch();

    const { transactions } = useSelector(
        (state: ApplicationState) => state.MovementsReducer
    );
    useEffect(() => {
        if (transactions.length == 0) {
            dispatch(startGetMovement());
            dispatch(startGetCategory());
            dispatch(startGetCurrency());
        }
    }, [])

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
                data={transactions}
                renderItem={({ item }) => (
                    <MovementsList
                        type={item.type}
                        category={item.category}
                        date={item.date}
                        amount={item.amount}
                        currency={item.currency}
                    // onRemove={() => deleteCategory(item.id)}
                    // onEdit={() => editCategory(item.id, item.name)}
                    />
                )}
                keyExtractor={Movements => (Movements.id).toString()}
            />
        )
    };


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Header title="Movements" />
            </View>
            <View style={styles.body}>
                {
                    Movements.length > 0 ?
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
                <IconAdd size={30} name="plus" color="blue" linkTo={() => navigation.navigate(AppScreens.NewMovement)} />
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
export default Movements;