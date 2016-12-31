import React from 'react';
import {
    Linking,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import ParsedText from 'react-native-parsed-text';
import Communications from 'react-native-communications';

export default class MessageText extends React.Component {
    constructor(props) {
        super(props);
        this.onUrlPress = this.onUrlPress.bind(this);
        this.onPhonePress = this.onPhonePress.bind(this);
        this.onEmailPress = this.onEmailPress.bind(this);
    }

    onUrlPress(url) {
        Linking.openURL(url);
    }

    onPhonePress(phone) {
        const options = [
            'Text',
            'Call',
            'Cancel',
        ];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions({
            options,
            cancelButtonIndex,
        },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        Communications.phonecall(phone, true);
                        break;
                    case 1:
                        Communications.text(phone);
                        break;
                }
            });
    }

    onEmailPress(email) {
        Communications.email(email, null, null, null, null);
    }

    render() {
        const {position: pos} = this.props;
        return (
            <View style={styles[pos].container}>
                <ParsedText
                    style={styles[pos].text}
                    parse={[
                        {type: 'url', style: styles[pos].link},
                        {type: 'phone', style: styles[pos].link},
                        {type: 'email', style: styles[pos].link},
                    ]}
                    >
                    {this.props.message.text}
                </ParsedText>
            </View>
        );
    }
}

const textStyle = {
    color: 'black',
    fontSize: 11,
    lineHeight: 13,
};

const linkStyle = {
    color: 'blue',
    textDecorationLine: 'underline',
};

const styles = {
    left: StyleSheet.create({
        container: {
            flex: 0,
            alignSelf: 'center',
        },
        text: {
            ...textStyle,
        },
        link: {
            ...linkStyle,
        },
    }),
    right: StyleSheet.create({
        container: {
            flex: 0,
            alignSelf: 'center',
        },
        text: {
            ...textStyle,
        },
        link: {
            ...linkStyle,
        },
    }),
};

MessageText.contextTypes = {
    actionSheet: React.PropTypes.func,
};

MessageText.defaultProps = {
    position: 'left',
    message: {
        text: '',
    },
};

MessageText.propTypes = {
    position: React.PropTypes.oneOf(['left', 'right']),
    message: React.PropTypes.object,
};
