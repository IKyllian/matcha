import { css } from "styled-system/css"
import { tabsStyle } from "./tabs.style"
import { useState } from "react"

const NAV_CONTENT = [
    'Like',
    'Matches',
    'Views'
]

const Tabs = () => {
    const slotsStyles = tabsStyle.raw()
    const [navIndex, setNavIndex] = useState(0)

    const handleClick = (index: number) => setNavIndex(index)
    return (
        <div className={css(slotsStyles.tabsContainer)} >
            {
                NAV_CONTENT.map((elem, index) => (
                    <div key={index} className={css(slotsStyles.tab)} data-active={index === navIndex} onClick={() => handleClick(index)}>
                        {elem}
                    </div>
                ))
            }
        </div>
    )
}

export default Tabs