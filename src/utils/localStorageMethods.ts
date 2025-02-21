export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('kanbanState');
        if (serializedState === null) {
            return undefined;
        } else {
            return JSON.parse(serializedState);
        }
    } catch (e) {
        console.log(`Ошибка загрузки: ${e.message}`);
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('kanbanState', serializedState);
    } catch (e) {
        console.log(`Ошибка сохранения: ${e.message}`);
    }
};
