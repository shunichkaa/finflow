export const clearOldGoalsData = () => {
    try {
        const storedData = localStorage.getItem('goals-storage');
        if (storedData) {
            const parsed = JSON.parse(storedData);
            if (parsed?.state?.goals) {
                const hasEmojiIcons = parsed.state.goals.some((goal: any) => {
                    const icon = goal.icon;
                    return icon && /[\u{1F300}-\u{1F9FF}]/u.test(icon);
                });
                
                if (hasEmojiIcons) {
                    console.log('Detected old emoji icons in goals, clearing storage for migration...');
                    localStorage.removeItem('goals-storage');
                    window.location.reload();
                }
            }
        }
    } catch (error) {
        console.error('Error checking goals data:', error);
    }
};
