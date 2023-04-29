import * as React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { View, Pressable } from 'react-native';
import { useNoxSetting } from '../../hooks/useSetting';
import { styles } from '../style';
import Song from '../../objects/SongInterface';

function SongInfo({
  item,
  index,
  currentPlaying,
}: {
  item: Song;
  index: number;
  currentPlaying: boolean;
}) {
  const [title, id, artist] = [item.parsedName, item.id, item.singer];
  const setCurrentPlayingId = useNoxSetting(state => state.setCurrentPlayingId);

  return (
    <View
      style={{
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        backgroundColor: currentPlaying ? 'lightgrey' : 'white',
      }}
    >
      <View style={{ flex: 5 }}>
        <Pressable onPress={() => setCurrentPlayingId(String(id))}>
          <Text variant="titleMedium">{`${String(index + 1)}. ${title}`}</Text>
          <Text variant="titleSmall" style={{ color: 'grey' }}>
            {artist}
          </Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <IconButton
          icon="dots-vertical"
          onPress={() => console.log}
          size={20}
        />
      </View>
    </View>
  );
}
export default React.memo(SongInfo);
