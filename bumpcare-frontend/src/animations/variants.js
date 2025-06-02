export const fadeVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

export const slideUpVariant = {
  initial: { y: 30, opacity: 0 },  
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

export const scaleInVariant = {
  initial: { scale: 0.9 },  
  animate: {
    scale: 1,
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  exit: {
    scale: 0.9,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

export const fadeInDelayed = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut', delay: 0.15 }  
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};
