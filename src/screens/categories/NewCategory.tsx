import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { useDispatch } from 'react-redux';
import { startAddCategory } from '../../redux'
import { Category } from './Categories';

interface newCategorie {
    category: string,
    save: Function
}


export const NewCategory: React.FC<newCategorie> = () => {

    const dispatch = useDispatch();


    const [CategoryState, setCategory] = useState({ category: '' })

    console.log(CategoryState)
    const onTapSaveCategory = (CategoryState: Object) => {
        dispatch(startAddCategory(CategoryState))
    };

    const handleChange = (ev: any) => {
        setCategory({
            category: ev.value
        })
    }

    return (
        <View>
            <View style={styles.navigation}>
                <Text style={styles.title}>New Category</Text>
            </View>
            <View style={styles.body}>
                <TextField placeholder='Agregar Categoria' onTextChange={handleChange} />
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
    body: {}
})
