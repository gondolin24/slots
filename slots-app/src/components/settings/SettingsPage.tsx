import React, {useEffect, useState} from 'react';
import {IonContent, IonItem, IonLabel, IonList, IonToggle} from "@ionic/react";


function vibrationLabel(checked: boolean) {
    return (checked) ? 'on' : 'off'
}

interface SettingsPageProps {
    setSetMetaData: (val: any) => void
    metaData: any
}

const SettingsPage: React.FC<SettingsPageProps> = (props) => {

    const [checked, setChecked] = useState(props.metaData.settingsData.vibration);


    useEffect(() => {
        setChecked((props.metaData.settingsData.vibration))
    }, [props.metaData.settingsData.vibration])


    return (
        <IonContent>
            <IonList>
                <IonItem>
                    <IonLabel>Vibration: {vibrationLabel(checked)}</IonLabel>
                    <IonToggle checked={checked} onIonChange={e => {
                        props.metaData.settingsData.vibration = e.detail.checked
                        setChecked(e.detail.checked)
                        props.setSetMetaData(props.metaData)
                    }}/>
                </IonItem>
            </IonList>
        </IonContent>
    );
};

export default SettingsPage;
