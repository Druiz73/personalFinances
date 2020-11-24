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
import { ApplicationState, startGetClient, startRemoveCategory, getClientById, startRemoveClient } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';
//components
import Header from '../../components/Header';
import ItemList from '../../components/ItemList';
import IconAdd from '../../components/IconAdd';


type ClientsScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.Clients>;

interface ClientProps {
    navigation: ClientsScreenNavigationProps
}

const Client: React.FC<ClientProps> = (props) => {
    const { navigation } = props;

    const dispatch = useDispatch();

    const { clients } = useSelector(
        (state: ApplicationState) => state.ClientReducer
    );

    useEffect(() => {
        if (clients.length == 0) {
            dispatch(startGetClient());
        }
    }, [clients])

    //funcion para eliminar categoria
    const deleteClient = (id: string) => {
        dispatch(startRemoveClient(id));
    }

    const editClient = (item: any) => {
        dispatch(getClientById(item.name, item.email, item.id, item.date_of_birth))
        navigation.navigate(AppScreens.ClientEdit)
    }

    //muestra las categorias
    const renderItem = () => {
        return (
            <FlatList
                data={clients}
                renderItem={({ item }) => (
                    <ItemList
                        title={item.name}
                        onRemove={() => deleteClient(item.id)}
                        subtitle={item.email}
                        optionThirdItem={item.date_of_birth}
                        onEdit={() => editClient(item)}
                    />
                )}
                keyExtractor={clients => (clients.id).toString()}
            />
        )
    };


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Header title="Clients" />
            </View>
            <SafeAreaView style={styles.body}>
                {
                    clients.length > 0 ?
                        <View >
                            {
                                renderItem()
                            }
                        </View>
                        :
                        <Text >Crear un cliente para empezar</Text>
                }
            </SafeAreaView>
            <TouchableOpacity style={styles.iconAdd}>
                <IconAdd size={30} name="plus" color="blue" linkTo={() => navigation.navigate(AppScreens.NewCategory)} />
            </TouchableOpacity>
        </SafeAreaView>
    );
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

export default Client;