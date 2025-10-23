import React, { KeyboardEvent, useState } from 'react';
import {Autocomplete, Box, Chip, TextField} from '@mui/material';
import {LocalOffer} from '@mui/icons-material';
import {useTranslation} from 'react-i18next';

interface TagsInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    availableTags?: string[];
    label?: string;
}

export const TagsInput: React.FC<TagsInputProps> = ({
                                                        tags,
                                                        onChange,
                                                        availableTags = [],
                                                        label
                                                    }) => {
    const {t} = useTranslation();
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && inputValue.trim()) {
            event.preventDefault();
            const newTag = inputValue.trim().toLowerCase();
            if (!tags.includes(newTag)) {
                onChange([...tags, newTag]);
            }
            setInputValue('');
        }
    };

    const handleDelete = (tagToDelete: string) => {
        onChange(tags.filter(tag => tag !== tagToDelete));
    };

    return (
        <Box>
            <Autocomplete
                multiple
                freeSolo
                options={availableTags.filter(tag => !tags.includes(tag))}
                value={tags}
                onChange={(_, newValue) => {
                    onChange(newValue.map(v => typeof v === 'string' ? v.toLowerCase() : v));
                }}
                inputValue={inputValue}
                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            {...getTagProps({index})}
                            label={option}
                            size="small"
                            icon={<LocalOffer fontSize="small"/>}
                            onDelete={() => handleDelete(option)}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label || t('tags')}
                        placeholder={t('addTag')}
                        onKeyDown={handleKeyDown}
                        helperText={t('tagsHint')}
                    />
                )}
            />
        </Box>
    );
};