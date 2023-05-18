export const sortArrayOfObjectsByKeyAlphabetically = <
  T extends Record<string, string>,
>(
  array: T[],
  key: keyof T,
) => {
  array.sort(function (a, b) {
    var textA = a[key].toUpperCase();
    var textB = b[key].toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
};
