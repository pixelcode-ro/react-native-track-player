import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 4,
    alignItems: 'center',
  },
  topBarContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    top: 4,
  },
  actionRowContainer: {
    flexDirection: 'column',
    width: '96%',
    paddingLeft: 5,
    paddingright: 5,
    left: '2%',
    alignItems: 'center',
    height: 140,
  },
});
