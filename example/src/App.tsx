import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSetupPlayer, Player } from './components/player/View';
import { v4 as uuidv4 } from 'uuid';
import Playlist from './components/playlist/View';
import { styles } from './components/style';
import { IconButton } from 'react-native-paper';
import PlayerBottomPanel from './components/player/PlayerProgressControls';
import { useNoxSetting } from './hooks/useSetting';
import { initPlayerObject } from './utils/ChromeStorage';
import PlaylistDrawer from './components/playlists/View';

const App: React.FC = () => {
  const isPlayerReady = useSetupPlayer();
  const Drawer = createDrawerNavigator();
  const Tab = createMaterialTopTabNavigator();
  const initPlayer = useNoxSetting(state => state.initPlayer);

  function MyTabs() {
    return (
      <React.Fragment>
        <Tab.Navigator>
          <Tab.Screen
            name="Player"
            component={Player}
            options={{ tabBarStyle: { display: 'none' } }}
          />
          <Tab.Screen
            name="Playlist"
            component={Playlist}
            options={{ tabBarStyle: { display: 'none' } }}
          />
        </Tab.Navigator>
        <PlayerBottomPanel />
      </React.Fragment>
    );
  }

  function Test() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Article Screen</Text>
      </View>
    );
  }

  useEffect(() => {
    async function initializePlayer() {
      await initPlayer(await initPlayerObject());
    }

    function deepLinkHandler(data: { url: string }) {
      console.log('deepLinkHandler', data.url);
    }

    initializePlayer();

    // This event will be fired when the app is already open and the notification is clicked
    const subscription = Linking.addEventListener('url', deepLinkHandler);

    // When you launch the closed app from the notification or any other link
    Linking.getInitialURL().then(url => console.log('getInitialURL', url));

    return () => {
      subscription.remove();
    };
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={PlaylistDrawer}>
        <Drawer.Screen
          name="Home"
          component={MyTabs}
          options={{
            header: () => null,
            drawerIcon: () => <IconButton icon="home-outline" />,
          }}
        />
        <Drawer.Screen
          name="Settings"
          options={{ drawerIcon: () => <IconButton icon="cog" /> }}
          component={Test}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
