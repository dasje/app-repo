import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Logo from "@/app/lib/images/badger-logo.jpg";
import Image from "next/image";

const Header = () => {
  return (
    <Navbar position="static">
      <NavbarBrand className="gap-4">
        <Link href="/">
          <Image src={Logo} alt="badger-logo" width={50} height={50} />
        </Link>
        <p className="font-bold text-inherit">Badger Apps</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/apps/watchlist">
            Watchlist
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login/login">
            <div>Login</div>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/login/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
export default Header;
