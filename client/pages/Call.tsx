import { Call } from "@/components/call/Call";
import { CallProvider } from "@/hooks/useCall";

const CallPage = () => {
  return (
    <CallProvider>
      <Call />
    </CallProvider>
  );
};

export default CallPage;
