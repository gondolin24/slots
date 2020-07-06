import {IonCardContent} from '@ionic/react';
import React, {useState} from 'react';


interface ContainerProps {
    solving: boolean
}
function getUrl(data:boolean){
    return (data) ? 'https://assets6.lottiefiles.com/packages/lf20_KDKNot.json' : 'https://assets8.lottiefiles.com/packages/lf20_8JqYfK.json'
}

const LottieStuff: React.FC<ContainerProps> = (props) => {
    return (
        <IonCardContent class={'derp'}>
            <lottie-player autoplay={true} loop={true} src={getUrl(props.solving)}>
            </lottie-player>
        </IonCardContent>
    );
};

export default LottieStuff;
