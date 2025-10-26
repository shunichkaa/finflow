const EMOJI_TO_ID_MAP: Record<string, string> = {
    '✈': 'travel', '✈️': 'travel',
    '🏠': 'home', '🚗': 'car', '📚': 'education',
    '💍': 'wedding', '💻': 'laptop', '💎': 'jewelry',
    '💰': 'savings', '🏖': 'vacation', '🏖️': 'vacation',
    '📱': 'phone', '📷': 'camera', '💪': 'fitness',
    '🎁': 'gift', '🎵': 'music', '🎨': 'art', '📖': 'book',
};

export const migrateGoalIcon = (icon: string | undefined): string | undefined => {
    if (!icon) return icon;
    return EMOJI_TO_ID_MAP[icon] || icon;
};

export const isEmojiIcon = (icon: string | undefined): boolean => {
    if (!icon) return false;
    return icon in EMOJI_TO_ID_MAP;
};
