import { css } from "styled-system/css"
import { tabsStyle } from "./tabs.style"
import { useState } from "react"

type TabsProps = {
    tabsContent: string[]
}
const Tabs = ({ tabsContent }: TabsProps) => {
    const slotsStyles = tabsStyle.raw()
    const [navIndex, setNavIndex] = useState(0)
    const handleClick = (index: number) => setNavIndex(index)
    return (
        <div className={css(slotsStyles.tabsContainer)} >
            {
                tabsContent.map((elem, index) => (
                    <div key={index} className={css(slotsStyles.tab)} data-active={index === navIndex} onClick={() => handleClick(index)}>
                        {elem}
                    </div>
                ))
            }
        </div>
    )
}

export default Tabs