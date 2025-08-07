import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useAuthStore from '../store/authStore';
export default function Profile() {
  const { logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };
  const MenuItem = ({ icon, title, subtitle, onPress, iconLib, isLogout, isLast }) => (
    <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]} onPress={onPress}>
      <View style={styles.menuContent}>
        <View style={styles.iconBox}>
          {iconLib === 'FontAwesome' && <FontAwesome name={icon} size={20} color="#666" />}
          {iconLib === 'MaterialIcons' && <MaterialIcons name={icon} size={20} color="#666" />}
          {iconLib === 'Ionicons' && <Ionicons name={icon} size={20} color="#666" />}
          {iconLib === 'Feather' && <Feather name={icon} size={20} color="#666" />}
        </View>
        <View style={styles.textBox}>
          <Text style={[styles.title, isLogout && { color: '#FF6B6B' }]}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {!isLogout && <FontAwesome name="chevron-right" size={16} color="#ccc" />}
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <MaterialIcons name="more-horiz" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.userCard}>
          <View style={styles.userRow}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Test</Text>
              <Text style={styles.userEmail}>test@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Feather name="edit-2" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <MenuItem icon="map-marker" title="Address" subtitle="Manage your saved address" iconLib="FontAwesome" />
          <MenuItem icon="shopping-bag" title="Order History" subtitle="View your past orders" iconLib="Feather" />
          <MenuItem icon="language" title="Language" iconLib="MaterialIcons" />
          <MenuItem icon="notifications" title="Notifications" iconLib="Ionicons" isLast />
        </View>
        <View style={styles.section}>
          <MenuItem icon="headset" title="Contact Us" iconLib="MaterialIcons" />
          <MenuItem icon="help-circle" title="Get Help" iconLib="Feather" />
          <MenuItem icon="shield" title="Privacy Policy" iconLib="Feather" />
          <MenuItem icon="file-text" title="Terms and Conditions" iconLib="Feather" isLast />
        </View>

        <View style={styles.section}>
          <MenuItem icon="log-out" title="Log Out" iconLib="Feather" isLogout isLast onPress={handleLogout} />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', marginTop: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#F5F5F5' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  scrollView: { flex: 1 },
  userCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  userRow: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 10 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  userInfo: { flex: 1 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  userEmail: { fontSize: 14, color: '#666' },
  editBtn: { padding: 8, justifyContent: 'center', alignItems: 'center', minWidth: 40, minHeight: 40 },
  section: { backgroundColor: 'white', marginHorizontal: 20, marginBottom: 15, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 18, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  menuContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: { width: 40, alignItems: 'flex-start' },
  textBox: { flex: 1 },
  title: { fontSize: 16, fontWeight: '500', color: '#333', marginBottom: 2 },
  subtitle: { fontSize: 14, color: '#999' }
});
