import React from 'react';
import {
    Clipboard,
    Image,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import MessageText from './MessageText';
import MessageImage from './MessageImage';
import Time from './Time';

import { isSameUser, isSameDay, warnDeprecated } from './utils';

const Bubble = props => {
    const {position} = props;
    const positionalStyles = styles[position];
    return (
        <View style={positionalStyles.container}>
            <Image source={
                position === 'left'
                    ? require(`../images/bubble-tail-left.png`)
                    : require(`../images/bubble-tail-right.png`)
            } style={positionalStyles.tail}>
            </Image>
            {renderUsername(props)}
            <View style={positionalStyles.wrapper}>
                {renderMessageImage(props)}
                {renderMessageText(props)}
                {renderTime(props)}
            </View>
        </View>
    );
};

const renderUsername = props => {
    if (props.position !== 'left') {
        return null;
    }
    return (
        <Text style={styles[props.position].usernameStyle}>
            {props.currentMessage.user.name}
        </Text>
    );
};

const renderMessageImage = props => {
    const {currentMessage} = props;
    if (currentMessage.image == null) {
        return null;
    }
    return <MessageImage message={currentMessage} />;
};

const renderMessageText = props => {
    const {
        currentMessage,
        position,
    } = props;

    if (currentMessage.text == null) {
        return null;
    }

    return (
        <MessageText
            position={position}
            message={currentMessage}
        />
    );
};

const renderTime = props => {
    const {
        currentMessage,
        position,
    } = props;

    if (currentMessage.createdAt == null) {
        return null;
    }

    return (
        <Time
            position={position}
            message={currentMessage}
        />
    );
};

const containerStyle = {
    flex: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'column',
    minHeight: 20,
    borderRadius: 7,
};

const wrapperStyle = {
    flex: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flexDirection: 'row',
};

const usernameStyle = {
    flexGrow: 1,
    flexShrink: 0,
    fontSize: 11,
    color: 'red',
    marginBottom: 5,
};

// TODO: some refactoring of styles here
const styles = {
    left: StyleSheet.create({
        container: {
            backgroundColor: 'white',
            marginRight: 60,
            ...containerStyle,
        },
        wrapper: {
            ...wrapperStyle,
        },
        tail: {
            position: 'absolute',
            left: -11,
            bottom: 3,
            width: 12,
            height: 19,
            tintColor: 'white',
        },
        username: {
            ...usernameStyle,
        },
    }),
    right: StyleSheet.create({
        container: {
            backgroundColor: '#dcf8c6',
            marginLeft: 60,
            ...containerStyle,
        },
        wrapper: {
            ...wrapperStyle,
        },
        tail: {
            position: 'absolute',
            right: -11,
            bottom: 3,
            width: 12,
            height: 19,
            tintColor: '#dcf8c6',
        },
    }),
};

// TODO go over default props to see if they make sense
Bubble.defaultProps = {
    position: 'left',
    currentMessage: {
        text: null,
        createdAt: null,
        image: null,
    },
    nextMessage: {},
    previousMessage: {},
};

Bubble.propTypes = {
    position: React.PropTypes.oneOf(['left', 'right']),
    currentMessage: React.PropTypes.object,
    nextMessage: React.PropTypes.object,
    previousMessage: React.PropTypes.object,
};

export default Bubble;
