"use client";

import { getStripeConnectionUrl } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { DollarSignIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const StripeConnectButton = () => {
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
      <Button onClick={handleClickConnect} disabled={loading}>
        <DollarSignIcon className="size-4 mr-2" />
        {loading ? "Connecting" : "Connect"} Stripe Account {loading ? "..." : ""}
      </Button>
    </div>
  );
};

export default StripeConnectButton;
