import React from 'react'

export function RainbowLogo({ device = 'desktop' }) {
  const style = {}
  if (device === 'desktop') style.height = 40.7
  else style.width = 118
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0'
      y='0'
      version='1.1'
      viewBox='0 0 319.78 133.38'
      xmlSpace='preserve'
      style={style}
    >
      <linearGradient
        id='SVGID_1_'
        x1='49.745'
        x2='49.745'
        y1='109.333'
        y2='0'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#00A8DE'></stop>
        <stop offset='0.4' stopColor='#333391'></stop>
        <stop offset='1' stopColor='#E91388'></stop>
      </linearGradient>
      <path
        fill='none'
        stroke='url(#SVGID_1_)'
        strokeMiterlimit='10'
        strokeWidth='20'
        d='M10.409999999999997 0v60m0 0c0 21.72 17.61 39.33 39.33 39.33S89.08 81.72 89.08 60m0-60v60'
      ></path>
      <linearGradient
        id='SVGID_2_'
        x1='159.903'
        x2='159.903'
        y1='133.382'
        y2='49.743'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#00A8DE'></stop>
        <stop offset='0.4' stopColor='#333391'></stop>
        <stop offset='1' stopColor='#E91388'></stop>
      </linearGradient>
      <path
        fill='url(#SVGID_2_)'
        d='M160.21 133.38L113.95 49.84 136.76 49.74 160.09 91.88 183.07 49.79 205.85 49.79z'
      ></path>
      <linearGradient
        id='SVGID_3_'
        x1='270.033'
        x2='270.033'
        y1='109.333'
        y2='0'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0' stopColor='#00A8DE'></stop>
        <stop offset='0.4' stopColor='#333391'></stop>
        <stop offset='1' stopColor='#E91388'></stop>
      </linearGradient>
      <path
        fill='none'
        stroke='url(#SVGID_3_)'
        strokeMiterlimit='10'
        strokeWidth='20'
        d='M230.70000000000002 0v60m0 0c0 21.72 17.61 39.33 39.33 39.33S309.37 81.72 309.37 60m0-60v60'
      ></path>
    </svg>
  )
}

export function PurpleLogo({ device = 'desktop' }) {
  const style = {}
  if (device === 'desktop') style.height = 40.7
  else style.width = 118
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0'
      y='0'
      version='1.1'
      viewBox='0 0 319.78 133.38'
      xmlSpace='preserve'
      style={style}
    >
      <path
        fill='none'
        stroke='#662D91'
        strokeMiterlimit='10'
        strokeWidth='20'
        d='M10.409999999999997 0v60m0 0c0 21.72 17.61 39.33 39.33 39.33S89.08 81.72 89.08 60m0-60v60'
      ></path>
      <path
        fill='#662D91'
        stroke='#662D91'
        strokeMiterlimit='10'
        d='M160.21 133.38L113.95 49.84 136.76 49.74 160.09 91.88 183.07 49.79 205.85 49.79z'
      ></path>
      <path
        fill='none'
        stroke='#662D91'
        strokeMiterlimit='10'
        strokeWidth='20'
        d='M230.70000000000002 0v60m0 0c0 21.72 17.61 39.33 39.33 39.33S309.37 81.72 309.37 60m0-60v60'
      ></path>
    </svg>
  )
}
