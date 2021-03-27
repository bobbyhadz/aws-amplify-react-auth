/**
 * Image component that prevents Cumulative Layout Shift (CLS) 🎉
 *
 * NOTE: these are tailwindcss classes, but the app doesn't have tailwindcss so I've also added style props
 *
 * Aspect ratio of 16/9 is commonly used for youtube videos.
 * Aspect ratio of 16/8 - means that the WIDTH of the image is twice as much as the HEIGHT of the image
 * PaddingBottom = (1 / (imageWidth / imageHeight)) * 100
 * Example - imageWidth = 1390px, imageHeight = 728px
 * PaddingBottom = (1 / (1390 / 728)) * 100 = 52.37%
 *
 * Instead of passing in aspectRatio as a prop, I can just pass imageWidth/imageHeight
 * i.e. aspectRatio={1390 / 728}
 */

import {ImgHTMLAttributes} from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  aspectRatio?: number;
  className?: string;
};

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  aspectRatio = 16 / 9,
  className = '',
  ...rest
}) => (
  <div
    className="relative"
    style={{
      paddingBottom: `${(1 / aspectRatio) * 100}%`,
    }}
  >
    <div className="absolute inset-0">
      <img
        src={src}
        alt={alt}
        className={`${className} w-full h-full object-cover`}
        {...rest}
      />
    </div>
  </div>
);
