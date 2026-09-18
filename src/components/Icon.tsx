interface IconProps {
  name: 'search' | 'bag' | 'arrow' | 'minus' | 'plus' | 'trash' | 'menu' | 'back' | 'user'
  size?: number
}

const paths = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
  bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  minus: <path d="M5 12h14" />,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  trash: <><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="m6 7 1 14h10l1-14M9 7V4h6v3" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  back: <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" /></>,
}

export function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
