import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '../../utils';

interface Category {
    nombre: string,
    get: Function
}

export const Categories: React.FC<Category> = ({ nombre, get }) => {


    const [category, setCategory] = useState('')
    const dispatch = useDispatch();

    const { navigate } = useNavigation();


   useEffect(()=>{

   })

    return (
        <View>
            <View style={styles.navigation}>
                <Text style={styles.title}> Category</Text>
            </View>
            <View style={styles.body}>
                <TextField placeholder='Agregar Categoria' onTextChange={setCategory}/>
            </View>
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
