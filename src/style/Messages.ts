import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
  },
  headerStyle: {
    marginTop: 30,
    height: 70,
    textAlign: 'center',
    alignItems: 'center',
  },
  headerAvatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  headerTitle: {
    marginTop: 5,
    fontSize: 10,
  },
  inputView: {
    marginVertical: 10,
  },
  inputField: {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: ColorPalette.black,
    flexGrow: 1,
    maxWidth: '85%',
  },
  inputButton: {
    borderRadius: 45,
    backgroundColor: ColorPalette.black,
    width: 42,
    height: 42,
    marginLeft: 20,
  },
  inputButtonText: {
    color: ColorPalette.white,
    textAlign: 'center',
    fontSize: 20,
  },
  inputButtonTextClose: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
