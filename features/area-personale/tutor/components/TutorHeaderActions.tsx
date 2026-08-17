import React from "react";
import NotificationBell from "../../components/NotificationBell";
import type { TutorNotification } from "../types";

interface TutorHeaderActionsProps {
  notifications: TutorNotification[];
}

const TutorHeaderActions: React.FC<TutorHeaderActionsProps> = ({ notifications }) => {
  return <NotificationBell notifications={notifications} />;
};

export default TutorHeaderActions;
