import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

interface propsFlatList {
    type: string,
    category: string,
    date: number,
    amount: number,
    currency: string,
    // onRemove: Function;
    // onEdit: Function,
    optionThirdItem?: string
}

export const MovementsList: React.FC<propsFlatList> = ({ type, category, date, amount, currency, optionThirdItem }) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title} >{category}</Text>
                    {date && <Text style={styles.subtitle} >{date}</Text>}
                </View>
                <View style={styles.containerTitle}>
                    <Text style={styles.title} >{type} {type == "Ingreso" ? <Icon name="long-arrow-alt-up" size={14} color="blue" /> : <Icon name="long-arrow-alt-down" size={14} color="red" />}</Text>
                    <Text style={styles.subtitle} >{amount} {currency}</Text>
                </View>
                <View style={styles.containerIcons}>
                    <Icon size={25} style={styles.icon} name="edit" />
                    <Icon size={25} style={styles.icon} name="trash-alt" />
                </View>
            </View>
            {optionThirdItem && <Text style={styles.subtitle} >{optionThirdItem}</Text>}
        </View>
    )
};

//onPress={() => onEdit()}
//onPress={() => onRemove()}
const styles = StyleSheet.create({
    title: {
        color: "black",
        marginTop: 8,
        display: "flex",
        fontSize: 18,
        paddingBottom: 15,
        justifyContent: 'space-between',
    },
    container: {
        margin: 10,
        paddingLeft: 20,
        paddingRight: 10,
        borderStyle: 'solid',
        borderColor: '#2C1FE8',
        borderWidth: 1
    },
    body: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerIcons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 10,
        color: "blue"
    },
    subtitle: {
        color: "black",
        fontSize: 15,
        marginBottom: 5
    },
    containerTitle: {
        marginVertical: 5
    }
})

export default MovementsList;