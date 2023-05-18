export const setTeaserText = (days: number): string => {
  switch (true) {
    case days < 0:
      return 'ITS BEEN';
    case days === 0:
      return 'TODAY IS THE DAY';
    case days === 1:
      return 'TOMORROW WE PARTY';
    case days === 2:
      return 'JUST';
    case days < 7:
      return 'ONLY';
    default:
      return 'YOU HAVE';
  }
};
