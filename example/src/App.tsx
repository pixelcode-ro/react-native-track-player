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
import Playlist from './components/playlist/View';
import { styles } from './components/style';
import { IconButton } from 'react-native-paper';
import PlayerBottomPanel from './components/player/PlayerProgressControls';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const isPlayerReady = useSetupPlayer();
  const Drawer = createDrawerNavigator();
  const Tab = createMaterialTopTabNavigator();
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
    function deepLinkHandler(data: { url: string }) {
      console.log('deepLinkHandler', data.url);
    }

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
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label=""
                icon={() => (
                  <IconButton
                    icon="plus-circle-outline"
                    onPress={() => null}
                    size={20}
                    style={{ position: 'absolute', right: 120 }}
                  />
                )}
                onPress={() => console.log('add playlist')}
              />
              {[...Array(23).keys()].map(val => (
                <DrawerItem
                  label={String(val)}
                  onPress={() => console.log(`playlist${val}`)}
                  icon={() => (
                    <IconButton
                      icon="close"
                      onPress={() => console.log('delete')}
                      size={20}
                      style={{ position: 'absolute', right: 10 }}
                    />
                  )}
                  key={uuidv4()}
                />
              ))}
            </DrawerContentScrollView>
          );
        }}
      >
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
