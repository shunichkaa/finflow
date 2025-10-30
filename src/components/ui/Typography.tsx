import React from 'react';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
  color?: keyof typeof colors['text'] | 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  weight?: keyof typeof typography['fontWeight'];
  size?: keyof typeof typography['fontSize'];
};

export const Text: React.FC<TextProps> = ({
  as = 'p',
  color = 'primary',
  weight = 'normal',
  size = 'base',
  style,
  children,
  ...rest
}) => {
  const Tag = as as any;
  const mapColor = () => {
    if (color in colors.text) {
      return colors.text[color as keyof typeof colors.text];
    }
    if (color in colors) {
      return (colors as any)[color];
    }
    return colors.text.primary;
  };

  return (
    <Tag
      style={{
        color: mapColor(),
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.fontWeight[weight],
        fontSize: typography.fontSize[size],
        lineHeight: typography.lineHeight.normal,
        margin: 0,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};


