import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Composer from './Composer';
import Send from './Send';

const InputToolbar = props => {
    return (
        <View style={styles.container}>
            <View style={styles.primary}>
                {renderComposer(props)}
                {renderSend(props)}
            </View>
        </View>
    );
};

const renderSend = props => {
    return (
        <Send
            onSend={props.onSend}
            text={props.text}
            label={props.label}
        />
    );
};

const renderComposer = props => {
    return (
        <Composer
            onChange={props.onChange}
            text={props.text}
            placeholder={props.placeholder}
        />
    );
};


const styles = StyleSheet.create({
    container: {
        borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#b2b2b2',
            backgroundColor: '#FFFFFF',
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    accessory: {
        height: 44,
    },
});

// TODO: cleanup properties
export default InputToolbar;
