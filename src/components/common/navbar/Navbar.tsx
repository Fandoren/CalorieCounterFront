import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { NavLink } from "react-router"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Подсчёт калорий", to: "/" },
  { label: "История", to: "/history" },
  { label: "Продукты", to: "/products" },
]

export function Navbar() {
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-14 items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      NavigationMenuLink,
                      "px-4 py-2 transition-colors text-lg",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
