import * as React from 'react';
import { cn } from '@/utils/cn';

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: React.ReactNode;
};

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, fallback, src, alt, ...props }, ref) => {
    const [isError, setIsError] = React.useState(false);

    return (
      <>
        {!isError && src ? (
          <img
            ref={ref}
            src={src}
            alt={alt}
            onError={() => setIsError(true)}
            className={cn('aspect-square h-full w-full', className)}
            {...props}
          />
        ) : (
          fallback
        )}
      </>
    );
  }
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
