"use client";

import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import useAuthStore from "@/store/authStore";
import useStore from "@/hooks/store/useStore";

export default function NavbarNext() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isAuthenticated = useStore(
		useAuthStore,
		(state) => state.isAuthenticated,
	);

	const menuItems = [
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Products", href: "/dashboard/products" },
		{ label: "Sells", href: "/dashboard/sells/" },
	];

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<p className="font-bold text-inherit">Store App</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{menuItems.map((link, index) => (
					<NavbarItem key={`${link.label}-${index}`}>
						<Link className="w-full" href={link.href} size="lg">
							{link.label}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent justify="end">
				{!isAuthenticated && (
					<>
						<NavbarItem>
							<Button
								as={Link}
								color="primary"
								href="/auth/register"
								variant="flat"
							>
								Sign Up
							</Button>
						</NavbarItem>
						<NavbarItem>
							<Link href="/auth/login">Login</Link>
						</NavbarItem>
					</>
				)}
				{isAuthenticated && (
					<>
						<NavbarItem>
							<Link href="#">Logout</Link>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((link, index) => (
					<NavbarMenuItem key={`${link.label}-${index}`}>
						<Link className="w-full" href={link.href} size="lg">
							{link.label}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
