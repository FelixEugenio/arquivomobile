// Dashboard.tsx
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Linking } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../routes/routes'; // Importe o tipo do parâmetro de navegação

interface DashboardProps {
  navigation: any; // Ou utilize o tipo específico para a navegação se estiver disponível
}

interface SearchResult {
  key: string;
  title: string;
  snippet: string;
  link: string;
}

export default function Dashboard({ navigation }: DashboardProps) {
  const { signOut } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    if (search === '') {
      return;
    }

    try {
      const response = await axios.get(`https://arquivo.pt/textsearch?q=${search}`);

      const results: SearchResult[] = response.data.response_items.map((result: any, index: number) => ({
        title: result.title,
        snippet: stripHtmlTags(result.snippet),
        link: result.link,
        key: String(index),
      }));

      setSearchResults(results);
    } catch (error) {
      console.error('Erro ao buscar informações do Arquivo.pt:', error);
    }
  };

  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handleResultPress(item)}>
      <Text style={styles.resultTitle}>{item.title}</Text>
      <Text style={styles.resultSnippet}>{item.snippet}</Text>
    </TouchableOpacity>
  );

  const handleResultPress = (result: SearchResult) => {
    navigation.navigate('Details', {
      title: result.title,
      snippet: result.snippet,
      link: result.link,
    });
  };

  const handleOpenURL = (url: string | undefined) => {
    if (url && url.trim() !== '') {
      Linking.openURL(url);
    }
  };

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Feather name="log-out" size={24} color="#FFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Pesquisar</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquise Qualquer Coisa"
        placeholderTextColor="#FFF"
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
          style={styles.resultsList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1d1d2e',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#FFF',
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold',
  },
  resultsList: {
    width: '90%',
    marginTop: 12,
  },
  resultItem: {
    backgroundColor: '#101026',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  resultSnippet: {
    fontSize: 16,
    color: '#FFF',
  },
  logoutButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#3fffa3',
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
