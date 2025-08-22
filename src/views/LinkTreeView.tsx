import { social } from "../data/social"
import { useEffect, useState } from "react"
import { DevTreeInput } from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/DevTreeAPI"
import type { SocialNetwork, User } from "../types"

export const LinkTreeView = () => {

    const [devTreeLinks, setDevTreeLinks] = useState(social)

    const queryClient = useQueryClient();
    const user: User = queryClient.getQueryData<User>(['user'])!;
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Actualizado correctamente")
        }
    })

    useEffect(() => {
        const updatedData = devTreeLinks.map(item => {
            const userLink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name);
            if (userLink) {
                return { ...item, url: userLink.url, enabled: userLink.enabled };
            }
            return item
        });
        setDevTreeLinks(updatedData);
    }, [])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatesLinks = devTreeLinks.map(link =>
            link.name === e.target.name ? { ...link, url: e.target.value } : link
        )
        setDevTreeLinks(updatesLinks)

        queryClient.setQueryData(['user'], (oldData: User) => {
            return { ...oldData, links: JSON.stringify(updatesLinks) };
        });
    }

    const handleEnableLink = (socialNetwork: string) => {
        const updatesLinks = devTreeLinks.map(link => {
            if (link.name === socialNetwork) {
                if (isValidUrl(link.url)) {
                    return { ...link, enabled: !link.enabled }
                } else {
                    toast.error("Invalid URL")
                }
            }
            return link
        })
        setDevTreeLinks(updatesLinks)

        queryClient.setQueryData(['user'], (oldData: User) => {
            return { ...oldData, links: JSON.stringify(updatesLinks) };
        });
    }

    return (
        <div className="space-y-5">
            {devTreeLinks.map(item => (
                <DevTreeInput
                    key={item.name}
                    item={item}
                    handleUrlChange={handleUrlChange}
                    handleEnableLink={handleEnableLink}
                />
            ))}
            <button
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 cursor-pointer  rouded font-bold"
                onClick={() => mutate(user)}
            >Guardar cambios</button>
        </div>
    )
}
