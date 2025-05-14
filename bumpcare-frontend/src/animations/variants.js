export const fadeVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

export const slideUpVariant = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8 },
};

export const scaleInVariant = {
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  transition: { duration: 0.8 },
};

export const fadeInDelayed = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay: 0.3 },
};