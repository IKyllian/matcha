import { css } from "styled-system/css"
import "./loader.css"
import { ReactElement } from "react"
import Screen404 from "front/components/utils/404"

type LoaderProps = {
    isLoading: boolean
    data: any
    shouldDisplay404?: boolean
    children: ReactElement
}
const Loader = ({ isLoading, data, shouldDisplay404 = false, children }: LoaderProps) => {
    if (isLoading) {
        return (
            <div className={css({
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            })}>
                <div className="loader"></div>
            </div>
        )
    }
    if (!isLoading && !data && shouldDisplay404) {
        return <Screen404 />
    }
    return children
}

export default Loader