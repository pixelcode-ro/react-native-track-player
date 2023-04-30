import * as React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { View, Pressable } from 'react-native';
import { useNoxSetting } from '../../hooks/useSetting';
import { styles } from '../style';
import Song from '../../objects/SongInterface';
import { seconds2MMSS } from '../../utils/Utils';
import TrackPlayer from 'react-native-track-player';
import { playlistToTracklist } from '../../objects/Playlist';

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
  const currentPlayingId = useNoxSetting(state => state.currentPlayingId);
  const currentPlaylist = useNoxSetting(state => state.currentPlaylist);

  const playSong = () => {
    if (String(id) === currentPlayingId) {
      console.log('playlist id same');
    }
    setCurrentPlayingId(String(id));
    playlistToTracklist(currentPlaylist, index).then(trackList => {
      console.log(trackList[index]);
      TrackPlayer.reset().then(() => {
        TrackPlayer.add(trackList).then(() => {
          TrackPlayer.skip(index).then(() => TrackPlayer.play());
        });
      });
    });
  };

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
        <Pressable onPress={playSong}>
          <Text variant="titleMedium">{`${String(index + 1)}. ${title}`}</Text>
          <Text variant="titleSmall" style={{ color: 'grey' }}>
            {artist}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Text variant="titleSmall" style={{ top: 13 }}>
          {seconds2MMSS(item.duration)}
        </Text>
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
