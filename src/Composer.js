import React from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';

const Composer = props => {
    return (
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={'#b2b2b2'}
            multiline={true}
            onChange={e => {
                props.onChange(e);
            }}
            style={styles.textInput}
            value={props.text}
            accessibilityLabel={props.text || props.placeholder}
            enablesReturnKeyAutomatically={true}
            underlineColorAndroid="transparent"
        />
    );
};

const styles = StyleSheet.create({
  textInput: {
    height: Platform.select({
        ios: 33,
        android: 41,
    }), // TODO SHARE with GiftedChat.js and tests
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
    }),
  },
});

Composer.defaultProps = {
  onChange: () => {},
  text: '',
  placeholder: 'Type a message...',
};

Composer.propTypes = {
  onChange: React.PropTypes.func,
  text: React.PropTypes.string,
  placeholder: React.PropTypes.string,
};

export default Composer;
