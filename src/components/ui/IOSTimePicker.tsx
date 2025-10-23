import React, { useState, useRef, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
} from '@mui/material';
import { useThemeMode } from '../../Budgets/theme/ThemeContext';

interface IOSTimePickerProps {
    open: boolean;
    onClose: () => void;
    value: string; // "HH:mm" format
    onChange: (time: string) => void;
}

const IOSTimePicker: React.FC<IOSTimePickerProps> = ({ open, onClose, value, onChange }) => {
    const { mode } = useThemeMode();
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    
    const hoursRef = useRef<HTMLDivElement>(null);
    const minutesRef = useRef<HTMLDivElement>(null);
    const isInitializing = useRef(false);

    useEffect(() => {
        if (open && value) {
            const [h, m] = value.split(':');
            setHours(h.padStart(2, '0'));
            setMinutes(m.padStart(2, '0'));
            
            isInitializing.current = true;
            
            // Скролл к выбранному значению
            setTimeout(() => {
                if (hoursRef.current) {
                    hoursRef.current.scrollTop = parseInt(h) * 44;
                }
                if (minutesRef.current) {
                    minutesRef.current.scrollTop = parseInt(m) * 44;
                }
                
                setTimeout(() => {
                    isInitializing.current = false;
                }, 200);
            }, 100);
        }
    }, [open, value]);

    const handleApply = () => {
        onChange(`${hours}:${minutes}`);
        onClose();
    };

    const handleScroll = (ref: React.RefObject<HTMLDivElement>, setter: (val: string) => void) => {
        if (!ref.current || isInitializing.current) return;
        
        const scrollTop = ref.current.scrollTop;
        const itemHeight = 44;
        const index = Math.round(scrollTop / itemHeight);
        setter(String(index).padStart(2, '0'));
    };

    const hoursArray = Array.from({ length: 24 }, (_, i) => i);
    const minutesArray = Array.from({ length: 60 }, (_, i) => i);

    const itemStyle = (isSelected: boolean) => ({
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: isSelected ? '24px' : '18px',
        fontWeight: isSelected ? 600 : 400,
        color: isSelected 
            ? (mode === 'dark' ? '#FFFFFF' : '#000000')
            : (mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'),
        transition: 'all 0.2s ease',
        fontFamily: 'Nunito, system-ui, sans-serif',
    });

    const bgColor = mode === 'dark' ? '#272B3E' : '#FFFFFF';
    const borderColor = mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const selectedBg = mode === 'dark' ? 'rgba(108, 111, 249, 0.1)' : 'rgba(108, 111, 249, 0.05)';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: '20px',
                    backgroundColor: bgColor,
                    minWidth: '320px',
                    boxShadow: mode === 'dark' 
                        ? '0 20px 60px rgba(0, 0, 0, 0.5)' 
                        : '0 20px 60px rgba(0, 0, 0, 0.15)',
                }
            }}
        >
            <Box sx={{ p: 2, pt: 3 }}>
                <Box sx={{ 
                    display: 'flex', 
                    gap: 1,
                    alignItems: 'center',
                    position: 'relative',
                }}>
                    {/* Подсветка выбранного элемента */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            right: 0,
                            height: '44px',
                            transform: 'translateY(-50%)',
                            backgroundColor: selectedBg,
                            borderTop: `1px solid ${borderColor}`,
                            borderBottom: `1px solid ${borderColor}`,
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    />

                    {/* Часы */}
                    <Box
                        ref={hoursRef}
                        onScroll={() => handleScroll(hoursRef, setHours)}
                        sx={{
                            flex: 1,
                            height: '176px',
                            overflowY: 'scroll',
                            position: 'relative',
                            scrollSnapType: 'y mandatory',
                            '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none',
                            paddingTop: '66px',
                            paddingBottom: '66px',
                        }}
                    >
                        {hoursArray.map((hour) => (
                            <Box
                                key={hour}
                                onClick={() => {
                                    isInitializing.current = true;
                                    setHours(String(hour).padStart(2, '0'));
                                    if (hoursRef.current) {
                                        hoursRef.current.scrollTop = hour * 44;
                                    }
                                    setTimeout(() => {
                                        isInitializing.current = false;
                                    }, 200);
                                }}
                                sx={{
                                    ...itemStyle(hour === parseInt(hours)),
                                    scrollSnapAlign: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                {String(hour).padStart(2, '0')}
                            </Box>
                        ))}
                    </Box>

                    {/* Разделитель */}
                    <Typography 
                        sx={{ 
                            fontSize: '24px',
                            fontWeight: 600,
                            color: mode === 'dark' ? '#FFFFFF' : '#000000',
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        :
                    </Typography>

                    {/* Минуты */}
                    <Box
                        ref={minutesRef}
                        onScroll={() => handleScroll(minutesRef, setMinutes)}
                        sx={{
                            flex: 1,
                            height: '176px',
                            overflowY: 'scroll',
                            position: 'relative',
                            scrollSnapType: 'y mandatory',
                            '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none',
                            paddingTop: '66px',
                            paddingBottom: '66px',
                        }}
                    >
                        {minutesArray.map((minute) => (
                            <Box
                                key={minute}
                                onClick={() => {
                                    isInitializing.current = true;
                                    setMinutes(String(minute).padStart(2, '0'));
                                    if (minutesRef.current) {
                                        minutesRef.current.scrollTop = minute * 44;
                                    }
                                    setTimeout(() => {
                                        isInitializing.current = false;
                                    }, 200);
                                }}
                                sx={{
                                    ...itemStyle(minute === parseInt(minutes)),
                                    scrollSnapAlign: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                {String(minute).padStart(2, '0')}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            <DialogActions sx={{ 
                padding: '16px 24px',
                borderTop: `1px solid ${borderColor}`,
                justifyContent: 'center',
            }}>
                <Button
                    onClick={handleApply}
                    variant="contained"
                    sx={{
                        backgroundColor: '#6C6FF9',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 500,
                        borderRadius: '10px',
                        paddingX: '32px',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#5B5EE8',
                            boxShadow: '0 4px 12px rgba(108, 111, 249, 0.3)',
                        }
                    }}
                >
                    ОК
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IOSTimePicker;

