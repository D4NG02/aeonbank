"use client";

import Link from "next/link";
import { motion as M } from "motion/react";
import { HTMLAttributes, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { Menu, Search, X } from "lucide-react";
import { useStateProvider } from "../utils/Reducer/StateProvider";
import { usePathname } from "next/navigation";
import Button from "./Button";

const Navbar = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  return (
    <>
      <nav className={twMerge("py-1.5 border-b border-gray-600/80 text-lg", "px-5 md:px-10")}>
        {/* Mobile */}
        <div
          className={twMerge(
            "w-full flex flex-row justify-between",
            "lg:hidden",
          )}
        >
          <Link replace href="/">
            <h1 className="font-heading text-3xl text-purple-500">AEON</h1>
          </Link>

          <div className="flex flex-row gap-3 items-center">
            <Button
              variant="icon"
              className="rounded-full"
              onClick={() => setIsMenu(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-row gap-4 items-center text-base">
          <Link replace href="/" className="mr-10">
            <h1 className="font-heading text-3xl text-purple-500">AEON</h1>
          </Link>
          <Links className="items-center" onClose={() => setIsMenu(false)} />
          <input
            className={twMerge(
              "hidden",
              "lg:block ml-auto px-2 py-1 text-base rounded-lg bg-gray-300/60",
              "focus:outline-purple-500"
            )}
            type="text"
            name="search"
            placeholder="Search documentation..."
          />
        </div>
      </nav>

      {isMenu &&
        createPortal(
          <M.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-gray-50"
          >
            <div
              className={twMerge(
                "py-1.5 border-b flex flex-row justify-between",
                "px-5 md:px-10",
              )}
            >
              <Link replace href="/"
                onNavigate={() => setIsMenu(false)}
              >
                <h1 className="font-heading text-3xl text-purple-500">AEON</h1>
              </Link>
              <div className="flex flex-row gap-3 items-center">
                <Button variant="icon" className="rounded-full">
                  <Search />
                </Button>
                <Button
                  variant="icon"
                  className="rounded-full"
                  onClick={() => setIsMenu(!isMenu)}
                >
                  <X />
                </Button>
              </div>
            </div>

            <Links
              onClose={() => setIsMenu(false)}
              className="flex-col py-3 px-5 md:px-10"
            />
          </M.div>,
          document.body,
        )}
    </>
  );
};

export default Navbar;

interface LinksProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}
const Links = ({ onClose, className }: LinksProps) => {
  const currentPathname = usePathname();
  const { state } = useStateProvider();
  const { login } = state;

  return (
    <div className={twMerge("text-base flex gap-3 flex-row", className)}>
      {login.success && <Link
        replace
        // aria-label="protected route"
        href="/showcase"
        onNavigate={onClose}
        className={twMerge(
          "rounded-lg py-1 lg:px-2 hover:pl-2 hover:bg-purple-300",
          currentPathname.includes("/showcase")
            ? "font-heading text-lg rounded-none pointer-events-none pl-2 border-l-2 lg:border-l-0 lg:border-b-2 lg:px-0 border-purple-300"
            : "",
        )}
      >
        Showcase
      </Link>}
      <Link
        replace
        href="/docs"
        onNavigate={onClose}
        className={twMerge(
          "rounded-lg py-1 lg:px-2 hover:pl-2 hover:bg-purple-300",
          currentPathname.includes("/docs")
            ? "font-heading text-lg rounded-none pointer-events-none pl-2 border-l-2 lg:border-l-0 lg:border-b-2 lg:px-0 border-purple-300"
            : "",
        )}
      >
        Docs
      </Link>
      <Link
        replace
        href="/blog"
        onNavigate={onClose}
        className={twMerge(
          "rounded-lg py-1 lg:px-2 hover:pl-2 hover:bg-purple-300",
          currentPathname.includes("/blog")
            ? "font-heading text-lg rounded-none pointer-events-none pl-2 border-l-2 lg:border-l-0 lg:border-b-2 lg:px-0 border-purple-300"
            : "",
        )}
      >
        Blog
      </Link>
      <Link
        replace
        href="/analytics"
        onNavigate={onClose}
        className={twMerge(
          "rounded-lg py-1 lg:px-2 hover:pl-2 hover:bg-purple-300",
          currentPathname.includes("/analytics")
            ? "font-heading text-lg rounded-none pointer-events-none pl-2 border-l-2 lg:border-l-0 lg:border-b-2 lg:px-0 border-purple-300"
            : "",
        )}
      >
        Analytics
      </Link>
      <Link
        replace
        href="/templates"
        onNavigate={onClose}
        className={twMerge(
          "rounded-lg py-1 lg:px-2 hover:pl-2 hover:bg-purple-300",
          currentPathname.includes("/templates")
            ? "font-heading text-lg rounded-none pointer-events-none pl-2 border-l-2 lg:border-l-0 lg:border-b-2 lg:px-0 border-purple-300"
            : "",
        )}
      >
        Templates
      </Link>
      <Link
        replace
        href="/enterprise"
        onNavigate={onClose}
        className={twMerge(
          "rounded-lg py-1 lg:px-2 hover:pl-2 hover:bg-purple-300",
          currentPathname.includes("/enterprise")
            ? "font-heading text-lg rounded-none pointer-events-none pl-2 border-l-2 lg:border-l-0 lg:border-b-2 lg:px-0 border-purple-300"
            : "",
        )}
      >
        Enterprise
      </Link>
      {!login.success ? (
        <Link
          replace
          href="/login"
          onNavigate={onClose}
          className={twMerge(
            "rounded-lg py-1 lg:px-2 hover:pl-2 hover:bg-purple-300",
            currentPathname.includes("/login")
              ? "font-heading text-lg rounded-none pointer-events-none pl-2 border-l-2 lg:border-l-0 lg:border-b-2 lg:px-0 border-purple-300"
              : "",
          )}
        >
          Login
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};
