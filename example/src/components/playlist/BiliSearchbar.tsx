import React, { useState } from 'react';
import { IconButton, Text, TextInput, ProgressBar } from 'react-native-paper';
import { View } from 'react-native';
import { searchBiliURLs } from '../../utils/BiliSearch';
import Song from '../../objects/SongInterface';

export default function BiliSearchbar({
  onSearched = (songs: Array<Song>) => console.log(songs),
}) {
  const [searchVal, setSearchVal] = useState('');
  const [searchProgress, setSearchProgress] = useState(-1);
  const handleSearch = async (val = searchVal) =>
    onSearched(
      (await searchBiliURLs({
        input: val,
        progressEmitter: () => void 0,
        favList: [],
        useBiliTag: false,
      })) as Array<Song>
    );

  return (
    <View style={{ width: '100%' }}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TextInput
          style={{ flex: 5 }}
          label="Bilibili URL"
          value={searchVal}
          onChangeText={val => setSearchVal(val)}
        />
        <IconButton icon="search-web" onPress={() => handleSearch(searchVal)} />
      </View>
      <ProgressBar
        progress={Math.max(searchProgress, 0)}
        indeterminate={searchProgress < 0}
      />
    </View>
  );
}
