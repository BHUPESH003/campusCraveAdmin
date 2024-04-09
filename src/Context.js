import { atom } from "jotai";
import { loadable } from "jotai/utils";

import { dataService } from "./services/apiServices/dataService";

export const rowDataAtom = atom([]);

const getAllProducts = atom(async () => {
  return dataService.getAllProducts().then((x) => x);
});

// export const getAllOrder = atom(async (vendorId) => {
//   return dataService.getAllOrder(vendorId).then((x) => x);
// });


// export const getAllOrderLoadableAtom = loadable(getAllOrder);
export const getAllProductsLoadableAtom = loadable(getAllProducts);
