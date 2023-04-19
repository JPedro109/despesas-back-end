export const camelToSnakeCaseMapper = (data: object): object => {
  let dataFormated = {};

  for (const key in data) {
    dataFormated = {
      ...dataFormated,
      [key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)]:
        data[key],
    };
  }

  return dataFormated;
};
