"use client";

import {
  updateUserLemonSqueezyApiKey,
  updateUserStoreId,
  updateUserWebhookSecret,
} from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/generated/prisma";
import { useState } from "react";
import { toast } from "sonner";

const LemonSqueezyCredentials = ({ user }: { user: User }) => {
  const [apiKey, setApiKey] = useState(user.lemonSqueezyApiKey || "");
  const [storeId, setStoreId] = useState(user.storeId || "");
  const [webHook, setWebHook] = useState(user.webhookSecret || "");

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateValue = async (
    key: "api" | "store" | "webhook",
    newValue: string
  ) => {
    try {
      setIsLoading(true);

      if (key == "api") {
        const res = await updateUserLemonSqueezyApiKey(newValue);
        if (res.status != 200) {
          throw new Error("Failed to udpate the credentials");
        }
        return toast.success("Success", {
          description: "successfully updated the credentials",
        });
      } else if (key == "store") {
        const res = await updateUserStoreId(newValue);
        if (res.status != 200) {
          throw new Error("Failed to udpate the credentials");
        }
        return toast.success("Success", {
          description: "successfully updated the credentials",
        });
      } else if (key == "webhook") {
        const res = await updateUserWebhookSecret(newValue);
        if (res.status != 200) {
          throw new Error("Failed to udpate the credentials");
        }
        return toast.success("Success", {
          description: "successfully updated the credentials",
        });
      }
    } catch {
      toast.success("Error", {
        description: "Failed to update the credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex items-center gap-4 flex-wrap justify-between">
        <Input
          className="w-[90%]"
          placeholder="Your api key here...."
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          disabled={isLoading}
        />
        <Button
          onClick={() => handleUpdateValue("api", apiKey)}
          disabled={isLoading}
        >
          Update
        </Button>
      </div>
      <div className="w-full flex items-center gap-4 flex-wrap justify-between">
        <Input
          className="w-[90%]"
          placeholder="Your store id here...."
          type="password"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          disabled={isLoading}
        />
        <Button
          onClick={() => handleUpdateValue("store", storeId)}
          disabled={isLoading}
        >
          Update
        </Button>
      </div>
      <div className="w-full flex items-center gap-4 flex-wrap justify-between">
        <Input
          className="w-[90%]"
          placeholder="Your web-hook secret here...."
          type="password"
          value={webHook}
          onChange={(e) => setWebHook(e.target.value)}
          disabled={isLoading}
        />
        <Button
          onClick={() => handleUpdateValue("webhook", webHook)}
          disabled={isLoading}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default LemonSqueezyCredentials;
