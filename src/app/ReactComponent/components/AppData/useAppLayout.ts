import { selectAppDataByPath, useHMSStore } from "@100mslive/react-sdk";
import { APP_DATA } from "../../common/constants";

export const useAppLayout = (path: any) => {
  return useHMSStore(selectAppDataByPath(APP_DATA.appLayout, path));
};
