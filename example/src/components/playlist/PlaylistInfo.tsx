import * as React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { View } from 'react-native';
import { styles } from '../style';
import { useNoxSetting } from '../../hooks/useSetting';

export default () => {
  const currentPlaylist = useNoxSetting(state => state.currentPlaylist);

  return (
    <View style={[styles.topBarContainer, { height: 55, top: 15 }]}>
      <View style={{ flex: 4 }}>
        <Text variant="titleMedium" style={{ top: 5 }}>
          {currentPlaylist.title}
        </Text>
        <Text variant="titleSmall" style={{ top: 5 }}>
          {currentPlaylist.songList.length}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 2 }}>
        <IconButton
          icon="playlist-edit"
          onPress={() => console.log}
          size={25}
        />
        <IconButton icon="autorenew" onPress={() => console.log} size={25} />
      </View>
    </View>
  );
};
