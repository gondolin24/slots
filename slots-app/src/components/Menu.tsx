import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import {useLocation} from 'react-router-dom';
import {
  cafeOutline, cafeSharp,
  cardOutline,
  cardSharp,
  gameControllerOutline,
  gameControllerSharp,
  glassesOutline,
  glassesSharp, hammerOutline, hammerSharp
} from 'ionicons/icons';
import './Menu.css';
import {CURRENT_PATCH} from "../SlotConfig";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Slots',
    url: '/page/Slots',
    iosIcon: gameControllerOutline,
    mdIcon: gameControllerSharp
  },
  {
    title: 'Bank',
    url: '/page/Bank',
    iosIcon: cardOutline,
    mdIcon: cardSharp
  },
  {
    title: 'Rewards',
    url: '/page/Rewards',
    iosIcon: glassesOutline,
    mdIcon: glassesSharp
  },
  {
    title: 'Settings',
    url: '/page/SettingsPage',
    iosIcon: hammerOutline,
    mdIcon: hammerSharp
  },
  {
    title: 'Patch Notes',
    url: '/page/ChangeList',
    iosIcon: cafeOutline,
    mdIcon: cafeSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Slots</IonListHeader>
          <IonNote>Still in development</IonNote>
          <IonNote>V {CURRENT_PATCH}</IonNote>

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
