import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "../components/ErrorMessage"
import type { LoginFormData } from "../types"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import api from "../config/axios"
import { useState } from "react"

export const LoginView = () => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const initialValues: LoginFormData = {
        email: "",
        password: "",
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    })

    const handleLogin = async (formData: LoginFormData) => {
        try {
            setLoading(true)
            const { data } = await api.post("/auth/login", formData)
            localStorage.setItem('token', data)
            navigate('/admin')
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-10 rounded-lg space-y-10 mt-10"
                noValidate
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
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
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
            </form>

            <nav className='mt-10'>
                <Link to="/auth/register" className="text-center text-white text-lg block">
                    ¿No tienes cuenta? Regístrate aquí
                </Link>
            </nav>
        </>
    )
}
