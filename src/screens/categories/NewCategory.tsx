import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import Toast from 'react-native-simple-toast';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { startAddCategory, ApplicationState, startGetCategory } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';

type NewCategoryScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.NewCategory>;

interface NewCategoryScreenProps {
    navigation: NewCategoryScreenNavigationProps;
    message: String;
}

const NewCategory: React.FC<NewCategoryScreenProps> = (props) => {

    const { navigation } = props;
    const dispatch = useDispatch();

    const { message } = useSelector(
        (state: ApplicationState) => state.categoryReducer
    );

    const [CategoryState, setCategory] = useState('')

    useEffect(() => {
        if (message) {
            Toast.show(message, Toast.SHORT)
        }
    }, [message])


    const onTapSaveCategory = (CategoryState: string) => {
        if (CategoryState == '') {
            Toast.show("Datos invalidos", Toast.SHORT, [Toast.CENTER])
        } else {
            dispatch(startAddCategory(CategoryState));
            setTimeout(() => {
                navigation.navigate(AppScreens.Categories)
            }, 200);
            setCategory('');
        }
    };

    return (
        <View>
            <View>
                <Header title="New Category" />
            </View>
            <View style={styles.body}>
                <TextField placeholder='Agregar Categoria' onTextChange={setCategory} />
            </View>
            <Button title='Agregar' onTap={() => onTapSaveCategory(CategoryState)}></Button>
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
export default NewCategory;