import React from 'react';

import {
    Image,
    ListView,
    StyleSheet,
    View,
} from 'react-native';

import shallowequal from 'shallowequal';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import md5 from 'md5';
import LoadEarlier from './LoadEarlier';
import Message from './Message';

export default class MessageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.renderLoadEarlier = this.renderLoadEarlier.bind(this);
        this.renderScrollComponent = this.renderScrollComponent.bind(this);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1.hash !== r2.hash;
            }
        });

        const messagesData = this.prepareMessages(props.messages);
        this.state = {
            dataSource: dataSource.cloneWithRows(messagesData.blob, messagesData.keys)
        };
    }

    prepareMessages(messages) {
        return {
            keys: messages.map(m => m._id),
            blob: messages.reduce((o, m, i) => {
                const previousMessage = messages[i + 1] || {};
                const nextMessage = messages[i - 1] || {};
                // add next and previous messages to hash to ensure updates
                const toHash = JSON.stringify(m) + previousMessage._id + nextMessage._id;
                o[m._id] = {
                    ...m,
                    previousMessage,
                    nextMessage,
                    hash: md5(toHash)
                };
                return o;
            }, {})
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!shallowequal(this.props, nextProps)) {
            return true;
        }
        if (!shallowequal(this.state, nextState)) {
            return true;
        }
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.messages === nextProps.messages) {
            return;
        }
        const messagesData = this.prepareMessages(nextProps.messages);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(messagesData.blob, messagesData.keys)
        });
    }

    renderLoadEarlier() {
        if (this.props.loadEarlier === true) {
            const loadEarlierProps = {
                ...this.props,
            };
            return (
                <LoadEarlier {...loadEarlierProps}/>
            );
        }
        return null;
    }

    scrollTo(options) {
        this._invertibleScrollViewRef.scrollTo(options);
    }

    renderRow(message, sectionId, rowId) {
        if (!message._id && message._id !== 0) {
            console.warn('GiftedChat: `_id` is missing for message', JSON.stringify(message));
        }
        if (!message.user) {
            console.warn('GiftedChat: `user` is missing for message', JSON.stringify(message));
            message.user = {};
        }

        const messageProps = {
            ...this.props,
            key: message._id,
            currentMessage: message,
            previousMessage: message.previousMessage,
            nextMessage: message.nextMessage,
            position: message.user._id === this.props.user._id ? 'right' : 'left',
        };

        return <Message {...messageProps}/>;
    }

    renderScrollComponent(props) {
        const invertibleScrollViewProps = this.props.invertibleScrollViewProps;
        return (
            <InvertibleScrollView
                {...props}
                {...invertibleScrollViewProps}
                ref={component => this._invertibleScrollViewRef = component}
            />
        );
    }

    render() {
        return (
            /* http://i.imgur.com/tj30Ewe.png */
            <View ref='container' style={{flex:1}}>
                <Image source={require('../images/whatsapp.png')} style={styles.container} >
                    <ListView
                        style={styles.list}
                        enableEmptySections={true}
                        keyboardShouldPersistTaps={true}
                        automaticallyAdjustContentInsets={false}
                        initialListSize={20}
                        pageSize={20}

                        dataSource={this.state.dataSource}

                        renderRow={this.renderRow}
                        renderHeader={this.renderFooter}
                        renderScrollComponent={this.renderScrollComponent}
                    />
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'stretch',
        width: null,
        height: null,
    },
    list: {
        backgroundColor:'#e5ddd5e0',
    },
});


MessageContainer.defaultProps = {
    messages: [],
    user: {},
    onLoadEarlier: () => {
    },
};

MessageContainer.propTypes = {
    messages: React.PropTypes.array,
    user: React.PropTypes.object,
    onLoadEarlier: React.PropTypes.func,
};
