import React, { useState, useCallback, useRef } from 'react';

interface SwipeConfig {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    threshold?: number; 
    velocity?: number; 
}

interface SwipeState {
    isSwiping: boolean;
    direction: 'left' | 'right' | 'up' | 'down' | null;
    distance: number;
}

export const useSwipeGesture = (config: SwipeConfig) => {
    const [swipeState, setSwipeState] = useState<SwipeState>({
        isSwiping: false,
        direction: null,
        distance: 0
    });

    const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
    const threshold = config.threshold || 50;
    const velocityThreshold = config.velocity || 0.3;

    const calculateVelocity = (distance: number, time: number): number => {
        return time > 0 ? distance / time : 0;
    };

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now()
        };

        setSwipeState(prev => ({ ...prev, isSwiping: true }));
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!touchStart.current) return;

        const touchCurrent = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now()
        };

        const deltaX = touchCurrent.x - touchStart.current.x;
        const deltaY = touchCurrent.y - touchStart.current.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        let direction: SwipeState['direction'] = null;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 0 ? 'right' : 'left';
        } else {
            direction = deltaY > 0 ? 'down' : 'up';
        }

        setSwipeState({
            isSwiping: true,
            direction,
            distance
        });

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
        }
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!touchStart.current) return;

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
            time: Date.now()
        };

        const deltaX = touchEnd.x - touchStart.current.x;
        const deltaY = touchEnd.y - touchStart.current.y;
        const timeDelta = touchEnd.time - touchStart.current.time;

        const velocity = calculateVelocity(
            Math.sqrt(deltaX * deltaX + deltaY * deltaY),
            timeDelta
        );

        const isThresholdMet = Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold;
        const isVelocityMet = velocity > velocityThreshold;

        if (isThresholdMet && isVelocityMet) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0 && config.onSwipeRight) {
                    config.onSwipeRight();
                } else if (deltaX < 0 && config.onSwipeLeft) {
                    config.onSwipeLeft();
                }
            } else {
                if (deltaY > 0 && config.onSwipeDown) {
                    config.onSwipeDown();
                } else if (deltaY < 0 && config.onSwipeUp) {
                    config.onSwipeUp();
                }
            }
        }

        touchStart.current = null;
        setSwipeState({
            isSwiping: false,
            direction: null,
            distance: 0
        });
    }, [config, threshold, velocityThreshold]);

    return {
        swipeProps: {
            onTouchStart: handleTouchStart,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
        },
        swipeState
    };
};

export const usePullToRefresh = (onRefresh: () => Promise<void>) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { swipeProps } = useSwipeGesture({
        onSwipeDown: async () => {
            if (window.scrollY === 0 && !isRefreshing) {
                setIsRefreshing(true);
                await onRefresh();
                setIsRefreshing(false);
            }
        },
        threshold: 80
    });

    return {
        pullToRefreshProps: swipeProps,
        isRefreshing
    };
};