/**
 * Future auth roles. Not enforced yet — used for typing and layout labels.
 * Easy to extend with `admin` or other roles later.
 */
export type UserRole = "student" | "promoter" | "tutor" | "admin";

export const ROLE_LABELS: Record<UserRole, string> = {
  student: "Studente",
  promoter: "Promoter",
  tutor: "Tutor",
  admin: "Admin",
};

/** Maps URL segment under /area-personale to a role */
export const AREA_PERSONALE_ROLES = ["studente", "promoter", "tutor"] as const;
export type AreaPersonaleSegment = (typeof AREA_PERSONALE_ROLES)[number];

export function segmentToRole(segment: AreaPersonaleSegment): UserRole {
  switch (segment) {
    case "studente":
      return "student";
    case "promoter":
      return "promoter";
    case "tutor":
      return "tutor";
  }
}
