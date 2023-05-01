import * as React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { View } from 'react-native';
import { styles } from '../style';
import { useNoxSetting } from '../../hooks/useSetting';
import { seconds2HHMMSS } from '../../utils/Utils';

export default () => {
  const currentPlaylist = useNoxSetting(state => state.currentPlaylist);

  return (
    <View style={[styles.topBarContainer, { top: 10 }]}>
      <View style={{ flex: 4 }}>
        <Text variant="titleMedium" style={{}}>
          {currentPlaylist.title}
        </Text>
        <Text variant="labelMedium" style={{}}>
          {`${currentPlaylist.songList.length} / ${seconds2HHMMSS(
            currentPlaylist.songList.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.duration,
              0
            )
          )}`}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 2,
          bottom: 5,
          justifyContent: 'flex-end',
        }}
      >
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
