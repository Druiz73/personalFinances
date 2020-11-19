import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle, StyleSheet, View } from "react-native";
import { Button } from "./Button";
import Icon from 'react-native-vector-icons/FontAwesome5'

interface propsFlatList {
    title: String,

}
export const ItemList: React.FC<propsFlatList> = ({ title }) => {
    return (
        <TouchableOpacity style={styles.containerCategory}  >
            <Text style={styles.title} >{title}</Text>
            <View style={styles.containerIcons}>
                <Icon size={25} style={styles.icon} name="edit" />
                <Icon size={25} style={styles.icon} name="trash-alt" />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    title: {
        color: "black",
        marginTop: 25,
        display: "flex",
        fontSize: 30,
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
    icon:{
        marginRight:10
    }
})

export default ItemList;