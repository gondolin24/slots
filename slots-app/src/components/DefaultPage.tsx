import {IonContent} from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';

const DefaultPage: React.FC = () => {


    return (
        <IonContent>
            <ExploreContainer name={'default'}/>
        </IonContent>
    );
};

export default DefaultPage;
