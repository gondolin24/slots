import React, {useEffect, useState} from 'react';
import {
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonSelect,
    IonSelectOption,
    IonToggle
} from "@ionic/react";


function vibrationLabel(checked: boolean) {
    return (checked) ? 'on' : 'off'
}

interface SettingsPageProps {
    setSetMetaData: (val: any) => void
    metaData: any
}

const SettingsPage: React.FC<SettingsPageProps> = (props) => {
    const [theme, setTheme] = useState<string>();
    const [gender, setGender] = useState<string>();

    const [number, setNumber] = useState<number>(props.metaData.bankBalance);
    const [numberSpecial, setNumberSpecial] = useState<number>(props.metaData.specialCoins);

    const [checked, setChecked] = useState(props.metaData.settingsData.vibration);
    const [override, setOverRide] = useState(false);
    const [text, setText] = useState<string>();


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
                <IonItem>
                    <IonLabel>Theme</IonLabel>
                    <IonSelect value={theme} placeholder="Select theme" onIonChange={e => {
                        console.log('hey')
                        setTheme(e.detail.value)
                        props.metaData.theme = e.detail.value
                        props.setSetMetaData(props.metaData)
                    }}>
                        <IonSelectOption value="default">default</IonSelectOption>
                        <IonSelectOption value="dogs">dogs</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel>Set Override</IonLabel>
                    <IonToggle checked={override} onIonChange={e => {
                        setOverRide(e.detail.checked)
                    }}/>
                </IonItem>

                {override &&
                <IonList>
                    <IonItem>
                        <IonInput type="number" value={numberSpecial} placeholder="special coins"
                                  onIonChange={e => setNumberSpecial(parseInt(e.detail.value!, 10))}/>
                    </IonItem>

                    <IonItem>
                        <IonInput type="number" value={number} placeholder="normal coins"
                                  onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}/>
                    </IonItem>

                    <IonItem>
                        <IonInput value={text} placeholder="Password" onIonChange={e => setText(e.detail.value!)}
                                  clearInput/>
                    </IonItem>
                    <IonButton expand="full" fill="outline" onClick={() => {
                        if (text === 'hhhyyy') {

                            setText('')
                            props.metaData.bankBalance = number
                            setOverRide(false)
                            props.metaData.specialCoins = numberSpecial
                            props.setSetMetaData(props.metaData)
                        }
                    }
                    }>Submit</IonButton>
                </IonList>}
            </IonList>

        </IonContent>
    );
};

export default SettingsPage;
