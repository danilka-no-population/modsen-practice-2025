export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('kanbanState');
        if (serializedState === null) {
            return undefined;
        } else {
            return JSON.parse(serializedState);
        }
    } catch (e) {
        // @ts-ignore
        console.log(`Ошибка загрузки: ${e.message}`);
        return undefined;
    }
};
// @ts-ignore
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('kanbanState', serializedState);
    } catch (e) {
        // @ts-ignore
        console.log(`Ошибка сохранения: ${e.message}`);
    }
};
