import { Link } from 'react-router-dom'

export const Logo = () => {
    return (
        <Link to="/">
            <img src="/logo.svg" alt="Logotipo Devtree" className="w-full block" />
        </Link>
    )
}
