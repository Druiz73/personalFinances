import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

interface HeaderProps {
    title: String,
    Navigation?: Function
}

const Header: React.FC<HeaderProps> = ({ title, Navigation }) => {
    return (
        <View style={styles.navigation}>
            {Navigation ? <Icon5 style={styles.iconBack} onPress={() => Navigation()} name={'arrow-left'} size={30} color="white" /> : null}
            <Text style={styles.title}>{title}</Text>
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
    body: {},
    iconBack: {
        margin: 15
    }
})
export default Header;
