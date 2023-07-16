import { rowsPerPageOptions } from "@/config/datatable";

export const calculateRowsPerPageOptions = (total) => {
  let option = rowsPerPageOptions;
  if (!total) {
    return option;
  }
  let maxOption = 0;

  for (let i = 0; i < option.length; i++) {
    if (total <= option[i]) {
      maxOption = i;
      break;
    }
    else maxOption = i
  }

  option = option.slice(0, maxOption < 2 ? 3 : maxOption + 1)
  return option;
}