import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

export const useDnDSensors = () => {
    return useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        })
    );
};
