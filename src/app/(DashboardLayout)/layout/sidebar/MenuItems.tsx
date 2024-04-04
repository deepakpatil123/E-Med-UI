import { IconLayoutDashboard } from "@tabler/icons-react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { uniqueId } from "lodash";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import BadgeIcon from "@mui/icons-material/Badge";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LockResetIcon from "@mui/icons-material/LockReset";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Menuitems: any = {
  Admin: {
    "Diary Entry - Admin IV": [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/SecPermission",
      },
      // {
      //   id: uniqueId(),
      //   title: "Emergencys",
      //   icon: ContactEmergencyIcon,
      //   href: "/Admin/SecEmergency",
      // },
      {
        id: uniqueId(),
        title: "Claims",
        icon: EditNoteIcon,
        href: "/Admin/SecClaim",
      },
    ],

    "ASO 1 - Admin IV": [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/SecPermission",
      },
      // {
      //   id: uniqueId(),
      //   title: "Emergencys",
      //   icon: ContactEmergencyIcon,
      //   href: "/Admin/SecEmergency",
      // },
      {
        id: uniqueId(),
        title: "Claims",
        icon: EditNoteIcon,
        href: "/Admin/SecClaim",
      },
      {
        id: uniqueId(),
        title: "Empanelled Hospitals",
        icon: LocalHospitalIcon,
        href: "/Admin/Hospital",
      },
    ],
    "ASO 6 - Admin IV": [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/SecPermission",
      },
      // {
      //   id: uniqueId(),
      //   title: "Emergencys",
      //   icon: ContactEmergencyIcon,
      //   href: "/Admin/SecEmergency",
      // },
      {
        id: uniqueId(),
        title: "Claims",
        icon: EditNoteIcon,
        href: "/Admin/SecClaim",
      },
      {
        id: uniqueId(),
        title: "Empanelled Hospitals",
        icon: LocalHospitalIcon,
        href: "/Admin/Hospital",
      },
    ],

    "SO Admin IV": [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/SecPermission",
      },
      // {
      //   id: uniqueId(),
      //   title: "Emergencys",
      //   icon: ContactEmergencyIcon,
      //   href: "/Admin/SecEmergency",
      // },
      {
        id: uniqueId(),
        title: "Claims",
        icon: EditNoteIcon,
        href: "/Admin/SecClaim",
      },
    ],

    "US Admin": [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/SecPermission",
      },
      // {
      //   id: uniqueId(),
      //   title: "Emergencys",
      //   icon: ContactEmergencyIcon,
      //   href: "/Admin/SecEmergency",
      // },
      {
        id: uniqueId(),
        title: "Claims",
        icon: EditNoteIcon,
        href: "/Admin/SecClaim",
      },
      {
        id: uniqueId(),
        title: "All Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/AllPermission",
      },
      {
        id: uniqueId(),
        title: "Rejected Permissions",
        icon: ThumbDownOffAltIcon,
        href: "/Admin/RejectedPer",
      },
      {
        id: uniqueId(),
        title: "Date wise Permissions",
        icon: CalendarTodayIcon,
        href: "/Admin/DatewisePer",
      },
    ],
    "DS Admin": [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/SecPermission",
      },
      // {
      //   id: uniqueId(),
      //   title: "Emergencys",
      //   icon: ContactEmergencyIcon,
      //   href: "/Admin/SecEmergency",
      // },
      {
        id: uniqueId(),
        title: "Claims",
        icon: EditNoteIcon,
        href: "/Admin/SecClaim",
      },
      {
        id: uniqueId(),
        title: "All Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/AllPermission",
      },
      {
        id: uniqueId(),
        title: "Rejected Permissions",
        icon: ThumbDownOffAltIcon,
        href: "/Admin/RejectedPer",
      },
      {
        id: uniqueId(),
        title: "Date wise Permissions",
        icon: CalendarTodayIcon,
        href: "/Admin/DatewisePer",
      },
    ],

    "Joint Secretary Admin": [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/SecPermission",
      },
      // {
      //   id: uniqueId(),
      //   title: "Emergencys",
      //   icon: ContactEmergencyIcon,
      //   href: "/Admin/SecEmergency",
      // },
      {
        id: uniqueId(),
        title: "Claims",
        icon: EditNoteIcon,
        href: "/Admin/SecClaim",
      },
      {
        id: uniqueId(),
        title: "All Employees",
        icon: BadgeIcon,
        href: "/Admin/AllEmployees",
      },
      {
        id: uniqueId(),
        title: "Register New Employee",
        icon: AppRegistrationIcon,
        href: "/Admin/RegisterNewEmp",
      },
      {
        id: uniqueId(),
        title: "All Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/AllPermission",
      },
      {
        id: uniqueId(),
        title: "Rejected Permissions",
        icon: ThumbDownOffAltIcon,
        href: "/Admin/RejectedPer",
      },
      // {
      //   id: uniqueId(),
      //   title: "2023-24 File No",
      //   icon: CalendarMonthIcon,
      //   href: "/Admin/Files",
      // },
    ],

    Secretary: [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Secretary's Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/SecPermission",
      },
      // {
      //   id: uniqueId(),
      //   title: "Secretary's Emergencys",
      //   icon: ContactEmergencyIcon,
      //   href: "/Admin/SecEmergency",
      // },
      {
        id: uniqueId(),
        title: "Secretary's Claims",
        icon: EditNoteIcon,
        href: "/Admin/SecClaim",
      },
      {
        id: uniqueId(),
        title: "All Employees",
        icon: BadgeIcon,
        href: "/Admin/AllEmployees",
      },
      {
        id: uniqueId(),
        title: "Register New Employee",
        icon: AppRegistrationIcon,
        href: "/Admin/RegisterNewEmp",
      },
      {
        id: uniqueId(),
        title: "All Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/AllPermission",
      },
      {
        id: uniqueId(),
        title: "Completed Permission",
        icon: CheckCircleIcon,
        href: "/Admin/CompletePer",
      },
      {
        id: uniqueId(),
        title: "Completed Claim",
        icon: CheckCircleIcon,
        href: "/Admin/CompletClaim",
      },
      {
        id: uniqueId(),
        title: "Registered Employees",
        icon: PeopleAltIcon,
        href: "/Admin/RegisteredEmp",
      },
      {
        id: uniqueId(),
        title: "Rejected Permissions",
        icon: ThumbDownOffAltIcon,
        href: "/Admin/RejectedPer",
      },
      // {
      //   id: uniqueId(),
      //   title: "Date wise Permissions",
      //   icon: CalendarTodayIcon,
      //   href: "/Admin/DatewisePer",
      // },
      // {
      //   id: uniqueId(),
      //   title: "2023-24 File No",
      //   icon: CalendarMonthIcon,
      //   href: "/Admin/Files",
      // },
      {
        id: uniqueId(),
        title: "Empanelled Hospital",
        icon: LocalHospitalIcon,
        href: "/Admin/Hospital",
      },
      {
        id: uniqueId(),
        title: "Change Password",
        icon: LockResetIcon,
        href: "/Admin/ChangePass",
      },
    ],
    Chairman: [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/SecPermission",
      },
      {
        id: uniqueId(),
        title: "Claims",
        icon: EditNoteIcon,
        href: "/Admin/SecClaim",
      },
      {
        id: uniqueId(),
        title: "Completed Permission",
        icon: CheckCircleIcon,
        href: "/Admin/CompletePer",
      },
      {
        id: uniqueId(),
        title: "Completed Claim",
        icon: CheckCircleIcon,
        href: "/Admin/CompletClaim",
      },
      {
        id: uniqueId(),
        title: "All Employees",
        icon: BadgeIcon,
        href: "/Admin/AllEmployees",
      },
      {
        id: uniqueId(),
        title: "Register New Employee",
        icon: AppRegistrationIcon,
        href: "/Admin/RegisterNewEmp",
      },
      {
        id: uniqueId(),
        title: "All Permissions",
        icon: ChecklistRtlIcon,
        href: "/Admin/AllPermission",
      },
      {
        id: uniqueId(),
        title: "Registered Employees",
        icon: PeopleAltIcon,
        href: "/Admin/RegisteredEmp",
      },
      {
        id: uniqueId(),
        title: "Rejected Permissions",
        icon: ThumbDownOffAltIcon,
        href: "/Admin/RejectedPer",
      },
      // {
      //   id: uniqueId(),
      //   title: "Date wise Permissions",
      //   icon: CalendarTodayIcon,
      //   href: "/Admin/DatewisePer",
      // },
      // {
      //   id: uniqueId(),
      //   title: "2023-24 File No",
      //   icon: CalendarMonthIcon,
      //   href: "/Admin/Files",
      // },
      {
        id: uniqueId(),
        title: "Empanelled Hospital",
        icon: LocalHospitalIcon,
        href: "/Admin/Hospital",
      },
      {
        id: uniqueId(),
        title: "Change Password",
        icon: LockResetIcon,
        href: "/Admin/ChangePass",
      },
    ],
  },

  Employee: [
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/dashboard",
    },

    {
      id: uniqueId(),
      title: "Status",
      icon: PublishedWithChangesIcon,
      href: "/Employee/Status",
    },
    {
      id: uniqueId(),
      title: "Medical Permission/Claim",
      icon: EditNoteIcon,
      href: "/Employee/Permission",
    },
    {
      id: uniqueId(),
      title: "Employee Details",
      icon: PeopleAltIcon,
      href: "/Employee/EmpDetails",
    },
    {
      id: uniqueId(),
      title: "Family Details",
      icon: AccountBalanceIcon,
      href: "/Employee/FamilyDetails",
    },
    {
      id: uniqueId(),
      title: "Change Password",
      icon: LockResetIcon,
      href: "/Employee/ChangePass",
    },
  ],
};

export default Menuitems;
