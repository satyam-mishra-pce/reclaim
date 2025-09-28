"use client";
// import { Button } from "@/components/ui/button";

import { SelfAppBuilder, SelfQRcodeWrapper } from "@selfxyz/qrcode";
import { useState } from "react";

const SelfQRCode = ({
  address,
  onSuccess,
  onError,
  userDefinedData = "I am backing up my wallet",
}: {
  address: `0x${string}`;
  onSuccess: () => void;
  onError: () => void;
  userDefinedData?: string;
}) => {
  const selfApp = new SelfAppBuilder({
    appName: "Reclaim",
    scope: "reclaim",
    endpoint: "https://reclaim-self-xyz-creds.vercel.app/api/verify/reclaim",
    endpointType: "https",
    userId: address,
    userIdType: "hex",
    disclosures: {},
    version: 2,
    userDefinedData,
  }).build();

  return (
    <SelfQRcodeWrapper
      selfApp={selfApp}
      onError={(error) => {
        console.error("Error verifying self-xyz", error);
        onError();
      }}
      onSuccess={() => {
        console.log("Successfully verified self-xyz");
        onSuccess();
      }}
      size={300}
    />
  );
};

const SelfXYZVerificationStep1 = ({
  onSuccess,
  userDefinedData = "I am backing up my wallet",
}: {
  onSuccess?: () => void;
  userDefinedData?: string;
} = {}) => {
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    onSuccess?.();
  };

  return (
    <div className="font-sans">
      <SelfQRCode
        address={"0x0000000000000000000000000000000000000000"}
        onSuccess={handleSuccess}
        onError={() => {
          console.error("Self.xyz verification failed");
        }}
        userDefinedData={userDefinedData}
      />
    </div>
  );
};

export default SelfXYZVerificationStep1;
