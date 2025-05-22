"use server";

import { lemonSqueezyClient } from "@/lib/axios";

export const buySubscription = async (buyUserId: string) => {
  try {
    const res = await lemonSqueezyClient(
      process.env.LEMON_SQUEEZY_API_KEY
    ).post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              buyerUserId: buyUserId,
            },
          },
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: process.env.LEMON_SQUEEZY_VARIANT_ID,
            },
          },
        },
      },
    });

    const checkoutURl = res.data.data.attributes.url;

    return { url: checkoutURl, status: 200 };
  } catch (error) {
    console.error("ERROR:", error);
    return { message: "Internal Server Error", status: 500 };
  }
};

export const buyTemplate = async (
  buyUserId: string,
  {
    apiKey,
    secretKey,
    sellerUserId,
    storeId,
    variantId,
    projectId,
  }: {
    sellerUserId: string;
    secretKey: string;
    apiKey: string;
    storeId: string;
    variantId: string;
    projectId: string;
  }
) => {
  try {
    const res = await lemonSqueezyClient(apiKey).post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              buyerUserId: buyUserId,
              sellerUserId,
              projectId,
            },
          },
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeId,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: variantId,
            },
          },
        },
      },
    });

    const checkoutURl = res.data.data.attributes.url;

    return { url: checkoutURl, status: 200 };
  } catch (error) {
    console.error("ERROR:", error);
    return { message: "Internal Server Error", status: 500 };
  }
};
