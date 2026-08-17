import React from "react";
import NotificationBell from "../../components/NotificationBell";
import type { Notification } from "../types";

interface StudentHeaderActionsProps {
  notifications: Notification[];
}

const StudentHeaderActions: React.FC<StudentHeaderActionsProps> = ({ notifications }) => {
  return <NotificationBell notifications={notifications} />;
};

export default StudentHeaderActions;
