'use client';

import Link from 'next/link';
import { track } from './Track';

/**
 * Bouton CTA unifié.
 * Variants : "primary" (noir/jaune), "ghost-light" (transparent / blanc),
 * "yellow-on-black" (jaune sur fond noir), "black-on-yellow" (noir sur fond jaune).
 */
export default function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  event,
  eventProps,
  external,
  className = '',
  ...rest
}) {
  const onClick = (e) => {
    if (event) track(event, eventProps);
    rest.onClick?.(e);
  };

  const palette = {
    primary: { bg: '#000', color: '#FED700', border: '#000' },
    'yellow-on-black': { bg: '#FED700', color: '#000', border: '#FED700' },
    'black-on-yellow': { bg: '#000', color: '#FED700', border: '#000' },
    outline: { bg: 'transparent', color: '#000', border: '#000' },
    'outline-light': { bg: 'transparent', color: '#FFF', border: '#FFF' },
  }[variant] || { bg: '#000', color: '#FED700', border: '#000' };

  const padding =
    size === 'lg' ? '18px 36px' : size === 'sm' ? '10px 20px' : '14px 28px';
  const fontSize = size === 'lg' ? '0.95rem' : size === 'sm' ? '0.7rem' : '0.78rem';

  const sharedStyle = {
    background: palette.bg,
    color: palette.color,
    border: `2px solid ${palette.border}`,
    padding,
    fontSize,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    fontWeight: 900,
    fontFamily: 'var(--font-montserrat, "Montserrat", sans-serif)',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
    transition: 'transform .2s ease, background .2s ease, color .2s ease',
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        style={sharedStyle}
        className={`hover:!opacity-95 hover:scale-[1.02] active:scale-100 ${className}`}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href || '#'}
      onClick={onClick}
      style={sharedStyle}
      className={`hover:!opacity-95 hover:scale-[1.02] active:scale-100 ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
