import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { v4 as uuidv4 } from 'uuid';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../style';
import { useNoxSetting } from '../../hooks/useSetting';
import { ViewEnum } from '../../enums/View';

export default (props: any) => {
  const navigation = useNavigation();
  const playlists = useNoxSetting(state => state.playlists);
  const playlistIds = useNoxSetting(state => state.playlistIds);
  const setCurrentPlaylist = useNoxSetting(state => state.setCurrentPlaylist);
  const goToPlaylist = (playlistId: string) => {
    setCurrentPlaylist(playlists[playlistId]);
    navigation.navigate(ViewEnum.PLAYER_PLAYLIST as never);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label=""
        icon={() => (
          <IconButton
            icon="plus-circle-outline"
            onPress={() => null}
            size={20}
            style={{ position: 'absolute', right: 120 }}
          />
        )}
        onPress={() => console.log('add playlist')}
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
