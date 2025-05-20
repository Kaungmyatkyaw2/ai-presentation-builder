"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403 };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        PurchasedProjects: {
          select: { id: true },
        },
      },
    });

    if (userExist) {
      return {
        status: 200,
        user: userExist,
      };
    }

    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }

    return { status: 400 };
  } catch (err) {
    console.log("Error: ", err);
    return { status: 500 };
  }
};

export const updateUserLemonSqueezyApiKey = async (newKey: string) => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status != 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated!" };
    }

    const updatedUser = await client.user.update({
      where: {
        id: checkUser.user.id,
      },
      data: {
        lemonSqueezyApiKey: newKey,
      },
    });

    if (!updatedUser) {
      return { status: 500, error: "Failed to update api key" };
    }

    return { status: 200, data: updatedUser };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateUserStoreId = async (storeId: string) => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status != 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated!" };
    }

    const updatedUser = await client.user.update({
      where: {
        id: checkUser.user.id,
      },
      data: {
        storeId: storeId,
      },
    });

    if (!updatedUser) {
      return { status: 500, error: "Failed to update store id" };
    }

    return { status: 200, data: updatedUser };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};

export const updateUserWebhookSecret = async (scrt: string) => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status != 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated!" };
    }

    const updatedUser = await client.user.update({
      where: {
        id: checkUser.user.id,
      },
      data: {
        webhookSecret: scrt,
      },
    });

    if (!updatedUser) {
      return { status: 500, error: "Failed to update web hook secret" };
    }

    return { status: 200, data: updatedUser };
  } catch (error) {
    console.log("Error: ", error);
    return { status: 500, error: "Internal Server Error" };
  }
};
