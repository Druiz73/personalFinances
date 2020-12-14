import React from 'react';
import { StyleSheet, TouchableOpacity, } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';



interface dropDownProps {
    items: Array<any>,
    selectedValue: Function
    selected: String,
    placeHolder: Object,
}

const Dropdown: React.FC<dropDownProps> = ({ items, selectedValue, selected, placeHolder }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => selectedValue(value)}
                items={items}
                value={selected}
                placeholder={placeHolder}
                useNativeAndroidPickerStyle={false}
                style={{
                    ...pickerSelectStyles, iconContainer: {
                        top: 10,
                        paddingRight: 10
                    },
                }}
                Icon={() => {
                    return <Icon
                        name="arrow-down"
                        color="black"
                        style={{
                            top: 10,
                            paddingRight: 0,
                            width: 25
                        }}
                    />
                }}
            />
        </TouchableOpacity>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        color: 'black',
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
    },
    inputAndroid: {
        color: 'black',
        fontSize: 20,
        paddingLeft: 25,
        textAlign: "left"
    },
    placeholder: { color: 'black' },
});

const styles = StyleSheet.create({
    container: {
        minWidth: 120,
        borderRadius: 10,
        minHeight: 70,
        margin: 10,
        borderStyle: 'solid',
        borderColor: '#2C1FE8',
        borderWidth: 2,
        color: "black",
        // alignItems:"center",
    }
})
export default Dropdown;
