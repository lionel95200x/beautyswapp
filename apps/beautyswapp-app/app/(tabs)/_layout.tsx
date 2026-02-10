import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeTabs, Icon, Label, VectorIcon } from 'expo-router/unstable-native-tabs';
import { Platform, ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
  const { user, loading } = useAuth();

  console.log('User in TabLayout:', user);
  // Toujours appeler tous les hooks AVANT tout return conditionnel
  const content = (
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

  // Return conditionnel APRÈS que tous les hooks soient appelés
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return content;
}
