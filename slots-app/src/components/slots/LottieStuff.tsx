import {IonCardContent, IonItem, IonLabel} from '@ionic/react';
import React, {useState} from 'react';


interface ContainerProps {
    lottieUrl: string,
    text: string
}

const LottieStuff: React.FC<ContainerProps> = (props) => {
    return (
        <IonCardContent class={'derp'}>
            <IonLabel color={"light"}>

            </IonLabel>
            <lottie-player autoplay={true} loop={true} src={props.lottieUrl}>
            </lottie-player>

        </IonCardContent>
    );
};

export default LottieStuff;
