import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Provider,
  TextInput,
  Text,
  RadioButton,
} from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import Playlist, { dummyPlaylist } from '../../objects/Playlist';
import { useNoxSetting } from '../../hooks/useSetting';
interface props {
  visible: boolean;
  fromList: Playlist;
  onClose?: () => void;
  onSubmit?: () => void;
}

export default ({
  visible,
  fromList,
  onClose = () => void 0,
  onSubmit = () => void 0,
}: props) => {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const playlistIds = useNoxSetting(state => state.playlistIds);
  const playlists = useNoxSetting(state => state.playlists);
  const updatePlaylist = useNoxSetting(state => state.updatePlaylist);

  const handleClose = () => {
    setPlaylistIndex(0);
    onClose();
  };

  const handleSubmit = () => {
    setPlaylistIndex(0);
    if (playlistIds.length <= playlistIndex) {
      onClose();
      return;
    }
    const toList = playlists[playlistIds[playlistIndex]];
    updatePlaylist({
      ...toList,
      songList: toList.songList.concat(fromList.songList),
    });
    onSubmit();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleClose}>
        <Dialog.Title>{`Copy ${fromList.title} to Playlist...`}</Dialog.Title>
        <Dialog.Content>
          <FlashList
            data={playlistIds.map(val => [val, playlists[val].title])}
            renderItem={({ item, index }) => (
              <RadioButton
                value={item[1]}
                status={playlistIndex === index ? 'checked' : 'unchecked'}
                onPress={() => setPlaylistIndex(index)}
              />
            )}
            keyExtractor={item => item[0]}
            estimatedItemSize={20}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleClose}>Cancel</Button>
          <Button onPress={handleSubmit}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
