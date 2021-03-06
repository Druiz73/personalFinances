import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
//navigation
import { useNavigation } from '@react-navigation/native';
import { AppScreens } from '../useNavigation';



const Footer: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.footer}>
            <Icon style={styles.icon} name={'usd'} size={35} color="blue" />
            <Icon5 name={'user'} size={35} color="blue" />
            <View style={styles.categories} >
                <Icon name={'bars'} size={30} color="blue" onPress={() => navigation.navigate(AppScreens.Categories)} />
                <Text>categories</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        backgroundColor: "#9F3EDF",
        paddingBottom: 0
    },
    icon: {
        justifyContent: 'center'
    },
    categories: {
        display: "flex",
        alignItems: "center"
    }
})
export default Footer;
