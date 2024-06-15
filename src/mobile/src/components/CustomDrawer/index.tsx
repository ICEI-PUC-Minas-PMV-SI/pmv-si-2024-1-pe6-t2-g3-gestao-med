import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { AuthContext } from '../../contexts/auth';
import { DrawerArea, DrawerItemListContainer, LogoutButtonContainer, Logo } from './styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons'


interface CustomDrawerIconProps {
    focused: boolean;
    size: number;
    color: string;
}

const logoutIcon: React.FC<CustomDrawerIconProps> = ({ focused, size, color }) => (
    <Icon name="logout" size={22} color={'#FFF'} />
);

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { signOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <DrawerArea>
                <DrawerItemListContainer>
                    <DrawerItemList {...props} />
                </DrawerItemListContainer>
                <Logo
                    source={require('../../assets/logotipo.png')}
                    
                    />
                <LogoutButtonContainer>
                    <DrawerItem
                        label="Sair"
                        onPress={() => signOut()}
                        style={{ backgroundColor: '#075281' }}
                        labelStyle={{ color: '#FFF', fontSize: 18 }}
                        icon={logoutIcon}
                    />
               
                    </LogoutButtonContainer>
            </DrawerArea>
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;
