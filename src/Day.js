import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import moment from 'moment/min/moment-with-locales.min';

import { isSameDay, isSameUser, warnDeprecated } from './utils';

const Day = (props, context) => {
    const {
        currentMessage: current,
        previousMessage: previous,
    } = props;

    const createdAt = moment(current.createdAt)
                .locale(context.getLocale())
                .format('ll')
                .toUpperCase();

    const shouldRender = !isSameDay(current, previous)
        && createdAt != null;

    if (!shouldRender) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    {createdAt}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 10,
    },
    wrapper: {
        backgroundColor: 'rgba(225,245,254,0.92)',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    text: {
        backgroundColor: 'transparent',
        color: 'rgba(69,90,100,0.95)',
        fontSize: 12,
        fontWeight: '600',
    },
});

Day.contextTypes = {
    getLocale: React.PropTypes.func,
};

Day.defaultProps = {
    currentMessage: {
        createdAt: null,
    },
};

Day.propTypes = {
    currentMessage: React.PropTypes.object,
    previousMessage: React.PropTypes.object,
};

export default Day;
