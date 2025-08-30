import type { DevTreeLink } from "../types";
import { Switch } from "@headlessui/react";
import { classNames } from "../utils";

type DevTreeLinkProps = {
    item: DevTreeLink
    handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEnableLink: (socialNetwork: string) => void
};

export const DevTreeInput = ({ item, handleUrlChange, handleEnableLink }: DevTreeLinkProps) => {
    return (
        <div className="bg-white shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-3">

            {/* Icono */}
            <div
                className="w-12 h-12 bg-contain bg-center bg-no-repeat mx-auto sm:mx-0"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}social/icon_${item.name}.svg)` }}
            />

            {/* Contenedor input + switch */}
            <div className="flex flex-row flex-1 items-center gap-3">
                {/* Input */}
                <input
                    type="text"
                    className="flex-1 border border-gray-200 rounded p-2"
                    value={item.url}
                    onChange={handleUrlChange}
                    name={item.name}
                />

                {/* Switch */}
                <Switch
                    checked={item.enabled}
                    onChange={() => handleEnableLink(item.name)}
                    className={classNames(
                        item.enabled ? 'bg-blue-500' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                >
                    <span
                        aria-hidden="true"
                        className={classNames(
                            item.enabled ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                    />
                </Switch>
            </div>
        </div>
    )
}
