import * as React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { View } from 'react-native';
import { styles } from '../style';

export default function PlaylistInfo() {
  return (
    <View style={styles.topBarContainer}>
      <IconButton
        icon="menu"
        onPress={() => console.log}
        mode="contained"
        size={20}
      />
      <Text
        variant="titleMedium"
        style={{ top: 15, flex: 2, textAlign: 'center', left: 10 }}
      >
        playlist title1
      </Text>
      <IconButton
        icon="rss"
        onPress={() => console.log}
        mode="contained"
        size={20}
      />
      <IconButton
        icon="autorenew"
        onPress={() => console.log}
        mode="contained"
        size={20}
      />
    </View>
  );
}
