import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useAuthStore from '../store/authStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace('/(tabs)/home');
    } else {
      alert('Invalid credentials! Use test@gmail.com and password 123');
    }
  };  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hello Again!</Text>
        <Text style={styles.subtitle}>Welcome back you've{'\n'}been missed.</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email Id"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.forgot}>Forgot password</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.divider}>-----------------Or Continue With---------------</Text>

        <View style={styles.social}>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.googleIcon}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <AntDesign name="apple1" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
        </View>

        <Text style={styles.register}>
          Not a Member? <Text style={styles.link} onPress={() => router.push('/(auth)/register')}>Register Now</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8C4C4' },
  header: { padding: 40, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#8B4B4B', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#A66B6B', textAlign: 'center' },
  form: { flex: 1, backgroundColor: '#F5F5F5', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  input: { backgroundColor: 'white', padding: 18, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  forgot: { textAlign: 'right', color: '#B85C5C', marginBottom: 20, textDecorationLine: 'underline' },
  button: { backgroundColor: '#B85C5C', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
  divider: { textAlign: 'center', color: '#999', marginBottom: 20 },
  social: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 30 },
  socialBtn: { width: 60, height: 60, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  googleIcon: { fontSize: 28, fontWeight: 'bold', color: '#4285F4', fontFamily: 'serif' },
  register: { textAlign: 'center', color: '#666', marginTop: 'auto', paddingBottom: 30 },
  link: { color: '#B85C5C', fontWeight: '600' }
});
