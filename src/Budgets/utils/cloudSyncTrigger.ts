
let globalSyncTrigger: (() => Promise<void>) | null = null;

export const setGlobalSyncTrigger = (syncFn: () => Promise<void>) => {
    globalSyncTrigger = syncFn;
};

export const triggerSync = async () => {
    if (globalSyncTrigger) {
        try {
            await globalSyncTrigger();
        } catch (error) {
            console.error('Auto-sync failed:', error);
        }
    }
};

