import {useState} from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    InputAdornment,
    LinearProgress,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import type {Locale} from 'date-fns';
import {de, enUS, es, fr, ru} from 'date-fns/locale';
import {useTranslation} from 'react-i18next';
import {useThemeMode} from '../../Budgets/theme/ThemeContext';
import {GlassCard} from '../../components/ui/GlassCard';
import {useGoalsStore} from '../../Budgets/store/useGoalsStore';
import {useSettingsStore} from '../../Budgets/store/useSettingsStore';
import {GoalDetail} from '../../components/features/goals/GoalDetail';
import {Goal} from '../../Budgets/types';
import AddIcon from '@mui/icons-material/Add';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ComputerIcon from '@mui/icons-material/Computer';
import DiamondIcon from '@mui/icons-material/Diamond';
import SavingsIcon from '@mui/icons-material/Savings';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PaletteIcon from '@mui/icons-material/Palette';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const GOAL_ICONS = [
    {id: 'travel', icon: FlightTakeoffIcon, color: '#6C6FF9'},
    {id: 'home', icon: HomeIcon, color: '#6C6FF9'},
    {id: 'car', icon: DirectionsCarIcon, color: '#6C6FF9'},
    {id: 'education', icon: SchoolIcon, color: '#6C6FF9'},
    {id: 'wedding', icon: FavoriteIcon, color: '#6C6FF9'},
    {id: 'laptop', icon: ComputerIcon, color: '#6C6FF9'},
    {id: 'jewelry', icon: DiamondIcon, color: '#6C6FF9'},
    {id: 'savings', icon: SavingsIcon, color: '#6C6FF9'},
    {id: 'vacation', icon: BeachAccessIcon, color: '#6C6FF9'},
    {id: 'phone', icon: SmartphoneIcon, color: '#6C6FF9'},
    {id: 'camera', icon: CameraAltIcon, color: '#6C6FF9'},
    {id: 'fitness', icon: FitnessCenterIcon, color: '#6C6FF9'},
    {id: 'gift', icon: CardGiftcardIcon, color: '#6C6FF9'},
    {id: 'music', icon: MusicNoteIcon, color: '#6C6FF9'},
    {id: 'art', icon: PaletteIcon, color: '#6C6FF9'},
    {id: 'book', icon: MenuBookIcon, color: '#6C6FF9'},
];

