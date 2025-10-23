import React, { useState, useRef, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';
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

    useEffect(() => {
        if (value) {
            const [h, m] = value.split(':');
            setHours(h.padStart(2, '0'));
            setMinutes(m.padStart(2, '0'));
        }
    }, [value]);

    useEffect(() => {
        if (open && hoursRef.current && minutesRef.current) {
            // Скролл к выбранному значению
            const hourIndex = parseInt(hours);
            const minuteIndex = parseInt(minutes);
            
            setTimeout(() => {
                if (hoursRef.current) {
                    hoursRef.current.scrollTop = hourIndex * 44;
                }
                if (minutesRef.current) {
                    minutesRef.current.scrollTop = minuteIndex * 44;
                }
            }, 100);
        }
    }, [open, hours, minutes]);

    const handleApply = () => {
        onChange(`${hours}:${minutes}`);
        onClose();
    };

    const handleScroll = (ref: React.RefObject<HTMLDivElement>, setter: (val: string) => void) => {
        if (!ref.current) return;
        
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
                <Typography 
                    variant="subtitle2" 
                    sx={{ 
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                        fontSize: '11px',
                        fontWeight: 600,
                        mb: 2,
                    }}
                >
                    iOS Timepicker
                </Typography>

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
                                    setHours(String(hour).padStart(2, '0'));
                                    if (hoursRef.current) {
                                        hoursRef.current.scrollTop = hour * 44;
                                    }
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
                                    setMinutes(String(minute).padStart(2, '0'));
                                    if (minutesRef.current) {
                                        minutesRef.current.scrollTop = minute * 44;
                                    }
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
                gap: 2,
            }}>
                <IconButton
                    sx={{
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <KeyboardIcon />
                </IconButton>

                <Box sx={{ flex: 1 }} />

                <Button
                    onClick={onClose}
                    sx={{
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                        }
                    }}
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleApply}
                    variant="contained"
                    sx={{
                        backgroundColor: '#6C6FF9',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 500,
                        borderRadius: '10px',
                        paddingX: '24px',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#5B5EE8',
                            boxShadow: '0 4px 12px rgba(108, 111, 249, 0.3)',
                        }
                    }}
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IOSTimePicker;

