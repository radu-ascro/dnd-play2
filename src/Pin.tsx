import React from 'react';
import styled from 'styled-components';

const WIDTH = 56;
const HEIGHT = 72;
const SCALE = 0.5;
const FONT_SIZE = 22;

const getMarkerTextTransform = () =>
  `translate(${WIDTH / 2} ${HEIGHT / 2 - FONT_SIZE / 2})`;

const MarkerWrapper = styled.g<{ fill: string }>`
  translate: ${(WIDTH / 2) * SCALE}px ${(HEIGHT / 6) * SCALE}px;
  scale: ${SCALE};
  path {
    fill: ${(props) => props.fill};
  }
`;

interface PinAssetMarkerProps {
  fill: string;
  marker?: string;
  text?: string;
}

const PinWrapper = ({ marker, text, fill = 'white' }: PinAssetMarkerProps) => (
  <svg fill="none" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} overflow="visible">
    <g filter="url(#a)">
      <mask id="b" fill="#fff">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.252 47.782C42.969 46.194 52 36.151 52 24 52 10.745 41.255 0
          28 0S4 10.745 4 24c0 12.152 9.031 22.194 20.748 23.782L28 64l3.252-16.218Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.252 47.782C42.969 46.194 52 36.151 52 24 52 10.745 41.255
        0 28 0S4 10.745 4 24c0 12.152 9.031 22.194 20.748 23.782L28 64l3.252-16.218Z"
        fill="#111A39"
      />
      <path
        d="m31.252 47.782-.134-.991-.706.095-.14.699.98.197Zm-6.504
        0 .98-.197-.14-.699-.706-.095-.134.99ZM28 64l-.98.197h1.96L28
        64Zm23-40c0 11.645-8.655 21.27-19.882 22.79l.268 1.983C43.592 47.118
        53 36.659 53 24h-2ZM28 1c12.703 0 23 10.297 23 23h2C53 10.193 41.807-1
        28-1v2ZM5 24C5 11.297 15.297 1 28 1v-2C14.193-1 3 10.193 3 24h2Zm19.883
        22.79C13.655 45.27 5 35.646 5 24H3c0 12.66 9.408 23.12 21.614
        24.773l.268-1.982Zm4.098 17.013-3.252-16.218-1.961.393 3.252 16.219
        1.96-.394Zm1.29-16.218L27.02 63.803l1.96.394 3.253-16.219-1.961-.393Z"
        fill="#fff"
        mask="url(#b)"
      />
    </g>
    <defs>
      <filter
        id="a"
        x={0}
        y={0}
        width="100%"
        height="100%"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_423_62133"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_423_62133"
          result="shape"
        />
      </filter>
    </defs>
    {text && (
      <text
        transform={getMarkerTextTransform()}
        style={{ fontSize: `${FONT_SIZE}px` }}
        fill={fill}
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {text}
      </text>
    )}
    {marker && (
      <MarkerWrapper
        aria-label="asset-marker"
        fill={fill}
        dangerouslySetInnerHTML={{ __html: marker }}
      />
    )}
  </svg>
);

export default PinWrapper;
