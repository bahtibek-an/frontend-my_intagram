import * as Tabs from "@radix-ui/react-tabs";
import { Link, Outlet } from "react-router-dom";

interface TabProps {
    username: string;
}

export const Tab: React.FC<TabProps> = ({ username }) => {

    const tabItems = [
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                </svg>
            ),
            name: "Post",
            href: `/${username}`
        },
        {
            icon: (
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 22V3C5 2.44772 5.44772 2 6 2H18C18.5523 2 19 2.44772 19 3V22L12 15.8889L5 22Z" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            ),
            name: "Save",
            href: ``
        },
        {
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                </svg>
            ),
            name: "Tagges",
            href: ``
        },

    ];


    const renderTabContent = (tabName: string | null) => {
        switch (tabName) {
            case "Post":
                return (
                    <p className="text-xs leading-normal">
                        Posts
                    </p>
                );
            case "Save":
                return (
                    <p className="text-xs leading-normal">
                        Save
                    </p>
                );
            case "Tagges":
                return (
                    <p className="text-xs leading-normal">
                        Taggas
                    </p>
                );
            default:
                return null;
        }
    };

    return (
        <Tabs.Root
            className="max-w-screen-xl mx-auto px-4 md:px-8 h-full"
            defaultValue={tabItems[0].name}
        >
            <Tabs.List
                className="w-full border-b flex items-center text-center gap-x-3 overflow-x-auto text-sm"
                aria-label="Manage your account"
            >
                {tabItems.map((item, idx) => (
                    <Tabs.Trigger
                        key={idx}
                        className="group outline-none py-1.5 border-b-2 border-white text-gray-500 data-[state=active]:border-gray-900 data-[state=active]:text-gray-900"
                        value={item.name}
                    >
                        <div className="flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-gray-600 group-hover:bg-gray-200 group-active:bg-gray-100 font-medium">
                            <Link to={item.href} className="flex pl-2">
                                {item.icon}
                                {item.name}
                            </Link>
                        </div>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
            {tabItems.map((item, idx) => (
                <Tabs.Content key={idx} className="py-6" value={item.name}>
                    {renderTabContent(item.name)}
                    <Outlet />
                </Tabs.Content>
            ))}
        </Tabs.Root>
    );
};
