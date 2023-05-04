import * as React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { View, Pressable } from 'react-native';
import { useNoxSetting } from '../../hooks/useSetting';
import { styles } from '../style';
import Song from '../../objects/SongInterface';
import { seconds2MMSS } from '../../utils/Utils';
import TrackPlayer from 'react-native-track-player';
import { playlistToTracklist } from '../../objects/Playlist';
import { NoxRepeatMode } from '../player/enums/repeatMode';

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
  const playmode = useNoxSetting(state => state.playerRepeat); // performance drain?

  const playSong = () => {
    if (id === currentPlayingId) {
      console.log('playlist id same');
    }
    setCurrentPlayingId(id);
    let tracks = playlistToTracklist(currentPlaylist, index);
    if (playmode === NoxRepeatMode.SHUFFLE) {
      const currentTrack = tracks[index];
      tracks = [...tracks].sort(() => Math.random() - 0.5);
      TrackPlayer.setQueue(tracks).then(() => {
        TrackPlayer.skip(tracks.indexOf(currentTrack)).then(() =>
          TrackPlayer.play()
        );
      });
    } else {
      TrackPlayer.setQueue(tracks).then(() => {
        TrackPlayer.skip(index).then(() => TrackPlayer.play());
      });
    }

    /**
       * ugly code testing out uninterrupted playlist queue change:
      TrackPlayer.getActiveTrackIndex().then(activeTrackIndex => {
        TrackPlayer.getQueue().then(queue => {
          const activeTrack = queue[activeTrackIndex!];
          let removeTrackIndex = [...Array(queue.length).keys()];
          removeTrackIndex.splice(activeTrackIndex!, 1);
          console.debug(removeTrackIndex, queue, activeTrack, activeTrackIndex!);
          TrackPlayer.remove(removeTrackIndex).then(() => {
            TrackPlayer.getQueue().then(newQueue =>
              console.log('newQueue b4 insert', newQueue)
            );
            TrackPlayer.add(trackList).then(() => {
              TrackPlayer.getQueue().then(newQueue =>
                console.log('newQueue ', newQueue)
              );
            });
          });
        });
      });
      return;
       */
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
export default SongInfo;
