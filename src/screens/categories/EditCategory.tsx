import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
//components
import { TextField } from '../../components/TextField';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, startEditCategory } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';



type EditCategoryScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.EditCategory>;

interface EditCategoryScreenProps {
    navigation: EditCategoryScreenNavigationProps;
}


const EditCategory: React.FC<EditCategoryScreenProps> = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const [name, setname] = useState('')

    const { category, message } = useSelector(
        (state: ApplicationState) => state.categoryReducer
    );

    const onTapSaveEdit = () => {
        if (name == '') {
            Toast.show("Datos invalidos", Toast.SHORT, [Toast.TOP])
        } else {
            dispatch(startEditCategory(category.id, name));
            setTimeout(() => {
                Toast.show(message, Toast.SHORT, [Toast.TOP])
                navigation.navigate(AppScreens.Categories)
            }, 500);
        }

    }

    return (
        <View>
            <Header title="Edit Category" />
            <View style={styles.body}>
                <TextField textContentType="name" placeholder={category.name} onTextChange={setname} />
            </View>
            <Button title='Guardar' onTap={onTapSaveEdit}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default EditCategory;