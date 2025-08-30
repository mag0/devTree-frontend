import { ErrorMessage } from "./ErrorMessage"
import { useForm } from "react-hook-form"
import slugify from "react-slugify"
import { useMutation } from "@tanstack/react-query"
import { searchByHandle } from "../api/DevTreeAPI"
import { Link } from "react-router-dom"

export const SearchForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            handle: ""
        }
    })

    const mutation = useMutation({
        mutationFn: searchByHandle
    })

    const handle = watch("handle")

    const handleSearch = () => {
        const slug = slugify(handle)
        mutation.mutate(slug)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5"
        >
            <div className="relative flex items-center bg-white px-2">
                <label htmlFor="handle">devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                    placeholder="usuario"
                    {...register("handle", {
                        required: "El Nombre de Usuario es obligatorio",
                    })}
                />
            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="mt-10 text-center">
                {mutation.isPending && (
                    <div className="flex justify-center items-center gap-2 text-cyan-500">
                        <svg
                            className="animate-spin h-5 w-5 text-cyan-500"
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
                        <span>Buscando...</span>
                    </div>
                )}
                {mutation.error && (
                    <p className="text-center text-red-600 font-black">
                        {mutation.error.message}
                    </p>
                )}
                {mutation.data && (
                    <p className="text-center text-cyan-500 font-black">
                        {mutation.data} — ir a{" "}
                        <Link
                            to={'/auth/register'}
                            state={{ handle: slugify(handle) }}
                            className="underline"
                        >
                            Registro
                        </Link>
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="flex items-center justify-center gap-2 bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {mutation.isPending ? "Buscando..." : "Obtener mi DevTree"}
            </button>
        </form>
    )
}
