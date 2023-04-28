import React from 'react';
import { StyleSheet, View } from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import { IconButton } from 'react-native-paper';
import { PlaybackError } from './PlaybackError';
import { PlayPauseButton } from './PlayPauseButton';

const performSkipToNext = () => TrackPlayer.skipToNext();
const performSkipToPrevious = () => TrackPlayer.skipToPrevious();

export const PlayerControls: React.FC = () => {
  const playback = usePlaybackState();
  const [playmode, setPlayMode] = React.useState('shuffle');
  const onClickPlaymode = () => {
    switch (playmode) {
      case 'shuffle':
        setPlayMode('repeat');
        break;
      case 'repeat':
        setPlayMode('repeat-once');
        break;
      case 'repeat-once':
        setPlayMode('shuffle');
        break;
      default:
        break;
    }
  };

  const onThumbsUp = () => console.log('click');

  return (
    <View style={styles.container}>
      {'error' in playback ? (
        <PlaybackError error={playback.error.message} />
      ) : (
        <></>
      )}

      <View style={styles.row}>
        <IconButton
          icon={playmode}
          onPress={onClickPlaymode}
          mode="contained"
          size={30}
          style={{ top: 10 }}
        />
        <IconButton
          icon="skip-previous"
          onPress={performSkipToPrevious}
          mode="contained"
          size={40}
          style={{ top: 5 }}
        />
        <PlayPauseButton state={playback.state} />
        <IconButton
          icon="skip-next"
          onPress={performSkipToNext}
          mode="contained"
          size={40}
          style={{ top: 5 }}
        />
        <IconButton
          icon="thumb-up-outline"
          onPress={onThumbsUp}
          mode="contained"
          size={30}
          style={{ top: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'baseline',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
