import React, { useRef } from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { v4 as uuidv4 } from 'uuid';
import { IconButton, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../style';
import { useNoxSetting } from '../../hooks/useSetting';
import { ViewEnum } from '../../enums/View';
import AddPlaylistButton from '../buttons/AddPlaylistButton';
import { STORAGE_KEYS } from '../../utils/ChromeStorage';

export default (props: any) => {
  const navigation = useNavigation();
  const playlists = useNoxSetting(state => state.playlists);
  const playlistIds = useNoxSetting(state => state.playlistIds);
  // HACK: tooo lazy to list state up...
  // and how to property type this?
  const addPlaylistButtonRef = useRef<any>(null);
  const setCurrentPlaylist = useNoxSetting(state => state.setCurrentPlaylist);
  const goToPlaylist = (playlistId: string) => {
    setCurrentPlaylist(playlists[playlistId]);
    navigation.navigate(ViewEnum.PLAYER_PLAYLIST as never);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Divider></Divider>
      <DrawerItem
        label=""
        icon={() => (
          <AddPlaylistButton fromList={null} ref={addPlaylistButtonRef} />
        )}
        onPress={
          addPlaylistButtonRef.current
            ? () => addPlaylistButtonRef.current!.setOpen()
            : () => void 0
        }
      />
      <DrawerItem
        label={playlists[STORAGE_KEYS.SEARCH_PLAYLIST_KEY].title}
        onPress={() => goToPlaylist(STORAGE_KEYS.SEARCH_PLAYLIST_KEY)}
        key={uuidv4()}
      />
      {playlistIds.map(val => (
        <DrawerItem
          label={playlists[val].title}
          onPress={() => goToPlaylist(val)}
          icon={() => (
            <IconButton
              icon="close"
              onPress={() => console.log('delete')}
              size={20}
              style={{ position: 'absolute', right: 10 }}
            />
          )}
          key={uuidv4()}
        />
      ))}
    </DrawerContentScrollView>
  );
};
