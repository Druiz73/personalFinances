import React from "react";
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native'

interface iconProps {
    size: number,
    name: string,
    color: string,
    linkTo: Function,
}


const IconAdd: React.FC<iconProps> = ({ size, name, color, linkTo }) => {
    return (
        <Icon5 onPress={() => linkTo()} name={name} size={size} color={color} />
    )
}

export default IconAdd;