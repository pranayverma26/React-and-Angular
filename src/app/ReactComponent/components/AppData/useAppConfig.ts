import { selectAppDataByPath, useHMSStore } from "@100mslive/react-sdk";
import { APP_DATA } from "../../common/constants";

export const useAppConfig = (...path: any) => {
  const appConfig = useHMSStore(
    selectAppDataByPath(APP_DATA.appConfig, ...path)
  );
  return appConfig;
};
