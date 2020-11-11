import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';

interface newCategorie {
    nombre: string,
    save: Function
}

export const NewCategory: React.FC<newCategorie> = ({ nombre, save }) => {


    const [category, setCategory] = useState('')

    const onTapSaveCategory= () => {
        
      };

    return (
        <View>
            <View style={styles.navigation}>
                <Text style={styles.title}>New Category</Text>
            </View>
            <View style={styles.body}>
                <TextField placeholder='Agregar Categoria' onTextChange={setCategory}/>
            </View>
            <Button title='Agregar' onTap={onTapSaveCategory}></Button>
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
    body:{}
})
