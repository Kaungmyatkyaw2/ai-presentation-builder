import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CreatePageSkeleton from "./_components/create-page/create-page-skeleton";
import RenderPage from "./_components/render-page";

type Props = {};

const CreatePagePage = async (props: Props) => {

  const checkUser = await onAuthenticateUser()

  if (!checkUser.user){
    redirect("/sign-in")
  }

  // if (!checkUser.user.subscription){
  //   redirect("/dashboard")
  // }


  return <main className="w-full h-full overflow-x-hidden pt-6">
    <Suspense fallback={<CreatePageSkeleton/>}>
        <RenderPage/>
    </Suspense>
  </main>;
};

export default CreatePagePage;
