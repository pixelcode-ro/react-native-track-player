import * as React from 'react';
import {
    Menu,
  } from 'react-native-paper';
import { useNoxSetting } from '../../hooks/useSetting';
import Song from '../../objects/SongInterface';

enum ICONS {
  SEND_TO = '',
  COPY_SONG_NAME = '',
  COPY_SONG_URL  = '',
  GOTO_BILIBILI = '',
  SEARCH_IN_PLAYLIST = '',
  RENAME = '',
  RELOAD = '',
  REMOVE = '',
  REMOVE_AND_BAN_BVID = '',
}

export default (visible: boolean, setVisible: (val: boolean) => void, song: Song) => {
    const menuCoord = useNoxSetting(state => state.songMenuCoords);
    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={menuCoord}
          >
            <Menu.Item leadingIcon={ICONS.SEND_TO} onPress={() => {}} title="Undo" />
            <Menu.Item leadingIcon={ICONS.SEARCH_IN_PLAYLIST} onPress={() => {}} title="Undo" />
            <Menu.Item leadingIcon={ICONS.RENAME} onPress={() => {}} title="Undo" />
            <Menu.Item leadingIcon={ICONS.GOTO_BILIBILI} onPress={() => {}} title="Undo" />
            <Menu.Item leadingIcon={ICONS.RELOAD} onPress={() => {}} title="Undo" />
            <Menu.Item leadingIcon={ICONS.REMOVE} onPress={() => {}} title="Undo" />
            <Menu.Item leadingIcon={ICONS.REMOVE_AND_BAN_BVID} onPress={() => {}} title="Undo" />
          </Menu>
    )
}