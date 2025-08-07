import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useAuthStore from '../store/authStore';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const register = useAuthStore((state) => state.register);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (fullName && email && password) {
      const success = await register({ fullName, email });
      if (success) {
        router.replace('/(tabs)/home');
      } else {
        alert('Registration failed. Please try again.');
      }
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Join The Glow!</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.inputIcon}>
            <AntDesign name="mail" size={16} color="#999" />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.inputIcon}>
            <AntDesign name="eye" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.inputIcon}>
            <AntDesign name="eye" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <Text style={styles.register}>
          Already a Member? <Text style={styles.link} onPress={() => router.back()}>Log In</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8C4C4' },
  header: { padding: 50, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#8B4B4B', textAlign: 'center' },
  form: { flex: 1, backgroundColor: '#F5F5F5', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  inputContainer: { position: 'relative', marginBottom: 15 },
  input: { backgroundColor: 'white', padding: 18, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  inputIcon: { position: 'absolute', right: 18, top: 18 },
  button: { backgroundColor: '#B85C5C', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 20, marginBottom: 40 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
  register: { textAlign: 'center', color: '#666', marginTop: 'auto', paddingBottom: 30 },
  link: { color: '#B85C5C', fontWeight: '600' }
});
