import { Alert, Button } from "antd";
import React from "react";

import { NETWORK } from "../constants";

function NetworkDisplay({
  NETWORKCHECK,
  localChainId,
  selectedChainId,
  targetNetwork,
  USE_NETWORK_SELECTOR,
  logoutOfWeb3Modal,
}) {
  let networkDisplay = "";
  if (NETWORKCHECK && localChainId && selectedChainId && localChainId !== selectedChainId) {
    const networkSelected = NETWORK(selectedChainId);
    const networkLocal = NETWORK(localChainId);
    if (selectedChainId === 1337 && localChainId === 31337) {

    } else {

    }
  } else {
    networkDisplay = USE_NETWORK_SELECTOR ? null : (
      // 显示网络名称
      <div style={{ zIndex: -1, position: "absolute", right: 154, top: 28, padding: 16, color: targetNetwork.color }}>
        {targetNetwork.name}
      </div>
    );
  }

  console.log({ networkDisplay });

  return networkDisplay;
}

export default NetworkDisplay;
