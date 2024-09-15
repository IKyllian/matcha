import Header from "front/components/header/header"

const PublicRoute = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default PublicRoute