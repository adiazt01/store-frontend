"use client";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export const BreadcrumbsNav = () => {
  const router = usePathname();
  const crumbs = router.split("/").filter((path) => path);

  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <Breadcrumbs>
      {crumbs.map((crumb, i, crumbArray) => {
        const path = `/${crumbArray.slice(0, i + 1).join("/")}`;
        return (
          <BreadcrumbItem href={path} key={path}>
            {crumb}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};
