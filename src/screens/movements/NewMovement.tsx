import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { TextField } from '../../components/TextField';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Toast from 'react-native-simple-toast';
import Dropdown from '../../components/DropDown';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { startAddCurrency, ApplicationState } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';


type NewMovementsScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.NewMovement>;

interface NewMovementsScreenProps {
    navigation: NewMovementsScreenNavigationProps;
}

interface IAbreviatureArray {
    label: string,
    value: string
}

const NewMovements: React.FC<NewMovementsScreenProps> = (props) => {

    const { navigation } = props;
    const dispatch = useDispatch();

    const [categoriesArray, setCategoriesArray] = useState<IAbreviatureArray[]>([])
    const [CategorySelected, setCategorySelected] = useState('')
    const [abreviatureArray, setabreviatureArray] = useState<IAbreviatureArray[]>([])
    const [abreviatureSelected, setAbreviatureSelected] = useState('')
    const [typeSelected, setTypeSelected] = useState('')
    const [titleMovement, settitleMovement] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')

    const { message, currencies } = useSelector(
        (state: ApplicationState) => state.CurrencyReducer
    );

    const { categories } = useSelector(
        (state: ApplicationState) => state.categoryReducer
    );


    useEffect(() => {
        if (message) {
            Toast.show(message, Toast.SHORT)
        }
    }, [message])

    useEffect(() => {
        getCurrencies();
        getCategories();
    }, [])

    const getCurrencies = async () => {
        let abreviatures: IAbreviatureArray[] = [];
        currencies.map((value) => {
            abreviatures.push({ label: value.abreviature, value: value.abreviature })
        })
        setabreviatureArray(abreviatures)
    }

    const getCategories = () => {
        let categoriesNames: IAbreviatureArray[] = [];
        categories.map((value) => {
            categoriesNames.push({ label: value.name, value: value.name })
        })
        setCategoriesArray(categoriesNames)
    }

    const onTapSaveMovements = (MovementsState: string, Abreviature: string) => {
        if (MovementsState == '' || Abreviature == '') {
            Toast.show("Datos invalidos", Toast.SHORT, [Toast.CENTER])
        } else {
            dispatch(startAddCurrency(MovementsState, Abreviature))
            setTimeout(() => {
                navigation.navigate(AppScreens.Currency)
            }, 500);
        }
    };


    return (
        <View>
            <View>
                <Header title="New Movement" />
            </View>
            <View style={styles.body}>
                <TextField textContentType="name" placeholder='Enter the title' onTextChange={settitleMovement} />
                <Dropdown items={categoriesArray} selected={CategorySelected}
                    selectedValue={setCategorySelected} placeHolder={{
                        label: 'Select a category...',
                        value: null,
                        color: 'black'
                    }} />
                <Dropdown items={[{ label: "Egreso", value: "Egreso" }, { label: "Ingreso", value: "Ingreso" }]} selected={typeSelected}
                    selectedValue={setTypeSelected} placeHolder={{
                        label: 'Select a type...',
                        value: null,
                        color: 'black'
                    }} />
                < View style={styles.amountInputs}>
                    <TextField textContentType="name" placeholder='Amount' onTextChange={settitleMovement} />
                    <Dropdown items={abreviatureArray} selected={abreviatureSelected}
                        selectedValue={setAbreviatureSelected} placeHolder={{
                            label: '...',
                            value: null,
                            color: 'black'
                        }} />

                </View>
                <TextField textContentType="name" placeholder='Description' onTextChange={setDescription} />
            </View>
            < View style={styles.button}>
                <Button title='Agregar' onTap={() => onTapSaveMovements()} />
            </View>
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
    },
    amountInputs: {
        // display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        maxHeight: 80,
        
    },
    button: {
        bottom: 0,
        marginBottom: 0,
        flexShrink:1
    }
})
export default NewMovements;