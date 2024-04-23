import Image from "next/image";

import LightLogo from "@/public/sm-logo.svg";
import DarkLogo from "@/public/sm-dark-logo.svg";
import { BackHeader } from "@/components/navigation/back-header";
import { getNotifications } from "@/actions/notifications-service";

async function Notifications() {
  const notifications = await getNotifications();

  return (
    <div>
      <BackHeader label="Notifications" />
      {!notifications.length && (
        <div className="flex items-center justify-center py-3">
          <h2 className="ms:text-xl text-lg font-medium text-primary/50 pointer-events-none">
            No notification
          </h2>
        </div>
      )}
      <div className="flex flex-col">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center p-6 gap-4 border-b"
          >
            <Image
              src={LightLogo}
              alt="Social app logo"
              priority
              style={{ width: "30px", height: "30px" }}
              className="dark:hidden text-primary xl:ml-2 max-ms:ml-2"
            />
            <Image
              src={DarkLogo}
              alt="Social app logo"
              priority
              style={{ width: "30px", height: "30px" }}
              className="hidden dark:block text-primary xl:ml-2 max-ms:ml-2"
            />
            {notification.body}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