const Goals: React.FC = () => {
    const {t, i18n} = useTranslation();
    const {mode} = useThemeMode();
    const {currency} = useSettingsStore();
    const goals = useGoalsStore((state) => state.goals);
    const addGoal = useGoalsStore((state) => state.addGoal);
    const updateGoal = useGoalsStore((state) => state.updateGoal);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('savings');
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [currentAmount, setCurrentAmount] = useState('');
    const [targetDate, setTargetDate] = useState<Date | null>(null);
    const [editingGoal, setEditingGoal] = useState<string | null>(null);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const formatNumberWithSpaces = (value: string): string => {
        const numericValue = value.replace(/[^\d.]/g, '');
        const parts = numericValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
    };

    const parseFormattedNumber = (value: string): number => {
        return parseFloat(value.replace(/\s/g, '')) || 0;
    };

    const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTargetAmount(formatNumberWithSpaces(e.target.value));
    };

    const handleCurrentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAmount(formatNumberWithSpaces(e.target.value));
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        setEditingGoal(null);
        setGoalName('');
        setTargetAmount('');
        setCurrentAmount('');
        setTargetDate(null);
        setSelectedIcon('savings');
    };

    const handleEditGoal = (goalId: string) => {
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        setEditingGoal(goalId);
        setGoalName(goal.name);
        setTargetAmount(formatNumberWithSpaces(goal.targetAmount.toString()));
        setCurrentAmount(formatNumberWithSpaces(goal.currentAmount.toString()));
        setTargetDate(goal.targetDate ? new Date(goal.targetDate) : null);
        setSelectedIcon(goal.icon || 'savings');
        setOpenDialog(true);
    };

    const handleSaveGoal = () => {
        if (!goalName || !targetAmount) return;

        const goalData = {
            name: goalName,
            targetAmount: parseFormattedNumber(targetAmount),
            currentAmount: parseFormattedNumber(currentAmount),
            targetDate: targetDate || undefined,
            icon: selectedIcon,
        };

        if (editingGoal) updateGoal(editingGoal, goalData);
        else addGoal(goalData);

        setOpenDialog(false);
    };

    const sortedGoals = [...goals].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const getLocale = (): Locale => {
        const locales: Record<string, Locale> = {ru, en: enUS, fr, de, es, me: ru};
        return locales[i18n.language] || enUS;
    };

    return (
        <Container maxWidth="xl" sx={{py: {xs: 2, sm: 3}, px: {xs: 1, sm: 2, md: 3}}}>
            <Box sx={{mb: 4}}>
                <Typography variant="h4" fontWeight="700" gutterBottom
                            sx={{color: mode === 'dark' ? '#fff' : '#272B3E', mb: 1}}>
                    {t('savings', 'Savings')}
                </Typography>
                <Typography variant="body1"
                            sx={{color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(6, 0, 171, 0.6)'}}>
                    {t('savingsGoal.goalDescription', 'Create savings goals for your important financial targets')}
                </Typography>
            </Box>

            <Box sx={{mb: 3}}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={handleOpenDialog}
                    sx={{
                        background: 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)',
                        color: '#fff',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        boxShadow: mode === 'dark'
                            ? '0 8px 24px rgba(108,111,249,0.4)'
                            : '0 8px 24px rgba(168,163,246,0.4)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 32px rgba(108,111,249,0.5)',
                        }
                    }}
                >
                    {t('savingsGoal.createButton', 'Create Savings Goal')}
                </Button>
            </Box>

            {sortedGoals.length === 0 ? (
                <GlassCard sx={{p: 8, textAlign: 'center'}}>
                    <Typography variant="h6" sx={{mb: 1, color: mode === 'dark' ? '#fff' : '#272B3E'}}>
                        {t('savingsGoal.noGoals', 'You have no savings goals yet')}
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: mode === 'dark'
                            ? 'rgba(255,255,255,0.5)'
                            : 'rgba(39,43,62,0.5)'
                    }}>
                        {t('savingsGoal.createFirstGoal', 'Create your first savings goal to get started')}
                    </Typography>
                </GlassCard>
            ) : (
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    },
                    gap: 3
                }}>
                    {sortedGoals.map((goal) => {
                        const percentage = (goal.currentAmount / goal.targetAmount) * 100;
                        const iconData = GOAL_ICONS.find(i => i.id === goal.icon) || GOAL_ICONS[7];
                        const IconComponent = iconData.icon;

                        return (
                            <GlassCard
                                key={goal.id}
                                glowColor={`${iconData.color}40`}
                                onClick={() => {
                                    setSelectedGoal(goal);
                                    setDetailOpen(true);
                                }}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 8px 24px ${iconData.color}40`,
                                    },
                                    opacity: goal.isCompleted ? 0.7 : 1,
                                }}
                            >
                                <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                                    <Box sx={{display: 'flex', justifyContent: 'center', mb: 2}}>
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 2.5,
                                                background: `linear-gradient(135deg, ${iconData.color}20 0%, ${iconData.color}40 100%)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <IconComponent sx={{fontSize: 32, color: iconData.color}}/>
                                        </Box>
                                    </Box>

                                    <Typography variant="h5" fontWeight="700" align="center"
                                                sx={{
                                                    color: mode === 'dark' ? '#fff' : '#272B3E',
                                                    mb: 2,
                                                    minHeight: 48,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: {xs: '1.3rem', sm: '1.5rem'},
                                                }}>
                                        {goal.name}
                                    </Typography>

                                    <Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={Math.min(percentage, 100)}
                                            sx={{
                                                height: 10,
                                                borderRadius: 2,
                                                mb: 1,
                                                backgroundColor: mode === 'dark'
                                                    ? 'rgba(255,255,255,0.1)'
                                                    : '#EFF0F6',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 2,
                                                    backgroundColor: iconData.color,
                                                }
                                            }}
                                        />
                                        <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 1}}>
                                            <Typography variant="body2" fontWeight="600"
                                                        sx={{
                                                            color: mode === 'dark' ? '#fff' : '#272B3E',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                {goal.currentAmount.toLocaleString()} {currency}
                                            </Typography>
                                            <Typography variant="body2" fontWeight="500"
                                                        sx={{
                                                            color: mode === 'dark'
                                                                ? 'rgba(255,255,255,0.5)'
                                                                : 'rgba(39,43,62,0.5)',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                {goal.targetAmount.toLocaleString()} {currency}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </GlassCard>
                        );
                    })}
                </Box>
            )}

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        background: mode === 'dark'
                            ? 'rgba(15,15,35,0.95)'
                            : 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)',
                        m: {xs: 2, sm: 3},
                    }
                }}
            >
                <DialogTitle sx={{
                    color: mode === 'dark' ? '#fff' : '#272B3E',
                    fontWeight: 700,
                    fontSize: {xs: '1.25rem', sm: '1.5rem'},
                    pb: 1,
                }}>
                    {editingGoal ? t('savingsGoal.editTitle', 'Edit Goal') : t('savingsGoal.createTitle', 'Create Goal')}
                </DialogTitle>

                <DialogContent sx={{pb: 3, overflow: 'hidden'}}>
                    <Stack spacing={2.5} sx={{mt: 0.5}}>
                        <Box>
                            <Typography variant="body2"
                                        sx={{
                                            color: mode === 'dark'
                                                ? 'rgba(255,255,255,0.7)'
                                                : 'rgba(39,43,62,0.7)',
                                            mb: 1.5,
                                            fontWeight: 500
                                        }}>
                                {t('savingsGoal.selectIcon', 'Select icon')}
                            </Typography>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(4, 1fr)',
                                    sm: 'repeat(6, 1fr)'
                                },
                                gap: 1.5
                            }}>
                                {GOAL_ICONS.map((iconData) => {
                                    const isSelected = selectedIcon === iconData.id;
                                    const IconComponent = iconData.icon;
                                    return (
                                        <Box
                                            key={iconData.id}
                                            onClick={() => setSelectedIcon(iconData.id)}
                                            sx={{
                                                aspectRatio: '1',
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                backgroundColor: isSelected
                                                    ? `${iconData.color}30`
                                                    : mode === 'dark'
                                                        ? 'rgba(255,255,255,0.05)'
                                                        : 'rgba(39,43,62,0.05)',
                                                border: `2px solid ${isSelected ? iconData.color : 'transparent'}`,
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    backgroundColor: isSelected
                                                        ? `${iconData.color}30`
                                                        : mode === 'dark'
                                                            ? 'rgba(255,255,255,0.1)'
                                                            : 'rgba(39,43,62,0.1)',
                                                }
                                            }}
                                        >
                                            <IconComponent sx={{
                                                fontSize: 20,
                                                color: isSelected
                                                    ? iconData.color
                                                    : (mode === 'dark' ? '#fff' : '#272B3E'),
                                                opacity: isSelected ? 1 : 0.7
                                            }}/>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>

                        <TextField
                            label={t('savingsGoal.goalName', 'Goal name')}
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                            fullWidth
                            required
                        />

                        <TextField
                            label={t('savingsGoal.targetAmount', 'Target amount')}
                            value={targetAmount}
                            onChange={handleTargetAmountChange}
                            fullWidth
                            required
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            sx={{minWidth: 'auto', ml: 1}}
                                        >
                                            {currency}
                                        </InputAdornment>
                                    )
                                }
                            }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    pr: {xs: 5, sm: 4}
                                }
                            }}
                        />

                        <TextField
                            label={`${t('savingsGoal.currentAmount', 'Current amount')} (${t('optional', 'optional')})`}
                            value={currentAmount}
                            onChange={handleCurrentAmountChange}
                            fullWidth
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            sx={{minWidth: 'auto', ml: 1}}
                                        >
                                            {currency}
                                        </InputAdornment>
                                    )
                                }
                            }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    pr: {xs: 5, sm: 4}
                                }
                            }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={getLocale()}>
                            <DatePicker
                                label={t('savingsGoal.targetDate', 'Target date (optional)')}
                                value={targetDate}
                                onChange={(newValue) => setTargetDate(newValue as Date | null)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        sx: {
                                            '& .MuiInputBase-input': {
                                                pr: {xs: 5, sm: 4}
                                            }
                                        }
                                    }
                                }}
                            />
                        </LocalizationProvider>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: {xs: 'center', sm: 'flex-end'},
                            pt: 2
                        }}>
                            <Button
                                variant="contained"
                                onClick={handleSaveGoal}
                                sx={{
                                    background: 'linear-gradient(135deg, #6C6FF9 0%, #6C6FF9 100%)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    px: {xs: 6, sm: 4},
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    minWidth: {xs: '200px', sm: 'auto'},
                                    boxShadow: mode === 'dark'
                                        ? '0 8px 24px rgba(108,111,249,0.4)'
                                        : '0 8px 24px rgba(168,163,246,0.4)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 32px rgba(108,111,249,0.5)',
                                    }
                                }}
                            >
                                {editingGoal ? t('save', 'Save') : t('create', 'Create')}
                            </Button>
                        </Box>
                    </Stack>
                </DialogContent>
            </Dialog>

            {selectedGoal && (
                <GoalDetail
                    open={detailOpen}
                    onClose={() => setDetailOpen(false)}
                    goal={selectedGoal}
                    onEdit={() => handleEditGoal(selectedGoal.id)}
                />
            )}
        </Container>
    );
};

export default Goals;