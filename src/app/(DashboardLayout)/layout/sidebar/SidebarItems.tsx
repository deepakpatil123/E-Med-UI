import React, { useState, useEffect } from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";

const SidebarItems = ({ toggleMobileSidebar, role }: any) => {
  const auth: any = useAuth();
  const pathname = usePathname();
  const pathDirect = pathname;

  console.log(auth, "AUTTTTTTTTTTTTTTTTTTTTTTTTTTTH");

  const userRole = auth?.user?.message;

  const adminMenu = Menuitems.Admin[role];
  const employeeMenu = Menuitems.Employee;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {!userRole ? (
          <p>Loading....</p>
        ) : userRole && userRole.includes("User") ? (
          adminMenu?.map((item: any) => (
            <NavItem
              item={item}
              key={item.id}
              pathDirect={pathDirect}
              onClick={toggleMobileSidebar}
            />
          ))
        ) : (
          ""
        )}
      </List>
    </Box>
  );
};
export default SidebarItems;
