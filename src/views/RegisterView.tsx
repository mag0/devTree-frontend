import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { ErrorMessage } from '../components/ErrorMessage'
import type { RegisterFormData } from '../types'
import { toast } from 'sonner'
import api from '../config/axios'
import { useState } from 'react'

export const RegisterView = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    const initialValues: RegisterFormData = {
        name: '',
        email: '',
        handle: location?.state?.handle || '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
    })

    const handleRegister = async (formData: RegisterFormData) => {
        try {
            setIsSubmitting(true)
            const { data } = await api.post('/auth/register', formData)
            toast.success(data)
            reset();
            navigate('/auth/login')
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-slate-200 px-6 py-12 rounded-xl shadow-xl space-y-8 mt-10 max-w-lg mx-auto"
            >
                <h2 className="text-3xl font-bold text-slate-700 text-center">Crear Cuenta</h2>

                {/* Nombre */}
                <div className="space-y-2">
                    <label htmlFor="name" className="text-lg font-medium text-slate-600">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all p-3 rounded-md w-full placeholder-slate-400"
                        {...register("name", {
                            required: "El nombre es obligatorio",
                            minLength: { value: 2, message: "Mínimo 2 caracteres" }
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-lg font-medium text-slate-600">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all p-3 rounded-md w-full placeholder-slate-400"
                        {...register("email", {
                            required: "El email es obligatorio",
                            validate: (val) => val.includes("@") && val.includes(".com") ? undefined : "Email no válido"
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                {/* Handle */}
                <div className="space-y-2">
                    <label htmlFor="handle" className="text-lg font-medium text-slate-600">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all p-3 rounded-md w-full placeholder-slate-400"
                        {...register("handle", {
                            required: "El handle es obligatorio",
                            minLength: { value: 2, message: "Mínimo 2 caracteres" },
                            validate: (val) => !val.includes(" ") ? undefined : "El handle no puede tener espacios"
                        })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label htmlFor="password" className="text-lg font-medium text-slate-600">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all p-3 rounded-md w-full placeholder-slate-400"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: { value: 8, message: "Mínimo 8 caracteres" }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                {/* Confirmación */}
                <div className="space-y-2">
                    <label htmlFor="password_confirmation" className="text-lg font-medium text-slate-600">Repetir Contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border border-slate-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all p-3 rounded-md w-full placeholder-slate-400"
                        {...register("password_confirmation", {
                            required: "La confirmación de la contraseña es obligatoria",
                            validate: (val) => val === watch("password") || "Las contraseñas no coinciden"
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                {/* Botón */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 transition-colors text-white text-lg w-full py-3 rounded-md font-semibold cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    {isSubmitting && (
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
                    {isSubmitting ? "Creando..." : "Crear Cuenta"}
                </button>
            </form>

            <nav className='mt-10'>
                <Link to="/auth/login" className="text-center text-white text-lg block">
                    ¿Ya tienes cuenta? Inicia sesión aquí
                </Link>
            </nav>
        </>
    )
}
