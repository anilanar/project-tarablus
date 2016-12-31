import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const LoadEarlier = props => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                if (props.onLoadEarlier) {
                    props.onLoadEarlier();
                }
            }}
            disabled={props.isLoadingEarlier === true}
            accessibilityTraits="button"
        >
            <View style={styles.wrapper}>
                {renderLoading(props)}
            </View>
        </TouchableOpacity>
    );
};

const renderLoading = props => {
    if (props.isLoadingEarlier === true) {
        return (
            <View>
                <Text style={[
                    styles.text,
                    {
                        opacity: 0,
                    }
                ]}>
                    {props.label}
                </Text>
                <ActivityIndicator
                    color='white'
                    size='small'
                    style={styles.activityIndicator}
                />
            </View>
        );
    }

    return (
        <Text style={styles.text}>
            {props.label}
        </Text>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b2b2b2',
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 12,
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16,
    }),
  }
});

LoadEarlier.defaultProps = {
  onLoadEarlier: () => {},
  isLoadingEarlier: false,
  label: 'Load earlier messages',
};

LoadEarlier.propTypes = {
  onLoadEarlier: React.PropTypes.func,
  isLoadingEarlier: React.PropTypes.bool,
  label: React.PropTypes.string,
};

export default LoadEarlier;
