import { types } from '@babel/core';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface TextFieldProps {
  placeholder: string;
  isSecure?: boolean;
  onTextChange: Function;
  textContentType: any;
}

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  isSecure = false,
  onTextChange,
  textContentType

}) => {
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    setIsPassword(isSecure);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={isPassword}
        onChangeText={(text) => onTextChange(text)}
        style={styles.textField}
        textContentType={textContentType}
      />
      {isSecure && (
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={() => setIsPassword(!isPassword)}
        >
          <Image
            style={{ width: 60, height: 30 }}
            source={
              isPassword
                ? require('../images/show.png')
                : require('../images/hide.png')
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    borderRadius: 10,
    minHeight:70,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 10,
    borderStyle: 'solid',
    borderColor: '#2C1FE8',
    borderWidth: 2,
    minWidth:220,
    textAlignVertical:"center"
  },
  textField: {
    flex: 1,
    height: 50,
    fontSize: 20,
  }
});
