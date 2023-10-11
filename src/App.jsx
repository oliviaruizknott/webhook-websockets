import { useEffect, useCallback } from "react";
import URLUtil from "./haxademic/url-util";
import AppStoreDistributed from "./haxademic/app-store-distributed";
import { useGetValue, setValue } from "./hooks/useHaxademicStore";
import AppStoreDebug from "../components/debug/AppStoreDebug";

const RED = "e84855";
const YELLOW = "f9dc5c";
const BLUE = "3185fc";

const App = () => {
  const hexColor = useGetValue("COLOR", "ffffff");
  const hasConnected = useGetValue(AppStoreDistributed.CONNECTED, false)

  const setColorFromHash = useCallback(() => {
    const urlColor = URLUtil.getHashQueryParam("COLOR");
    if (urlColor) setValue("COLOR", decodeURIComponent(urlColor));
    URLUtil.removeHash();
  }, []);

  // listen for changes to the url hash and set the color
  useEffect(() => {
    URLUtil.setHashChangeListener(setColorFromHash);
  }, [setColorFromHash]);

  // once connected to the websocket server, read the hash and set the color
  // example hash string: #COLOR=58641d
  useEffect(() => {
    if (hasConnected) setColorFromHash();
  }, [hasConnected, setColorFromHash]);

  return (
    <div className="App" style={{ backgroundColor: `#${hexColor}` }}>
      <AppStoreDebug />
      <h3>Color Tapping</h3>
      <button onClick={() => setValue("COLOR", RED)}>
        Red
      </button>
      <button onClick={() => setValue("COLOR", YELLOW)}>
        Yellow
      </button>
      <button onClick={() => setValue("COLOR", BLUE)}>
        Blue
      </button>
    </div>
  );
};

export default App;