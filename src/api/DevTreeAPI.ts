import { isAxiosError } from "axios"
import api from "../config/axios"
import type { ProfileForm, User } from "../types"


export async function getUser() {
    try {
        const { data } = await api<User>("/user")
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProfile(formData: User) {
    try {
        const { data } = await api.patch<string>("/user", formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function uploadImage(file: File) {
    const formData = new FormData(); //distinto al curso con const en vez de let
    formData.append("file", file);
    try {
        const { data: { image } }: { data: { image: string } } = await api.post("/user/image", formData)
        return image

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}