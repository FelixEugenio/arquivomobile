import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/AuthContext'

export default function SignUp(){
    const navigation = useNavigation()
  const { signUp,loadingAuth } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [name,setName] = useState('');
  const [password, setPassword] = useState('');

  async function handleSigUp(){
  
    if(email === '' || password === '' || name === ''){
      return;
    }

    await signUp({ email, password ,name})
    
  }

  function handleSignIn(){
    navigation.navigate('SignIn')
   }

  return(
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu Nome"   
          style={styles.input}     
          placeholderTextColor="#F0F0F0"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Digite seu email"   
          style={styles.input}     
          placeholderTextColor="#F0F0F0"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Sua senha"      
          style={styles.input}   
          placeholderTextColor="#F0F0F0"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}          
        />     

        <TouchableOpacity style={styles.button} onPress={handleSigUp}>
          {
            loadingAuth ? (
              <ActivityIndicator size={25} color="#FFF" />
            ):(
               <Text style={styles.buttonText}>Cadastrar-se</Text>
            )
          }
          
        </TouchableOpacity>  
        
      </View>
      <Text style={styles.buttonTextLink} onPress={handleSignIn}>Já tem uma conta? Faça Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#1d1d2e'
  },
  logo:{
    marginBottom: 18
  },
  inputContainer:{
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input:{
    width: '95%',
    height: 40,
    backgroundColor: '#101026',
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: '#FFF'
  },
  button:{
    width: '95%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
   fontSize: 18, 
   fontWeight: 'bold',
   color: '#101026',
  },
  buttonTextLink:{
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#FFF'
   },
  
})