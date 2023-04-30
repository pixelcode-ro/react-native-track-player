import React, { useEffect, useState } from 'react';
import TrackPlayer, { useActiveTrack } from 'react-native-track-player';
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Button, PlayerControls, Progress, TrackInfo } from './';
import { QueueInitialTracksService, SetupService } from '../../services';
import { styles } from '../style';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export function Player() {
  const track = useActiveTrack();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.contentContainer}>
        <View style={styles.topBarContainer}>
          <IconButton
            icon="playlist-music"
            onPress={() => navigation.navigate('Playlist' as never)}
          />
        </View>
        <TrackInfo track={track} />
      </View>
    </SafeAreaView>
  );
}

export function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) return;
      setPlayerReady(true);
      const queue = await TrackPlayer.getQueue();
      if (unmounted) return;
      if (queue.length <= 0) {
        await QueueInitialTracksService();
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}
