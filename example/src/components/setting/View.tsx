import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
} from 'react-native';

const Stack = createStackNavigator();

export default () => {

  function Settings() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Article Screen</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Settings} />
    </Stack.Navigator>
  );
}