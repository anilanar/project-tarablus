import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Actions = (props = defaultProps, context) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onActionsPress(props, context)}
        >
            {this.renderIcon(props)}
        </TouchableOpacity>
    );
}

const renderIcon = props => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.iconText}> + </Text>
        </View>
    );
};

const onActionsPress = (props, context) => () => {
    const options = Object.keys(props.options);
    const cancelButtonIndex = Object.keys(props.options).length - 1;
    context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex,
        tintColor: props.optionTintColor
    }, (buttonIndex) => {
        const action = Object.keys(props.options)
            .find((_, idx) => idx === buttonIndex);
        props.options[action](props);
    });
};

const styles = StyleSheet.create({
    container: {
        width: 26,
            height: 26,
            marginLeft: 10,
            marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

const defaultProps = {
    onSend: () => {},
    options: {},
    optionTintColor: '#007AFF',
};

// TODO: Convert types to flow types
Actions.contextTypes = {
    actionSheet: React.PropTypes.func,
};

Actions.propTypes = {
    onSend: React.PropTypes.func,
    options: React.PropTypes.object,
    optionTintColor: React.PropTypes.string,
};

export default Actions;
