import * as React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { styles } from '../style';
import PlaylistInfo from './PlaylistInfo';
import SongInfo, { SongItemProps } from './SongInfo';
import { v4 as uuidv4 } from 'uuid';
import { useNoxSetting } from '../../hooks/useSetting';
import BiliSearchbar from './BiliSearchbar';
import Song from '../../objects/SongInterface';

const DUMMYDATA = [...Array(1222).keys()].reduce(
  (accumulator, currentValue) =>
    accumulator.concat({
      id: uuidv4(),
      index: currentValue,
      title: 'dummy item',
      artist: 'dummy artist',
    }),
  [] as Array<SongItemProps>
);

const Playlist = () => {
  const currentPlayingId = useNoxSetting(state => state.currentPlayingId);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <BiliSearchbar
          onSearched={(songs: Array<Song>) => console.log(songs)}
        />
        <PlaylistInfo />
        <View style={{ ...styles.topBarContainer }}>
          <FlashList
            data={DUMMYDATA}
            renderItem={({ item }) => (
              <SongInfo
                item={item}
                currentPlaying={item.id === currentPlayingId}
              />
            )}
            keyExtractor={item => item.id}
            estimatedItemSize={20}
            extraData={currentPlayingId}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Playlist;
