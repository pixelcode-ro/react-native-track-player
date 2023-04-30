import * as React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { styles } from '../style';
import SongInfo from './SongInfo';
import { useNoxSetting } from '../../hooks/useSetting';
import { Dimensions } from 'react-native';

/*
import Song, { dummySong } from '../../objects/SongInterface';
const DUMMYDATA = [...Array(1222).keys()].reduce(
  (accumulator, currentValue) => accumulator.concat(dummySong()),
  [] as Array<Song>
);
*/

export default () => {
  const currentPlayingId = useNoxSetting(state => state.currentPlayingId);
  const currentPlaylist = useNoxSetting(state => state.currentPlaylist);

  return (
    <View
      style={{
        ...styles.topBarContainer,
        flex: 5,
      }}
    >
      <FlashList
        data={currentPlaylist.songList}
        renderItem={({ item, index }) => (
          <SongInfo
            item={item}
            index={index}
            currentPlaying={item.id === currentPlayingId}
          />
        )}
        keyExtractor={item => String(item.id)}
        estimatedItemSize={20}
        extraData={currentPlayingId}
      />
    </View>
  );
};
