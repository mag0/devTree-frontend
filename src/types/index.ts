export type User = {
    name: string;
    email: string;
    handle: string;
    _id: string;
    description: string;
    image: string;
    links: string;
}

export type RegisterFormData = Pick<User, "name" | "email" | "handle"> & {
    password: string;
    password_confirmation: string;
}

export type LoginFormData = Pick<User, "email"> & {
    password: string;
}

export type ProfileForm = Pick<User, "handle" | "description">

export type SocialNetwork = {
    id: number;
    name: string;
    url: string;
    enabled: boolean;
}

export type DevTreeLink = Pick<SocialNetwork, "name" | "url" | "enabled">