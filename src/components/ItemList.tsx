import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

interface propsFlatList {
    title: String;
    onRemove: Function;
    onEdit: Function,
    subtitle?: String,
    optionThirdItem?: number
}

export const ItemList: React.FC<propsFlatList> = ({ title, onRemove, onEdit, subtitle, optionThirdItem }) => {
    return (
        <View style={styles.containerCategory}  >
            <View style={styles.containerTitle}>
                <Text style={styles.title} >{title}</Text>
                {subtitle && <Text style={styles.subtitle} >{subtitle}</Text>}
                {optionThirdItem && <Text style={styles.subtitle} >{optionThirdItem}</Text>}
            </View>
            <View style={styles.containerIcons}>
                <Icon size={25} onPress={() => onEdit()} style={styles.icon} name="edit" />
                <Icon onPress={() => onRemove()} size={25} style={styles.icon} name="trash-alt" />
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    title: {
        color: "black",
        marginTop: 25,
        display: "flex",
        fontSize: 27,
        paddingBottom: 25,
        justifyContent: 'space-between',
    },
    containerCategory: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        paddingLeft: 20,
        paddingRight: 10,
        borderStyle: 'solid',
        borderColor: '#2C1FE8',
        borderWidth: 1
    },
    containerIcons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 10,
        color:"blue"
    },
    subtitle: {
        color: "black",
        display: "flex",
        fontSize: 15,
        marginBottom: 5
    },
    containerTitle: {
        marginVertical: 5
    }
})

export default ItemList;