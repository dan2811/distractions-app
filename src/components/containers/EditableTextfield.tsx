import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colours, fontFam, fontSize} from '../../styles/globalStyles';

interface Props extends TextInputProps {
  save: () => Promise<void>;
  placeholder: string;
}

const EditableTextfield = ({save, placeholder, ...props}: Props) => {
  const [editMode, setEditMode] = useState(false);
  return editMode ? (
    <View style={styles.container}>
      <TextInput {...props} style={styles.input} />
      <TouchableOpacity
        onPress={() => {
          setEditMode(false);
          save();
        }}>
        <Icon name="save" color={colours.faded} />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>{props.value ? props.value : placeholder}</Text>
      <TouchableOpacity onPress={() => setEditMode(true)}>
        <Icon name="edit" color={colours.faded} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  text: {
    fontFamily: fontFam,
    fontSize: fontSize.small,
    width: 300,
    height: 'auto',
    maxWidth: 300,
    maxHeight: 400,
    color: colours.tint,
  },
  input: {
    fontFamily: fontFam,
    fontSize: fontSize.smallToMedium,
    width: 300,
    height: 100,
    maxWidth: 300,
    maxHeight: 400,
    color: colours.background,
    backgroundColor: colours.faded,
    borderRadius: 10,
    padding: 10,
  },
});

export default EditableTextfield;
