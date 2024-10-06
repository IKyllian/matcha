import Header from "front/components/header/header"

const PublicRoute = ({ children }) => {
    return (
        <div>
            <Header />
            <div style={{marginTop: '70px'}}>
                {children}
            </div>
        </div>
    )
}

export default PublicRoute