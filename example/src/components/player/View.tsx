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
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ViewEnum } from '../../enums/View';

export function Player({
  navigation,
}: {
  navigation: DrawerNavigationProp<ParamListBase>;
}) {
  const track = useActiveTrack();
  const navigationGlobal = useNavigation();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.contentContainer}>
        <View style={styles.topBarContainer}>
          <IconButton
            icon="menu"
            onPress={() => navigation.openDrawer()}
            style={{ flex: 1 }}
          />
          <Text style={{ flex: 4 }}>{''}</Text>
          <IconButton
            icon="playlist-music"
            onPress={() =>
              navigationGlobal.navigate(ViewEnum.PLAYER_PLAYLIST as never)
            }
            style={{ flex: 1 }}
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
      console.log('queue', queue);
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
