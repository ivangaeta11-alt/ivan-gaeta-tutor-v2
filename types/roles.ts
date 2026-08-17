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

export function roleToSegment(role: UserRole): AreaPersonaleSegment | null {
  switch (role) {
    case "student":
      return "studente";
    case "promoter":
      return "promoter";
    case "tutor":
      return "tutor";
    case "admin":
      return null;
  }
}

const DASHBOARD_ROLES: UserRole[] = ["student", "tutor", "promoter"];

export function getDashboardRoles(roles: UserRole[]): UserRole[] {
  const effective = new Set<UserRole>(roles.filter((r) => DASHBOARD_ROLES.includes(r)));
  if (roles.includes("admin")) {
    DASHBOARD_ROLES.forEach((role) => effective.add(role));
  }
  return DASHBOARD_ROLES.filter((role) => effective.has(role));
}

export function hasDashboardAccess(
  roles: UserRole[],
  segment: AreaPersonaleSegment
): boolean {
  if (roles.includes("admin")) return true;
  return roles.includes(segmentToRole(segment));
}

export function getPostLoginPath(roles: UserRole[]): string {
  const dashboardRoles = getDashboardRoles(roles);
  if (dashboardRoles.length === 0) return "/area-personale/in-attesa";
  if (dashboardRoles.length === 1) {
    const segment = roleToSegment(dashboardRoles[0]);
    return segment ? `/area-personale/${segment}` : "/area-personale/selezione-area";
  }
  return "/area-personale/selezione-area";
}
