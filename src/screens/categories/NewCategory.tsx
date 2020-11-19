import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
//redux
import { useDispatch } from 'react-redux';
import { startAddCategory } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';

type NewCategoryScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.NewCategory>;

interface NewCategoryScreenProps {
    navigation: NewCategoryScreenNavigationProps;
}


const NewCategory: React.FC<NewCategoryScreenProps> = (props) => {

    const { navigation } = props;
    const dispatch = useDispatch();

    const [CategoryState, setCategory] = useState('')

   
    const onTapSaveCategory = (CategoryState: String) => {
        dispatch(startAddCategory(CategoryState))
    };


    return (
        <View>
            <View style={styles.navigation}>
                <Header title="New Category" Navigation={navigation.goBack} />
            </View>
            <View style={styles.body}>
                <TextField placeholder='Agregar Categoria' onTextChange={setCategory} />
            </View>
            <Button title='Agregar' onTap={() => onTapSaveCategory(CategoryState)}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: '#2C1FE8',
        height: 170,
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 40
    },
    body: {},
    iconBack: {
        margin: 15
    }
})
export default NewCategory;