import React from 'react';
import { IonInput, IonLabel } from "@ionic/react";
import "../styles/CustomField.css";

interface CustomFieldProps {
    field: {
        id: string;
        label: string;
        required: boolean;
        input: {
            props: {
                type: string;
                placeholder: string;
            };
            state: any; // Add the appropriate type for input state
        };
    };
    errors: {
        id: string;
        message: string;
    }[];
}

const CustomField: React.FC<CustomFieldProps> = ({ field, errors }) => {
    const error = errors && errors.filter(e => e.id === field.id)[0];
    const errorMessage = error && errors.filter(e => e.id === field.id)[0].message;

    return (
        <div className="field">
            <IonLabel className="ion-label">
                {field.label}
                {error && <p className="animate__animated animate__bounceIn">{errorMessage}</p>}
            </IonLabel>
            <IonInput className="customInput" {...field.input.props} {...field.input.state} />
        </div>
    );
};

export default CustomField;
