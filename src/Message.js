import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import Bubble from './Bubble';
import Day from './Day';

import { isSameUser, isSameDay, warnDeprecated } from './utils';

export default (props = defaultProps) => {
    return (
        <View>
            {renderDay(props)}
            <View style={[
                styles[props.position].container,
                {
                    marginBottom: isSameUser(
                        props.currentMessage,
                        props.nextMessage
                    ) ? 2 : 10,
                },
            ]}>
                <Bubble
                    position={props.position}
                    currentMessage={props.currentMessage}
                    nextMessage={props.nextMessage}
                    previousMessage={props.previousMessage}
                />
            </View>
        </View>
    );
}

const renderDay = props => {
    if (props.currentMessage.createdAt == null) {
        return null;
    }

    return (
        <Day
            currentMessage={props.currentMessage}
            previousMessage={props.previousMessage}
        />
    );
};

const styles = {
    left: StyleSheet.create({
        container: {
            flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginLeft: 15,
                marginRight: 0,
        },
    }),
    right: StyleSheet.create({
        container: {
            flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                marginLeft: 0,
                marginRight: 15,
        },
    }),
};

// TODO: convert to flow types
// Message.propTypes = {
//     position: React.PropTypes.oneOf(['left', 'right']),
//     currentMessage: React.PropTypes.object,
//     nextMessage: React.PropTypes.object,
//     previousMessage: React.PropTypes.object,
// };
