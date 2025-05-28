"use client";

import { getStripeConnectionUrl } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { User } from "@/generated/prisma";
import { DollarSignIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const StripeConnectButton = ({user} : {user : User}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClickConnect = async () => {
    try {
      setLoading(true);

      const directUrl = await getStripeConnectionUrl();
      router.replace(directUrl);
    } catch (error) {
      toast.error("Failed to connect!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="">
     {
      user.stripe_user_id ?
       <p className="font-bold text-black dark:text-white">You have connected your stripe account!</p>
      : 
       <Button onClick={handleClickConnect} disabled={loading || !!user.stripe_user_id}>
        <DollarSignIcon className="size-4 mr-1" />
        {loading ? "Connecting" : "Connect"} Stripe Account {loading ? "..." : ""}
      </Button>
     }
    </div>
  );
};

export default StripeConnectButton;
