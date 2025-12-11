"use server";

/**
 * Delete an image from IPFS using Pinata
 * Uses Pinata API to unpin a file by CID
 * @param url - The Pinata gateway URL of the image to delete
 * @returns true if deletion was successful, false otherwise
 */
export const deleteImagePinata = async (url: string): Promise<boolean> => {
  try {
    if (!url) {
      console.error("URL is required for deletion");
      return false;
    }

    if (!process.env.PINATA_JWT) {
      console.error("PINATA_JWT is not configured");
      return false;
    }

    // Extract CID from Pinata gateway URL
    // URL formats:
    // - https://gateway.pinata.cloud/ipfs/{CID}
    // - https://{gateway}.mypinata.cloud/ipfs/{CID}
    // - ipfs://{CID}
    // CID can be base58 (Qm...) or base32 (bafy...)
    let cid: string | null = null;

    // Try to extract CID from various URL formats
    const ipfsMatch = url.match(/\/ipfs\/([a-zA-Z0-9]+)/);
    const ipfsProtocolMatch = url.match(/^ipfs:\/\/([a-zA-Z0-9]+)/);

    if (ipfsMatch && ipfsMatch[1]) {
      cid = ipfsMatch[1];
    } else if (ipfsProtocolMatch && ipfsProtocolMatch[1]) {
      cid = ipfsProtocolMatch[1];
    }

    if (!cid) {
      console.error("Could not extract CID from URL:", url);
      return false;
    }

    // Unpin the file from Pinata using direct API call
    // Pinata API: DELETE /pinning/unpin/{CID}
    // Reference: https://docs.pinata.cloud/api-reference/endpoint/ipfs/unpin-file
    const response = await fetch(
      `https://api.pinata.cloud/pinning/unpin/${cid}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to unpin file: ${response.status} ${response.statusText}`
      );
      return false;
    }

    return true;
  } catch (error) {
    // Don't throw - log error but don't block the operation
    console.error("Error deleting image from Pinata:", error);
    return false;
  }
};
