import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>Nome: {user?.name}</Text>
        <Text style={styles.userInfoText}>Email: {user?.email}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d2e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24,
  },
  userInfo: {
    backgroundColor: '#101026',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
    width: '90%',
  },
  userInfoText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    padding: 12,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026',
  },
});
