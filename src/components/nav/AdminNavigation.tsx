import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AdminNavigation = () => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const logout = async () => {
        try {
            setLoading(true)
            localStorage.removeItem('token')
            await queryClient.invalidateQueries({ queryKey: ['user'] })
            navigate("/auth/login")
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            className="flex items-center justify-center gap-2 bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={logout}
            disabled={loading}
        >
            {loading && (
                <svg
                    className="animate-spin h-4 w-4 text-slate-800"
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
            {loading ? "Cerrando sesión..." : "Cerrar Sesión"}
        </button>
    )
}

