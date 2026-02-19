import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeTabs, Icon, Label, VectorIcon } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        {Platform.select({
          ios: <Icon sf={{ default: 'house', selected: 'house.fill' }} />,
          android: <Icon src={<VectorIcon family={Ionicons} name="home-outline" />} />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <Label>Search</Label>
        {Platform.select({
          ios: <Icon sf={{ default: 'magnifyingglass', selected: 'magnifyingglass' }} />,
          android: <Icon src={<VectorIcon family={Ionicons} name="search-outline" />} />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="create">
        <Label>Create</Label>
        {Platform.select({
          ios: <Icon sf={{ default: 'plus.circle', selected: 'plus.circle.fill' }} />,
          android: <Icon src={<VectorIcon family={Ionicons} name="add-circle-outline" />} />,
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        {Platform.select({
          ios: <Icon sf={{ default: 'person', selected: 'person.fill' }} />,
          android: <Icon src={<VectorIcon family={Ionicons} name="person-outline" />} />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
