
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, FileBarChart2, BarChart, Landmark, Users2, TrendingUp, BookText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Reports Table", url: "/reports-table", icon: FileBarChart2 },
  { title: "Sector Trends", url: "/sector-trends", icon: BarChart },
  { title: "Analyst Ratings", url: "/analyst-ratings", icon: Users2 },
  { title: "Macros", url: "/macros", icon: Landmark },
  { title: "Recommendations", url: "/recommendations", icon: TrendingUp },
  { title: "Documentation", url: "/documentation", icon: BookText },
];

export function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="text-primary font-bold tracking-widest text-lg">Stock Analyzer</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
