import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Home() {
    const { signOut } = useContext(AuthContext)

 return (
   <View>
        <Text>Tela Home</Text>
        <Button 
            title='Sair'
            onPress={ () => signOut()}
        />
   </View>
  );
}