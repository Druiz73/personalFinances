import React from "react";
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { View, StyleSheet } from 'react-native'

interface iconProps {
    size: number,
    name: string,
    color: string,
    linkTo: Function
}


const IconAdd: React.FC<iconProps> = ({ size, name, color, linkTo }) => {
    return (
        <View style={styles.footerCategory}>
            <Icon5 style={styles.iconAdd} onPress={() => linkTo()} name={name} size={size} color={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    footerCategory: {
        bottom: 0,
        display:"flex"
    },
    iconAdd: {
        alignSelf:"flex-end"
    }
})

export default IconAdd;