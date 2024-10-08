import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import { Search } from "./components/compositions/search";
import { H2 } from "./components/ui/typography";

interface NavigationItem {
  name: string;
  path: string;
}
const navigation: NavigationItem[] = [{ name: "Packages", path: "/" }];

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const currentPath = window.location.pathname;

  function checkIsCurrentPage(target: NavigationItem): boolean {
    return currentPath.includes(target.path);
  }

  return (
    <div className="min-h-full">
      <ScrollRestoration />
      <Disclosure as="nav" className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <Link className="flex flex-shrink-0 items-center mt-2" to="/">
                <H2>mim</H2>
              </Link>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    aria-current={checkIsCurrentPage(item) ? "page" : undefined}
                    className={classNames(
                      checkIsCurrentPage(item)
                        ? "border-slate-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Search />
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.path}
                aria-current={checkIsCurrentPage(item) ? "page" : undefined}
                className={classNames(
                  checkIsCurrentPage(item)
                    ? "border-slate-500 bg-slate-50 text-slate-700"
                    : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                  "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="flex items-center px-4">
              <Search />
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
