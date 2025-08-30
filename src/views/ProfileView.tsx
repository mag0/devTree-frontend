import { useForm } from "react-hook-form";
import { ErrorMessage } from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ProfileForm, User } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";
import { useState } from "react";

export const ProfileView = () => {

    const [loading, setLoading] = useState(false);

    const queryClient = useQueryClient();
    const data: User = queryClient.getQueryData(['user'])!;

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        defaultValues: {
            handle: data.handle,
            description: data.description,
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (oldData: User) => {
                return { ...oldData, image: data };
            });
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            uploadImageMutation.mutate(event.target.files[0]);
        }
    };

    const handleUserProfileForm = (formData: ProfileForm) => {
        setLoading(true);
        const user: User = queryClient.getQueryData<User>(['user'])!;
        user.description = formData.description;
        user.handle = formData.handle;
        updateProfileMutation.mutate(user);
        setLoading(false);
    };

    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register("handle", { required: "El nombre de usuario es requerido" })}
                />

                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register("description")}
                />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 
                hover:file:bg-violet-100 cursor-pointer"
                    accept="image/*"
                    onChange={handleChange}
                />

            </div>

            <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 transition-colors text-white text-lg w-full py-3 rounded-md font-semibold cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`}
            >
                {loading && (
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                )}
                {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
        </form>
    )
}