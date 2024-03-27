import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import { StyledView } from "../../../constants/styledComponents";
import { Heading } from '../../../components/typography/Heading';
import { themeColor } from '../../../constants/themeColor';

const SettingOption = ({ title, onPress, isSwitch, isEnabled, toggleSwitch }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Text style={styles.settingText}>{title}</Text>
    {isSwitch && <Switch onValueChange={toggleSwitch} value={isEnabled} />}
  </TouchableOpacity>
);

export default function ProfilePage() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleTheme = () => setIsDarkTheme(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <StyledView style={styles.content}>
        <Heading title={`Settings`} fontSize="xl" setButton={false} />
        <View>
          <SettingOption 
            title="Notifications" 
            isSwitch={true} 
            isEnabled={isNotificationsEnabled} 
            toggleSwitch={toggleNotifications}
          />
          <SettingOption 
            title="Account Management" 
            onPress={() => console.log('Navigate to Account Management')}
          />
          {/* Add more settings options as needed */}
        </View>
      </StyledView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'top',
    justifyContent: 'top',
    backgroundColor: themeColor.appBackgroundColor, // Ensure this supports your desired look when using white text
  },
  content: {
    width: '100%',
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // You might want to adjust this as well to ensure it's visible on your background
  },
  settingText: {
    fontSize: 18,
    color: '#FFFFFF', // Text color set to white
  },
});
