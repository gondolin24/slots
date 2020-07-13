import {IonBadge, IonItem, IonLabel} from "@ionic/react";
import * as React from "react";

interface ModelProps {
    labelValue: string
    label: string
    color: string
}

const BadgeLabel: React.FC<ModelProps> = (props) => {
    return (

        <IonItem>
            <IonLabel>{props.label}</IonLabel>
            <IonBadge color={props.color}>{props.labelValue}</IonBadge>
        </IonItem>

    );
};

export default BadgeLabel;
