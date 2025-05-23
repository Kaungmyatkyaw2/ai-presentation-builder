import { onAuthenticateUser } from '@/actions/user';
import StripeConnectButton from './_components/stripe-connect-button';

const SettingsPage = async () => {
  const checkUser = await onAuthenticateUser();


  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Settings
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            All your settings
          </p>
        </div>
      </div>
      <StripeConnectButton/>
      {/* <LemonSqueezyCredentials user={checkUser.user!} /> */}
    </div>
  );
};

export default SettingsPage;
