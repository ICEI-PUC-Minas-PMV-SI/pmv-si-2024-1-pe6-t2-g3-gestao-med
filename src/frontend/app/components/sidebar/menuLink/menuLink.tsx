'use client'

import { usePathname } from 'next/navigation';
import styles from './menuLink.module.css';
import Link from 'next/link';

type MenuLinkProps = {
    list: ListProps[]
}

type ListProps = {
    title: string,
    path: string,
}

const MenuLink = ({ list }: MenuLinkProps) => {
    const pathname = usePathname();
    return (
        <div className={styles.container}>
            {list.map((item, index) => (
                               
                    <Link key={index} href={item.path} className={`${styles.link} ${item.path === pathname && styles.active}`}>
                        {item.title}
                    </Link>
                
            ))}
        </div>
    );
}

export default MenuLink;
