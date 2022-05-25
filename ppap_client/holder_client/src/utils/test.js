import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import { verifyCredential } from "did-jwt-vc";

export const getVC = async (payload) => {
  const providerConfig = {
    name: "ganache",
    rpcUrl: "http://localhost:7545",
    registry: "0x4C9B4DaCb456861dD165b1b4F02D3e1aDb5650F8",
  };
  const ethrDidResolver = await getResolver(providerConfig);
  const didResolver = await new Resolver(ethrDidResolver);

  return verifyCredential(payload);
};
