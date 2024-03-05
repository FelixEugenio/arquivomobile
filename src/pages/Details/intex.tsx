// Details.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface DetailsProps {
  route?: {
    params?: {
      title: string;
      snippet: string;
      link: string;
    };
  };
}

const Details: React.FC<DetailsProps> = ({ route }) => {
  const navigation = useNavigation();
  const { title, snippet, link } = route?.params || {};

  const handleOpenURL = () => {
    if (link && link.trim() !== '') {
      Linking.openURL(link).catch((error) => {
        console.error('Erro ao abrir o link:', error);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.snippet}>{snippet}</Text>

      <TouchableOpacity style={styles.linkButton} onPress={handleOpenURL}>
        <Text style={styles.linkButtonText}>Abrir Link</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
    marginBottom: 12,
    textAlign: 'center',
  },
  snippet: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  linkButton: {
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    padding: 12,
    alignSelf: 'center',
  },
  linkButtonText: {
    fontSize: 16,
    color: '#101026',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#3fffa3',
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;
