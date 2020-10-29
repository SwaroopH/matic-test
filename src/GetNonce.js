import { useMemo, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

const daiAbi = [
  "function getNonce(address user) public view returns (uint256)",
];

export default () => {
  let [result, updateResult] = useState(null);
  const { library, account } = useWeb3React();

  useMemo(async () => {
    console.log("Fetching ");
    try {
      const daiContract = new ethers.Contract(
        "0x44BCF77AC60294db906f50c36e63af5d4C120A66",
        daiAbi,
        library.getSigner(account)
      );
      const result = await daiContract.getNonce(account);
      updateResult(() => ({
        result: result.toString(),
      }));
    } catch (error) {
      updateResult(() => ({
        error: error.toString(),
      }));
    }
  }, []);

  return !!result ? (
    !!result.error ? (
      <div>There was an error: {result.error}</div>
    ) : (
      <div>This is the nonce: {result.result}</div>
    )
  ) : (
    <div>getting the nonce</div>
  );
};
