export const getOptionsInArray = (options) => {
  let optionsArray = [];
  for (const key in options) {
    optionsArray.push({ value: key, label: options[key] });
  }
  return optionsArray;
};

export const removeEmptyForm = (form) => {
  let filteredForm = {};
  for (const key in form) {
    if (
      form[key] != '' &&
      form[key] != null &&
      form[key] != 'all' &&
      form[key].length
    ) {
      filteredForm[key] = form[key];
    }
  }
  return filteredForm;
};

export const urlWithParams = (url, query) => {
  if (!query) return url;
  for (const key in query) {
    if (!query[key]) {
      delete query[key];
    }
  }
  const params = new URLSearchParams(removeEmptyForm(query));
  return `${url}${params.toString() ? '?' + params.toString() : ''}`;
};
