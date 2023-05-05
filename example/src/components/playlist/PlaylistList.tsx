import * as React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { styles } from '../style';
import SongInfo from './SongInfo';
import { useNoxSetting } from '../../hooks/useSetting';

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
  const [selected, setSelected] = useState<boolean[]>([]);
  const [checking, setChecking] = useState(false);
  const [searching, setSearching] = useState(false);

  const resetSelected = () => 
    setSelected(Array(currentPlaylist.songList.length).fill(false))
    
  const toggleSelected = (index: number) => {
    setSelected((val:  boolean[]) => {
      val[index] = !val[index];
      return val;
    })
  }
    
  useEffect(() => {
    resetSelected();
    setChecking(false);
    setSearching(false);
  }, [currentPlaylist])

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
            checking={checking}
            // TODO: callback?
            onChecked={useCallback(()=>{ toggleSelected(index) }, [])}
          />
        )}
        keyExtractor={item => item.id}
        estimatedItemSize={20}
        extraData={currentPlayingId}
      />
    </View>
  );
};
