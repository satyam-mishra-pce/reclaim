import { NextResponse } from "next/server";
import { selfBackendVerifier } from "./self";
import { verifyMessage } from "ethers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body, null, 2));

    const { attestationId, proof, publicSignals, userContextData } = body;

    if (!attestationId || !proof || !publicSignals) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await selfBackendVerifier.verify(
      attestationId,
      proof,
      publicSignals,
      userContextData
    );
    console.log("Obtained result:", result);

    const user = result.userData;
    const rawUserDefinedData = user.userDefinedData;

    try {
      const userDefinedData = JSON.parse(rawUserDefinedData);
      console.log("User defined data:", userDefinedData);
    } catch (error) {
      return NextResponse.json(
        {
          status: "error",
          result: false,
          message: "Invalid user defined data",
          details: error,
        },
        { status: 500 }
      );
    }

    if (result.isValidDetails.isValid) {
      return NextResponse.json({
        status: "success",
        result: true,
        credentialSubject: result.discloseOutput,
      });
    } else {
      return NextResponse.json(
        {
          status: "error",
          result: false,
          message: "Verification failed",
          details: result.isValidDetails,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error verifying proof:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      {
        status: "error",
        result: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
