import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import moment from 'moment/min/moment-with-locales.min';

const Time = (props, context) => {
    const {message, position} = props;
    const createdAt = moment(message.createdAt)
        .locale(context.getLocale())
        .format('LT');
    return (
        <View style={styles[position].container}>
            <Text style={styles[position].text}>
                {createdAt}
            </Text>
        </View>
    );
};

const containerStyle = {
    marginLeft: 15
};

const textStyle = {
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'right',
    color: 'rgba(0,0,0,.45)',
};

const styles = {
    left: StyleSheet.create({
        container: {
            ...containerStyle,
        },
        text: {
            ...textStyle,
        },
    }),
    right: StyleSheet.create({
        container: {
            ...containerStyle,
        },
        text: {
            ...textStyle,
        },
    }),
};

Time.contextTypes = {
    getLocale: React.PropTypes.func,
};

Time.propTypes = {
    position: React.PropTypes.oneOf(['left', 'right']),
    message: React.PropTypes.object,
};

export default Time;
