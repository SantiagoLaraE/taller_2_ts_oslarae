import { Toast } from "bootstrap";
import { notification } from "../nodes";

const notificationBootstrap = new Toast(notification);

type notificationTypes = "danger" | "primary" | "success" | "warning";

export const showNotificationMessage = (
  message: string,
  type: notificationTypes
) => {
  const body = notification.querySelector(".toast-body") as HTMLDivElement;
  body.innerHTML = message;

  notification.classList.forEach((value)=>{
    if (value.startsWith("text-bg-")) {notification.classList.remove(value);}
  })

  notification.classList.add(`text-bg-${type}`);

  notificationBootstrap.show();
};
